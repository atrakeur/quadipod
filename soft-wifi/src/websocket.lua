do
  local websocket = {}
  _G.websocket = websocket
  local band = bit.band
  local bor = bit.bor
  local rshift = bit.rshift
  local lshift = bit.lshift
  local char = string.char
  local byte = string.byte
  local sub = string.sub
  local applyMask = crypto.mask
  local toBase64 = crypto.toBase64
  local hash = crypto.hash

  local isFileServeRunning = false
  local currentFileOpen = nil
  local currentConnOpen = nil

  local listOfPaths = {}
  local listOfConn = {}

  local function decode(chunk)
    if #chunk < 2 then return end
    local second = byte(chunk, 2)
    local len = band(second, 0x7f)
    local offset
    if len == 126 then
      if #chunk < 4 then return end
      len = bor(
        lshift(byte(chunk, 3), 8),
        byte(chunk, 4))
      offset = 4
    elseif len == 127 then
      if #chunk < 10 then return end
      len = bor(
        -- Ignore lengths longer than 32bit
        lshift(byte(chunk, 7), 24),
        lshift(byte(chunk, 8), 16),
        lshift(byte(chunk, 9), 8),
        byte(chunk, 10))
      offset = 10
    else
      offset = 2
    end
    local mask = band(second, 0x80) > 0
    if mask then
      offset = offset + 4
    end
    if #chunk < offset + len then return end

    local first = byte(chunk, 1)
    local payload = sub(chunk, offset + 1, offset + len)
    assert(#payload == len, "Length mismatch")
    if mask then
      payload = applyMask(payload, sub(chunk, offset - 3, offset))
    end
    local extra = sub(chunk, offset + len + 1)
    local opcode = band(first, 0xf)
    return extra, payload, opcode
  end

  local function encode(payload, opcode)
    opcode = opcode or 2
    assert(type(opcode) == "number", "opcode must be number")
    assert(type(payload) == "string", "payload must be string")
    local len = #payload
    local head = char(
      bor(0x80, opcode),
      bor(len < 126 and len or len < 0x10000 and 126 or 127)
    )
    if len >= 0x10000 then
      head = head .. char(
      0,0,0,0, -- 32 bit length is plenty, assume zero for rest
      band(rshift(len, 24), 0xff),
      band(rshift(len, 16), 0xff),
      band(rshift(len, 8), 0xff),
      band(len, 0xff)
    )
    elseif len >= 126 then
      head = head .. char(band(rshift(len, 8), 0xff), band(len, 0xff))
    end
    return head .. payload
  end

  local guid = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"
  local function acceptKey(key)
    return toBase64(hash("sha1", key .. guid))
  end

  function handleFileServing()
    -- No current file open, start serving one
    if (currentFileOpen == nil) then
      conn = table.remove(listOfConn)
      path = table.remove(listOfPaths)

      if (path == nil) then
        return false
      end

      -- This is a file we can open, send header
      if (string.len(path) < 20) and file.open(path, 'r') then
        currentFileOpen = path
        conn:send("HTTP/1.1 200 OK\r\nConnection: close\r\n\r\n")
        -- Called when previous sent temrinated, send the next block
        conn:on("sent", function(conn, c)
          n = file.read(1024)
          if (n == nil) then
            conn:close()
            file.close()
            currentFileOpen = nil
          else
            conn:send(n)
          end
        end)
      else
        conn:send("HTTP/1.1 404 Not Found\r\nConnection: Close\r\n\r\n",
          conn.close)
      end
    end

    return true
  end

  function websocket.createServer(port, callback)
    net.createServer(net.TCP):listen(port, function(conn)
      local buffer = false
      local socket = {}
      local queue = {}
      local waiting = false
      local function onSend()
        if queue[1] then
          local data = table.remove(queue, 1)
          return conn:send(data, onSend)
        end
        waiting = false
      end
      function socket.send(...)
        local data = encode(...)
        if not waiting then
          waiting = true
          conn:send(data, onSend)
        else
          queue[#queue + 1] = data
        end
      end
      function socket.close()
        conn:close()
      end

      conn:on("receive", function(localConnection, chunk)
        if buffer then
          buffer = buffer .. chunk
          while true do
            local extra, payload, opcode = decode(buffer)
            if not extra then return end
            buffer = extra
            socket.onmessage(payload, opcode)
          end
        end
        local _, e, method = string.find(chunk, "([A-Z]+) /[^\r]* HTTP/%d%.%d\r\n")
        local key, name, value
        while true do
          _, e, name, value = string.find(chunk, "([^ ]+): *([^\r]+)\r\n", e + 1)
          if not e then break end
          if string.lower(name) == "sec-websocket-key" then
            key = value
          end
        end

        if method == "GET" and key then
          conn:send(
            "HTTP/1.1 101 Switching Protocols\r\n" ..
            "Upgrade: websocket\r\nConnection: Upgrade\r\n" ..
            "Sec-WebSocket-Accept: " .. acceptKey(key) .. "\r\n\r\n",
            function () callback(socket) end)
          buffer = ""
        else
          -- Try to serve a file
          local _, _, method, path = string.find(chunk, "([A-Z]+) /(.*) HTTP");
          if (path == '') then
            path = 'index.html'
          end

          -- Requested a file, let's push it to the list of files to serve
          table.insert(listOfPaths, path)
          table.insert(listOfConn, localConnection)

          if (not isFileServeRunning) then
            sendTimer = tmr.create()
            sendTimer:register(200, tmr.ALARM_AUTO, function ()
              if (not handleFileServing()) then
                isFileServeRunning = false
                sendTimer:stop()
              end
            end)
            isFileServeRunning = true
            sendTimer:start()
          end
        end
      end)
    end)
  end
end
print("WEBSOCK:LOADED")

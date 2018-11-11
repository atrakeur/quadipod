dofile("websocket.lua")

websocket.createServer(80, function (socket)
  print("WEBSOCK:NEW_CLIENT")

  -- On message from socket
  function socket.onmessage(payload, opcode)
    -- Getting message from socket, send to uart
    if opcode == 1 then
      print("WEBSOCK:"..payload)
    end

    -- Leaving message, clear up everything
    if opcode == 8 then
      socket.close()
      uart.on("data")
      print("WEBSOCK:LOST_CLIENT")
    end
  end

  -- Getting data from uart, send to socket
  uart.on("data", "\n", function(data)
    socket.send(data)
  end, 0)
end)

print("WEBSOCK:STARTED")

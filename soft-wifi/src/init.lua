function startup()
	print("WEBSOCK:STARTING")
	--dofile("wifi.lua")
	--dofile("main.lua")
end

tmr.alarm(0, 5000, tmr.ALARM_SINGLE, startup)

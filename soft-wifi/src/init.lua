function startup()
	dofile("wifi.lua")
	dofile("main.lua")
end

print("WEBSOCK:STARTING")
tmr.alarm(0, 5000, tmr.ALARM_SINGLE, startup)

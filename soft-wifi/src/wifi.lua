wifi.sta.autoconnect(0)
wifi.setmode(wifi.STATION)
station_cfg={}
station_cfg.ssid="Your_AP_SSID"
station_cfg.pwd="Your_AP_Password"
station_cfg.save=false
wifi.sta.config(station_cfg)
wifi.sta.connect()

tmr.alarm(1, 250, tmr.ALARM_AUTO, function () 
	print (wifi.sta.status())
	local ip = wifi.sta.getip()
	if ip then
		tmr.stop(1)
		print("WEBSOCK:AVAILABLE " .. ip)
	end
end)

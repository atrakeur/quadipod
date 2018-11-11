wifi.setmode(wifi.STATION)
station_cfg={}
station_cfg.ssid="AtrakeurHome"
station_cfg.pwd="superWifi2Atrakeur4ever"
station_cfg.save=false
wifi.sta.config(station_cfg)
wifi.sta.connect()

tmr.alarm(0, 1000, tmr.ALARM_AUTO, function () 
	local ip = wifi.sta.getip()
	if ip then
		tmr.stop(0)
		print("WEBSOCK:AVAILABLE " .. ip)
	end
end)

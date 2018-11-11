wifi.sta.autoconnect(0)
wifi.setmode(wifi.STATION)
station_cfg={}
station_cfg.ssid="AtrakeurHome"
station_cfg.pwd="superWifi2Atrakeur4ever"
station_cfg.save=false
print("Set conf")
wifi.sta.config(station_cfg)
print("Connect")
wifi.sta.connect()
print("Conn done")

tmr.alarm(1, 250, tmr.ALARM_AUTO, function () 
	print (wifi.sta.status())
	local ip = wifi.sta.getip()
	if ip then
		tmr.stop(1)
		print("WEBSOCK:AVAILABLE " .. ip)
	end
end)

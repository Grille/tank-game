# client to server
- 1 regist client (name)
- 2 send chat (message)
- 3 send command (control.keys)
- 4 send command (control.mouse)


# server to client
- 1 client registered (ok ? id : -)
- 2 print chat (message)
- 3 clear ()

# game sync
- 10 set player (name,color,*11,*12,*13)
- 11 update player (team,vehicle.id)
- 12 update player (control.keys)
- 13 update player (control.mouse)
- 14 delete player

- 20 set vehicle
- 21 update vehicle
- 22 delete vehicle

- 90 set all (count(players),count(vehicles),*91,*92)
- 91 set all players (loop[player.id]{*10})
- 92 set all vehicles (loop[vehicle.id]{*20})

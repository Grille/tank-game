# client to server
- 0 regist client (name)
- 1 send chat (message)
- 2 request map
- 3 send command (control.keys)


# server to client
- 0 client registered (ok?)
- 1 print chat (message)
- 2 send update (data)
- 3 update map (data)

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

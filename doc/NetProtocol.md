# client to server
- regist client
  id:0,{name}
- chat
  id:1,{str message}
- request map
  id:2,
- send command
  id:3,{key{bool up,down,left right}/mouse{x,y,left,right}}


# server to client
- client registered
  id:0,Ok?
- chat
  id:1,{str message}
- send update
  id:2,data
- update map
  id:3,data

- 10 set player (all)
- 11 update player (team,vehicle.id)
- 12 update player (controls)

- 15 set vehicle
- 16 update vehicle
- 17 delete vehicle

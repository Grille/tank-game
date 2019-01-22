# client
- regist client
  id:0,{name}
- chat
  id:1,{str message}
- request map
  id:2,
- send command
  id:3,{key{bool up,down,left right}/mouse{x,y,left,right}}


# server
- client registered
  id:0,Ok?
- chat
  id:1,{str message}
- send map
  id:2,data
- update map
  id:3,data
- sync player
  id:4,data
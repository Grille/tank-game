# client
- regist client
  id:0,{name,color}
- request map
  id:1,
- send command
  id:2,{key/mouse data}


# server
- client registered
  id:0,Ok?
- send map
  id:1,data
- update map
  id:2,data
- sync player
  id:3,data
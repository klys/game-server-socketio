import World from "./components/world"
import {Server} from "socket.io"
import ServerToClientEvents from "./Server/ServerToClientEvents";
import ClientToServerEvents from "./Server/ClientToServerEvents";
import InterServerEvents from "./Server/InterServerEvents";

interface SocketData {
  name: string;
  age: number;
}

const io = new Server<
ClientToServerEvents, 
ServerToClientEvents, 
InterServerEvents, 
SocketData>
({ cors:{origin: "*"} });

const world = new World(400,400);

world.setSocketServer(io)

io.on("connection", (socket) => {
  console.log("Client connected!")
  
  socket.on("addPlayer", () => {
    world.addPlayer(socket.id);
    world.presentPlayersTo(socket.id);
  });

  socket.on("move", (data) => {
    //console.log("move: ", data)
    const dataO = ("string" == typeof data) ? JSON.parse(data) : data;
    const x = dataO.x | data.x;
    const y = dataO.y | data.y;
    const player = world.players.get(socket.id)
      if (!player) return;
      console.log(socket.id+" moving to "+x+" and "+y)
        //world.grid_backup = world.grid.clone()
        player.findPath(world, x,y)
        //world.grid = world.grid_backup;
        
        world.players.set(player.socketId, player)
    })
    
    socket.on("disconnect", (reason) => {
      // remove player from all instances
      console.log(reason)
      world.removePlayer(socket.id)
    });

});  




io.listen(3001);
console.log("Listening on port "+3001)
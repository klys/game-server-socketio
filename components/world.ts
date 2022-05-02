import Player from "./player"
//import { point_direction } from "./gameMath";
import Pathfinding = require("pathfinding")
//pf = require("pathfinding");

export default class World {
    public width:number;
    public height:number;
    players:Map<string, Player>;
    roomId:string;
    static socketServer:any;
    static moveScale:number = 8;
    grid:Pathfinding.Grid;
    //finder:Pathfinding.Finder;
    //grid_backup:Pathfinding.Grid;
    
    

    constructor(width:number, height:number) {
        this.height = height;
        this.width = width;
        this.roomId = (Math.random()*999).toFixed(5).toString();
        this.players = new Map<string, Player>();
        this.grid = new Pathfinding.Grid(this.width, this.height)
        //this.finder = new Pathfinding.AStarFinder({ diagonalMovement: 1 })
        //this.grid_backup = this.grid.clone()
        //setInterval(this.moveIn.bind(this), 1)
    }

    addPlayer(socketId:string) {
        this.players.set(socketId, new Player(100,100,socketId))
        console.log("players in map: ", this.players.size)
        World.socketServer.emit("addPlayer", this.players.get(socketId)?.data())
    }

    presentPlayersTo(socketId:string) {
        this.players.forEach( (player) => {
            (player.socketId != socketId) ? World.socketServer.in(socketId).emit("addPlayer", player.data()) : null;
        })
    }

    removePlayer(socketId:string) {
        if (!this.players.has(socketId)) return;
        this.players.delete(socketId);
        World.socketServer.emit("removePlayer", {playerId: socketId})
        
    }

    setSocketServer(socket:any) {
        World.socketServer = socket;
    }

    testSocket() {
        console.log("test socket executed. ",this.players.size)
        this.players.forEach( (player) => {
            World.socketServer.in(player.socketId).emit("test", {test:"hello test!"})
        })
        
    }

    /*moveIn() {
        //console.log("moveIn cycle ran.")
        this.players.forEach((player) => {
            
            
            if (player.path.length === 0) return;
            if (player.path.length === player.path_pos) return;

            //console.log("player "+player.socketId+" moving to "+player.path[player.path_pos][0]+"/"+player.path[player.path_pos][1])

            
            player.angle = point_direction(player.x, player.y, player.path[player.path_pos][0], player.path[player.path_pos][1])+180
            player.x = player.path[player.path_pos][0];
            player.y = player.path[player.path_pos][1];


            player.path_pos = player.path_pos + 1;
            this.socketServer.emit("move", {x:player.x,y:player.y,angle:player.angle,playerId:player.socketId})

        })
        
        
        
    }*/

    
}
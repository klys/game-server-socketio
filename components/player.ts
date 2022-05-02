import Pathfinding = require("pathfinding")
import World from "./world"
import { point_direction } from "./gameMath";

export default class Player {
    x: number;
    y: number;
    speed:number;
    socketId:string;
    path:number[][];
    path_pos:number;
    angle:number;
    finder:Pathfinding.Finder;

    /*mMap:Pathfinding.Grid
    mPath:number[][];
    sPath:number[][];
    sPath_pos:number;*/

    constructor(x:number,y:number,socketId:string){
        this.x = x;
        this.y = y;
        this.angle = 0;
        this.socketId = socketId;
        this.speed = 3;
        this.path = [];
        this.path_pos = 0;
        this.finder = new Pathfinding.AStarFinder({ diagonalMovement: 1 })

        /*this.mMap = new Pathfinding.Grid(40,40)
        this.mPath = [];
        this.sPath = [];
        this.sPath_pos = 0;*/
        //setInterval(this.mFinder.bind(this), 1)

        setInterval(this.move.bind(this), 1)
    }

    public move() {
        if (this.path.length === 0) return;
        if (this.path.length === this.path_pos) return;

        //console.log("player "+player.socketId+" moving to "+player.path[player.path_pos][0]+"/"+player.path[player.path_pos][1])

        const toX = this.path[this.path_pos][0]*World.moveScale;
        const toY = this.path[this.path_pos][1]*World.moveScale;
        
        this.angle = point_direction(this.x, this.y, toX, toY)+180
        this.x = toX;
        this.y = toY;


        this.path_pos = this.path_pos + 1;
        World.socketServer.emit("move", {x:this.x,y:this.y,angle:this.angle,playerId:this.socketId})
    }

    public findPath(world:World,x:number,y:number) {
        
        this.path = this.finder.findPath(Math.round(this.x/World.moveScale),Math.round(this.y/World.moveScale),
                                        Math.round(x/World.moveScale),Math.round(y/World.moveScale),
                                        world.grid.clone())
        this.path_pos = 0;
    }

    /*public mFinder() {
        if (this.path.length === 0) return;
        if (this.path.length === this.path_pos) return;


    }*/

    public data() {
        return{
            playerId:this.socketId,
            x:this.x,
            y:this.y,
            angle:this.angle
        }
    }
}
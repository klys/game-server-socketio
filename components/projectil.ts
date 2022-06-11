import {polar_move} from "./gameMath"
import World from "./world"

export default class Projectil {
    x:number;
    y:number;
    width:number;
    height:number;
    angle:number;
    toX:number;
    toY:number;
    id:number;
    maxDistance:number;
    distance:number;
    speed:number;
    explode:boolean;
    ownerId:string;
    damage:number;

    constructor(x:number, y:number, angle:number) {
        this.ownerId = '';
        this.explode = false;
        this.x = x;
        this.y = y;
        this.width = 32;
        this.height = 32;
        this.angle = angle;
        const maxDistance = polar_move(x,y,this.angle,1000);
        this.maxDistance = 300;
        this.distance = 0 ;
        this.toX = maxDistance.x;
        this.toY = maxDistance.y;
        this.speed = 2;
        this.damage = 15;
        console.log("max distance this projectil will reach: ("+this.toX+", "+this.toY+")")
        this.id = Math.round(Math.random()*99999);
    }

    setOwnership(id:string):void {
        this.ownerId = id;
    }

    data() {
        return {
            x:this.x,
            y:this.y,
            id:this.id,
            angle:this.angle
        }
    }

    setMove(x:number,y:number) {
        this.toX = x;
        this.toY = y;
    }

    move() {
        if (this.distance < this.maxDistance) {
            // if we are not in the right position
            // move to it
            this.distance += this.speed;
            const newPos = polar_move(this.x,this.y,this.angle,this.speed);
            this.x = newPos.x;
            this.y = newPos.y;
            console.log("projectil moving ... ("+this.x+", "+this.y+")")
        } else this.trigger();
    }

    trigger() {
        this.explode = true;
    }




}
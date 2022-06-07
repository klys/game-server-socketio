export default interface ServerToClientEvents {
    //test: () => void;
    //noArg: () => void;
    //basicEmit: (a: number, b: string, c: Buffer) => void;
    //withAck: (d: string, callback: (e: number) => void) => void;
    move: (x:number, y:number, angle:number,playerId:string) => void;
    addPlayer:(x:number,y:number,angle:number, playerId:string) => void;
    shotProjectil:() => void
  }
export default interface ClientToServerEvents {
    addPlayer: () => void;
    move: (data:any) => void;
    shotProjectil: (data:any) => void;
  }
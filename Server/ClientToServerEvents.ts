export default interface ClientToServerEvents {
    addPlayer: () => void;
    move: (data:any) => void;
  }
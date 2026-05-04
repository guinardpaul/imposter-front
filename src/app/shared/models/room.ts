export interface Room {
    roomId: string;
    roomName: string;
    playerViewList: Player[]
}

export interface Player {
    id: string;
    name: string
}
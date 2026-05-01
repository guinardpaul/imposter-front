export interface Room {
    roomId: string;
    roomName: string;
    players: Player[]
}

export interface Player {
    id: string;
    name: string
}
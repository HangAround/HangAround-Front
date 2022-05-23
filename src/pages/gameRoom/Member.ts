export default class Member {
  userId: number
  userName: string
  roomCode: string

  constructor (userId: number, userName: string, roomCode: string) {
    this.userId = userId
    this.userName = userName
    this.roomCode = roomCode
  }
}

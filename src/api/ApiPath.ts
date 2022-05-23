export const KAKAO_LOGIN_URL = process.env.REACT_APP_API_PATH + '/auth/kakao'
export const WITHOUT_LOGIN_PATH = process.env.REACT_APP_API_PATH + '/auth/without-login'
// method get or post로 사용가능
export const GET_NEW_ROOM_CODE_PATH = process.env.REACT_APP_API_PATH + '/room/new-room'
export const JOIN_ROOM_PATH = process.env.REACT_APP_API_PATH + '/room/join-room'
export const getRoomMembersPath =
  (roomCode: string) => process.env.REACT_APP_API_PATH + `/room/${roomCode}/userInfo`

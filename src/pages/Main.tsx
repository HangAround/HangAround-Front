import React, { useCallback, useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import { Box, Button, Modal, Typography, TextField } from '@mui/material'
// TODO(seungji): png 파일 모듈로 import 하는 법 찾아보기
import '../index.css'
import { useNavigate } from 'react-router-dom'
import { KeyboardVoice, Settings, Videocam } from '@mui/icons-material'
import axios from 'axios'
import { GET_NEW_ROOM_CODE_PATH, JOIN_ROOM_PATH } from '../api/ApiPath'
import _ from 'lodash'

const useStyles = makeStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 200,
    },
    button: {
      backgroundColor: '#7030A0',
      width: 300,
      height: 150,
      color: '#fff',
      fontSize: 55,
      fontFamily: 'DungGeunmo',
      alignSelf: 'center',
    },
    modal: {
      display: 'flex',
      flexDirection: 'column',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 1000,
      backgroundColor: 'white',
      border: '1px solid #000',
      borderRadius: 20,
      boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.5)',
      pt: 2,
      padding: 100,
      paddingBottom: 30,
      pb: 3,
    }
  })

export default function Main(): React.ReactElement {
  const classes = useStyles()
  const [openNewModal, setOpenNewModal] = useState(false)
  const [openJoinModal, setOpenJoinModal] = useState(false)
  const [roomName, setRoomName] = useState('')
  const [roomCode, setRoomCode] = useState('')
  const [maxPlayer, setMaxPlayer] = useState(4)
  const [userName, setUserName] = useState('')
  const [joinRoomCode, setJoinRoomCode] = useState('')
  const navigate = useNavigate()

  const handleOnNewGameModalClick = useCallback(async () => {
    const result = await axios.get(GET_NEW_ROOM_CODE_PATH)
    if (result.data.isSuccess) {
      setRoomCode(result.data.result.roomCode)
    } else {
      alert('error, 룸코드 생성 실패')
    }
    setOpenNewModal(true)
  }, [setOpenNewModal])

  const handleOnNewGameModalClose = useCallback(() => {
    setOpenNewModal(false)
  }, [setOpenNewModal])

  const handleOnJoinGameModalClick = useCallback(() => {
    setOpenJoinModal(true)
  }, [setOpenNewModal])

  const handleOnJoinGameModalClose = useCallback(() => {
    setOpenJoinModal(false)
  }, [setOpenNewModal])

  const onClickNewButton = useCallback(async () => {
    const headers = {
      Auth: sessionStorage.getItem('JWT')
    }
    axios.post(GET_NEW_ROOM_CODE_PATH, {
      roomName: roomName,
      maxPlayer: maxPlayer,
      userId: _.toInteger(sessionStorage.getItem('userId'))
    }, { headers })
    .then(result => {
      if (result.data.isSuccess) {
        setOpenNewModal(false)
        alert('Join 버튼을 클릭하여 방에 입장하세요.')
      } else {
        alert('방 생성 실패')
      }
    })
  }, [roomName, maxPlayer])

  const onClickJoinButton = useCallback(async () => {
    const headers = {
      Auth: sessionStorage.getItem('JWT')
    }
    const result = await axios.put(JOIN_ROOM_PATH, {
      userId: _.toInteger(sessionStorage.getItem('userId')),
      userName: userName,
      roomCode: joinRoomCode
    }, { headers })
    if (result.data.isSuccess) {
      sessionStorage.setItem('userName', userName)
      setOpenJoinModal(false)
      navigate('/room/' + joinRoomCode)
    } else {
      alert('방 입장 실패')
    }
  }, [joinRoomCode, userName])

  useEffect(() => {
    if (sessionStorage.getItem('userId') === null) {
      navigate('/login')
    }
  }, [navigate])

  return (
    <Box className={classes.root}>
      <img src={require("../statics/images/RobotLoginLogo.png")} alt="logo" />
      <Box display="flex" flexDirection="row">
        <Button
          className={classes.button}
          style={{ marginRight: 100 }}
          onClick={handleOnNewGameModalClick}
        >
          New
        </Button>
        <Button className={classes.button} onClick={handleOnJoinGameModalClick}>
          Join
        </Button>
        <Modal
          open={openNewModal}
          onClose={handleOnNewGameModalClose}
        >
          <Box className={classes.modal}>
            <Box display="flex" flexDirection="row">
              <Box width={500} paddingBottom={5}>
                <Typography variant="h3" fontFamily="DungGeunmo" color="#7030A0">
                  Room Name
                </Typography>
              </Box>
              <TextField
                value={roomName}
                onChange={event => setRoomName(event.target.value)}
                fullWidth
              />
            </Box>
            <Box display="flex" flexDirection="row">
              <Box width={500} paddingBottom={5}>
                <Typography variant="h3" fontFamily="DungGeunmo" color="#7030A0">
                  Room Code
                </Typography>
              </Box>
              <TextField value={roomCode} disabled fullWidth />
            </Box>
            <Box display="flex" flexDirection="row">
              <Box width={500}>
                <Typography variant="h3" fontFamily="DungGeunmo" color="#7030A0">
                  Room Size
                </Typography>
              </Box>
              <TextField
                value={maxPlayer}
                onChange={event => setMaxPlayer(_.toInteger(event.target.value))}
                fullWidth
              />
            </Box>
            <Button
              className={classes.button}
              style={{ height: 100, width: 200, marginTop: 30 }}
              onClick={onClickNewButton}
            >
              OK
            </Button>
          </Box>
        </Modal>
        <Modal
          open={openJoinModal}
          onClose={handleOnJoinGameModalClose}
        >
          <Box className={classes.modal}>
            <Box display="flex" flexDirection="row">
              <Box width={500} paddingBottom={5}>
                <Typography variant="h3" fontFamily="DungGeunmo" color="#7030A0">
                  Room Code
                </Typography>
              </Box>
              <TextField
                value={joinRoomCode}
                onChange={event => setJoinRoomCode(event.target.value)}
                fullWidth
              />
            </Box>
            <Box display="flex" flexDirection="row">
              <Box width={300}>
                <Typography variant="h3" fontFamily="DungGeunmo" color="#7030A0">
                  My SETTINGS
                </Typography>
              </Box>
              <Settings style={{ color: "#7030A0", width: 50, height: 50 }} />
            </Box>
            <Box borderRadius={10} border={1} padding={5} marginTop={5}>
              <TextField
                placeholder="닉네임"
                value={userName}
                onChange={event => setUserName(event.target.value)}
              />
              <Videocam style={{ color: "#7030A0", width: 50, height: 50, marginLeft: 10 }} />
              <KeyboardVoice style={{ color: "#7030A0", width: 50, height: 50, marginLeft: 10 }} />
            </Box>
            <Button
              className={classes.button}
              style={{ height: 100, width: 200, marginTop: 30 }}
              onClick={onClickJoinButton}
            >
              OK
            </Button>
          </Box>
        </Modal>
      </Box>
    </Box>
  )
}

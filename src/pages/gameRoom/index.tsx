import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { makeStyles } from '@mui/styles'
import { Box, Typography } from '@mui/material'
import * as io from 'socket.io-client' 
import Peer from "peerjs"
import _ from "lodash"
import axios from 'axios'

import Member from './Member'
import { getRoomMembersPath } from '../../api/ApiPath'
import OptionBox from './OptionBox'

const serverSocket =
    io(process.env.REACT_APP_API_PATH + '/gameRoom',
      { withCredentials: false, transports: ['websocket'], IgnoreExtensions: true })

const useStyles = makeStyles({
    root: { 
      display: "flex",
      flexDirection: "row",
      backgroundColor: '#000'
    },
    videoGroup: {
      flexGrow: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "1rem"
    },
    optionBox: {
      display: 'flex',
      width: '30%',
      backgroundColor: '#7030A0',
      justifyContent: 'center'
    },
    optionGroup: {
      width: '427px',
      height: '675px',
      backgroundColor: '#ffffff',
      marginTop: '200px',
    }
  })

export default function GameRoom(): React.ReactElement {
  // const { members } = props 
  const classes = useStyles()
  const { roomCode } = useParams()
  const userName = sessionStorage.getItem('userName')
  const headers = {
    Auth: sessionStorage.getItem('JWT')
  }
  const [members, setMembers] = useState<Member[]>([])
  const [answer, setAnswer] = useState('')
  const [leftTime, setLeftTime] = useState(0)
  const [isTimerOn, setIsTimerOn] = useState(false)
  const [isNoticeModalVisible, setIsNoticeModalVisible] = useState(false)

  const {
    transcript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition()

  if (!browserSupportsSpeechRecognition) {
    console.error("Speech recognition not supported")
  }

  useEffect(() => {
    serverSocket.emit('join', { roomCode: roomCode, name: userName })
  }, [roomCode])

  useEffect(() => {
    const socket = io('https://nodejs-video-chat-1.herokuapp.com/')
    const peer = new Peer()

    const videoGrid = document.getElementById("video-grid")
    const myVideo = document.createElement("video")
    myVideo.muted = true

    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true,
      })
      .then((stream: MediaStream) => {
        addVideoStream(myVideo, stream)

        peer.on("call", (call) => {
          call.answer(stream)
          const video = document.createElement("video")
          call.on("stream", (userVideoStream) => {
            addVideoStream(video, userVideoStream)
          })
        })

        socket.on("user-connected", (userId: string) => {
          connectToNewUser(userId, stream)
        })
      })

    const connectToNewUser = (userId, stream) => {
      const call = peer.call(userId, stream);
      const video = document.createElement("video")
      call.on("stream", (userVideoStream) => {
          addVideoStream(video, userVideoStream)
      })
    }
    
    peer.on("open", (id) => {
        socket.emit("join-room", 'ROOM_ID', id, 'seungji')
    })
    
    const addVideoStream = (video, stream) => {
        video.srcObject = stream
        video.addEventListener("loadedmetadata", () => {
            video.play()
            videoGrid.append(video)
        })
    }
  }, [])

  useEffect(() => {
    serverSocket.on("consonant", (data) => {
      setAnswer(data.consonant)
    })
  }, [serverSocket])

  useEffect(() => {
    if (answer.length > 0) {
      serverSocket.emit("response", { roomCode: roomCode })
    }
  }, [answer, serverSocket])

  useEffect(() => {
    serverSocket.on("timerStart", (data) => {
      setIsTimerOn(true)
      setLeftTime(180)
      setIsNoticeModalVisible(true)
    })
  }, [serverSocket])

  useEffect(() =>{
    if (leftTime > 0 && isTimerOn) {
      setTimeout(() => {
        const updatedTime = leftTime - 1
        setLeftTime(updatedTime)
      }, 1000)
    }
  }, [leftTime, isTimerOn])

  useEffect(() => {
    serverSocket.on("timeOver", (data) => {
      setIsTimerOn(false)
      setAnswer('')
      alert(data.msg)
    })
  }, [serverSocket])

  useEffect(() => {
    serverSocket.on("gameOver", (data) => {
      setIsTimerOn(false)
      setAnswer('')
      alert(data)
    })
  }, [serverSocket])

  useEffect(() => {
    if (isNoticeModalVisible) {
      setTimeout(() => {
        setIsNoticeModalVisible(false)
      }, 2000)
    }
  }, [isTimerOn, answer, isNoticeModalVisible])

  useEffect(() => {
    serverSocket.on("join", (data) => {
      const apiPath = getRoomMembersPath(roomCode)
      axios.get(apiPath, { headers }).then((result) => {
        if (result.data.isSuccess) {
          const members = result.data.result
          const membersList = members.map((member) => {
            const newMember = new Member(member.userId, member.userName, member.room.roomCode)
            return newMember
          })
          setMembers(membersList)
        }
      })
    })
  }, [serverSocket])

  const onClickInviteButton = () => {
    prompt(
      "룸코드를 복사하여 방에 입장하세요.",
      roomCode
    )
  }

  const onClickGameStart = useCallback(() => {
    serverSocket.emit('gameStart', { roomCode: roomCode })
  }, [roomCode, serverSocket])

  const verifyAnswer = useCallback((input) => {
    try{
      const f = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ',
      'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ',
      'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']
      //초성 일치하는지 확인하기 위해 단어로부터 초성을 분리
      const kor1 = input[0]
      let uni1 = kor1.charCodeAt(0)
      uni1 = uni1 - 44032
      const fn1 = _.floor(uni1 / 588)

      const kor2 = input[1]
      let uni2 = kor2.charCodeAt(0)
      uni2 = uni2 - 44032
      const fn2 = _.floor(uni2 / 588)

      //랜덤 초성과 단어의 초성이 일치하는지 확인, 단어 확인 함수를 통해 사전에 있는 단어인지 확인
      if ((answer[0] === f[fn1]) && (answer[1] === f[fn2])) {
        alert("정답입니다.")
        serverSocket.emit("userName", { roomCode: roomCode, userName: userName })
      } else {
        alert("틀렸습니다.")
      }
    } catch (e) {
      console.log(e.message)
    }
  }, [answer, roomCode, userName])

  const onClickStopSpeech =  useCallback(() => {
    const list = transcript.split(' ')
    if (list.length > 0) {
      verifyAnswer(list[list.length - 1])
    }
    SpeechRecognition.stopListening()
  }, [transcript, SpeechRecognition])

  return (
    <Box className={classes.root}>
      <Box className={classes.videoGroup}>
        <Box
          id="video-grid"
          style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
        >

        </Box>
      </Box>
      <OptionBox
        isTimerOn={isTimerOn}
        leftTime={leftTime}
        answer={answer}
        members={members}
        onClickStartSpeech={
          () => SpeechRecognition.startListening({ continuous: true, language: 'ko' })
        }
        onClickStopSpeech={onClickStopSpeech}
        onClickInviteButton={() => onClickInviteButton()}
        onClickGameStart={() => onClickGameStart()}
      />
      {isTimerOn && answer.length > 0 && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          sx={{
            position: "absolute",
            zIndex: 1,
            backgroundColor: "white",
            width: 500,
            border: '1px solid #000',
            borderRadius: 20,
            boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.5)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            paddingTop: 10,
            paddingBottom: 10
          }}
        >
          <img src={require('../../statics/images/RobotFace.png')} style={{ width: 100 }} />
          <Typography variant="h1" fontFamily="DungGeunmo" color="#7030A0">
            {answer}
          </Typography>
        </Box>
      )} {isNoticeModalVisible && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          sx={{
            position: "absolute",
            zIndex: 1,
            backgroundColor: "white",
            width: 500,
            border: '1px solid #000',
            borderRadius: 20,
            boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.5)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            paddingTop: 10,
            paddingBottom: 10
          }}
        >
          <img src={require('../../statics/images/RobotFace.png')} style={{ width: 100 }} />
          <Typography variant="h1" fontFamily="DungGeunmo" color="#7030A0">
            {answer}
          </Typography>
        </Box>
      )}
    </Box>
  )
}

import React, { useEffect, useRef, useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { makeStyles } from '@mui/styles'
import { Box, Button } from '@mui/material'
import * as io from 'socket.io-client' 
import Peer from "peerjs"

// TODO(seungji): png 파일 모듈로 import 하는 법 찾아보기
import VideoGroupWrapper from './VideoGroupWrapper'
import Member from './Member'
import OptionBox from './OptionBox'

const useStyles = makeStyles({
    root: {
      display: "flex",
      flexDirection: "row",
      backgroundColor: '#000',
      height: '1500px'
    },
    videoGroup: {
      flexGrow: 1,
      display: "flex",
      justifyContent: "center",
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
  const [stream, setStream] = useState<MediaStream>()
  const [videos, setVideos] = useState<HTMLVideoElement[]>([])
  const [isMute, setIsMute] = useState<boolean>(false)
  const [isVideoEnabled, setIsVideoEnabled] = useState<boolean>(true)
	const myVideo = useRef<HTMLVideoElement>(null)
  const otherVideo = useRef<HTMLVideoElement>(null)
  const othersVideos = useRef<HTMLVideoElement[]>([])
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition()

  if (!browserSupportsSpeechRecognition) {
    console.error("Speech recognition not supported")
  }

  useEffect(() => {
    console.log(transcript)
  }, [transcript])

  useEffect(() => {
    const socket = io('https://nodejs-video-chat-1.herokuapp.com/')
    const peer = new Peer()

    const videoGrid = document.getElementById("video-grid")
    const myVideo = document.createElement("video")

    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true,
      })
      .then((stream: MediaStream) => {
        setStream(stream)
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
  
  const onMuteButtonClick = () => {
    const enabled = stream.getAudioTracks()[0].enabled
    stream.getAudioTracks()[0].enabled = !enabled
    setIsMute(!enabled)
  }

  const onStopVideoButtonClick = () => {
    const enabled = stream.getVideoTracks()[0].enabled
    stream.getVideoTracks()[0].enabled = !enabled
    setIsVideoEnabled(!enabled)
  }

  const onInvitedButtonClick = () => {
    prompt(
      "Copy this link and send it to people you want to meet with",
      window.location.href
    )
  }

  return (
    <Box className={classes.root}>
      <div id="video-grid" className={classes.videoGroup}>

      </div>
      <OptionBox
        onClickStartSpeech={
          () => SpeechRecognition.startListening({ continuous: true, language: 'ko' })
        }
        onClickStopSpeech={() => SpeechRecognition.stopListening()}
      />
    </Box>
  )
}

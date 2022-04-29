import React, { useEffect, useRef, useState } from 'react'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/material'
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

// TODO(seungji): 여기서 game 참가자들을 서버에서 받아서 보여주는게 좋을듯

// interface GameRoomProps {
//   members: Member[]
// }

// const socket = io('http://localhost:3030')
// const peer = new Peer()

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

  useEffect(() => {
    const socket = io('http://localhost:3030')
    const peer = new Peer()
    peer.on("open", (id) => {
      console.log('id', id)
      socket.emit("join-room", 'RoomId', id, "abcd")
    })

    const onCall = (call) => {
      console.log('someone call me')
      console.log(stream)
      call.answer(stream)
      const _video1 = document.createElement("video");
      setVideos(videos => [...videos, _video1])
      _video1.autoplay = true
      call.on("stream", (userVideoStream) => {
        _video1.srcObject = userVideoStream;
        // _video1.play();
        // setVideos(videos => [...videos, _video1])
    })}

    const onStream = (stream) => {
      setStream(stream)
      myVideo.current.srcObject = stream
      myVideo.current.play()
      setVideos(videos => [...videos, myVideo.current])

      peer.on("call", onCall)

      socket.on("user-connected", (userId) => {
        console.log('connectToNewUser', userId, stream)
        const call = peer.call(userId, stream);
        // const _video2 = document.createElement("video")
        call.on("stream", (userVideoStream) => {
          otherVideo.current.srcObject = userVideoStream;
          otherVideo.current.play()
          setVideos(videos => [...videos, otherVideo.current])
          // _video2.play();
          // setVideos(videos => [...videos, _video2])
          // _video2.addEventListener("loadedmetadata", () => {
          //   _video2.play();
          //   setVideos(videos => [...videos, _video2])
          //   console.log('videos?: ', videos, _video2)
          // })
        })
      })
    }

    navigator.mediaDevices
    .getUserMedia({
      audio: true,
      video: true,
    }).then(onStream)
    }, [])

  const addVideoStream = (video: HTMLVideoElement, stream: MediaStream) => {
      video.srcObject = stream;
      video.addEventListener("loadedmetadata", () => {
          video.play();
          console.log('videos?: ', videos, video)
          // const newVideos = videos.concat(video)
          // if (videos.length > 0) {
          //   othersVideos.current = [...othersVideos.current, video]
          // }
          // console.log('newVideos', newVideos)
          setVideos([...videos, video])
      })
  }

  const onMuteButtonClick = () => {
    const enabled = stream.getAudioTracks()[0].enabled;
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
      <VideoGroupWrapper myVideoRef={myVideo} otherVideoRef={otherVideo} videos={videos}/>
      <OptionBox />
    </Box>
  )
}

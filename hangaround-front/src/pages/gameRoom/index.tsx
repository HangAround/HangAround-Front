import React from 'react'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/material'
// TODO(seungji): png 파일 모듈로 import 하는 법 찾아보기
import '../index.css'
import VideoGroupWrapper from './videoGroupWrapper'
import Member from './Member'

const useStyles = makeStyles({
    root: {
      display: "flex",
      flexDirection: "row",
      backgroundColor: '#000',
      height: 'auto'
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

interface GameRoomProps {
  members: Member[]
}

export default function GameRoom(props: GameRoomProps): React.ReactElement {
  const { members } = props 
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <VideoGroupWrapper members={members} />
      <Box className={classes.optionBox}>
        <Box className={classes.optionGroup}>
        </Box>
      </Box>
    </Box>
  )
}

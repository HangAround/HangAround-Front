import React from 'react'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/material'
// TODO(seungji): png 파일 모듈로 import 하는 법 찾아보기
import '../index.css'
import Member from './Member'
import VideoBox from './VideoBox'

const useStyles = makeStyles({
    videoGroup: {
      width: '70%',
      display: 'flex',
      flexDirection: 'column',
    }
  })

interface Props {
  members: Member[]
}

export default function VideoGroupWrapper(props: Props): React.ReactElement {
  const { members } = props
  const classes = useStyles()

  return (
      <Box className={classes.videoGroup}>
        <Box style={{ margin: 50, display: 'flex', flexDirection: 'row' }}>
          <VideoBox />
          <VideoBox />
        </Box>
        <Box style={{ margin: 50, display: 'flex', flexDirection: 'row' }}>
          <VideoBox />
          <VideoBox />
        </Box>
      </Box>
  )
}

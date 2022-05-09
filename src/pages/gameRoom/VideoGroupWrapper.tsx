import React from 'react'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/material'
// TODO(seungji): png 파일 모듈로 import 하는 법 찾아보기
import VideoBox from './VideoBox'

const useStyles = makeStyles({
    videoGroup: {
      width: '70%',
      display: 'flex',
      flexDirection: 'column',
    }
  })

// interface Props {
//   members: Member[]
// }

export default function VideoGroupWrapper(
  props: { myVideoRef?: any, videos: any[], otherVideoRef?: any }
): React.ReactElement {
    // const { members } = props
    const classes = useStyles()
    console.log(props.videos)
    return (
        <Box className={classes.videoGroup}>
          <Box 
            style={{
              margin: 50,
              marginBottom: 5,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center'
            }}
          >
            <VideoBox videoRef={props.myVideoRef} video={props.videos[0]} />
            <VideoBox videoRef={props.otherVideoRef} video={props.videos[1]} />
          </Box>
          <Box
            style={{
              margin: 50,
              marginTop: 5,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center'
            }}
          >
            <VideoBox />
            <VideoBox />
          </Box>
        </Box>
    )
}

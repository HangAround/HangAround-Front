import React from 'react'
import { makeStyles } from '@mui/styles'
import { Box, Button, Chip } from '@mui/material'
// TODO(seungji): png 파일 모듈로 import 하는 법 찾아보기
import Member from './Member'
import _ from 'lodash'

const useStyles = makeStyles({
    videoBox: {
      width: '500px',
      height: '500px',
      backgroundColor: '#C4C4C4',
      margin: '30px',
    },
    label: {
      padding: '10px',
      margin: '10px',
      backgroundColor: 'black',
      color: 'white',
      fontSize: '20px'
    }
  })

export default function VideoBox(props: {
  videoRef?: any,
  video?: HTMLVideoElement
}): React.ReactElement {
    // const { member } = props
    console.log('ref', props.videoRef)
    const classes = useStyles()

    return (
      <div>
        {props.videoRef !== undefined
          ? <video ref={props.videoRef} autoPlay /> : <video autoPlay />}
      </div>
    )
}

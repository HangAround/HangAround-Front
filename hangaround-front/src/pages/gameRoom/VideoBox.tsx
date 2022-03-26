import React from 'react'
import { makeStyles } from '@mui/styles'
import { Box, Chip } from '@mui/material'
// TODO(seungji): png 파일 모듈로 import 하는 법 찾아보기
import Member from './Member'

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

interface Props {
  member: Member
}

export default function VideoBox(): React.ReactElement {
  // const { member } = props
  const classes = useStyles()

  return (
    <Box className={classes.videoBox}>
      <Chip label={'default'} className={classes.label}/>
    </Box>
  )
}

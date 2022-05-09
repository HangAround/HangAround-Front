import React from 'react'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/material'
// TODO(seungji): png 파일 모듈로 import 하는 법 찾아보기
import '../index.css'

const useStyles = makeStyles({
    root: {
      display: "flex",
      flexDirection: "row",
      backgroundColor: '#000',
      height: 'auto'
    },
    videoGroup: {
      width: '70%',
      display: 'flex',
      flexDirection: 'column',
    },
    videoBox: {
      width: '500px',
      height: '500px',
      backgroundColor: '#C4C4C4',
      margin: '50px',
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

export default function Room(): React.ReactElement {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <Box className={classes.videoGroup}>
        <Box style={{ margin: 50, display: 'flex', flexDirection: 'row' }}>
          <Box className={classes.videoBox} />
          <Box className={classes.videoBox} />
        </Box>
        <Box style={{ margin: 50, display: 'flex', flexDirection: 'row' }}>
          <Box className={classes.videoBox} />
          <Box className={classes.videoBox} />
        </Box>
      </Box>
      <Box className={classes.optionBox}>
        <Box className={classes.optionGroup}>
        </Box>
        
      </Box>
    </Box>
  )
}

import React from 'react'
import { makeStyles } from '@mui/styles'
import { Box, Button } from '@mui/material'
// TODO(seungji): png 파일 모듈로 import 하는 법 찾아보기
import '../index.css'

const useStyles = makeStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "10px",
    },
    button: {
      backgroundColor: '#7030A0',
      width: 300,
      height: 150,
      color: '#fff',
      fontSize: 55,
      fontFamily: 'DungGeunmo',
    }
  })

export default function Main(): React.ReactElement {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <img src={require("../statics/images/RobotLoginLogo.png")} alt="logo" />
      <Box display="flex" flexDirection="row">
        <Button
          className={classes.button}
          style={{ marginRight: 100 }}
        >
          New
        </Button>
        <Button className={classes.button}>
          Join
        </Button>
      </Box>
    </Box>
  )
}

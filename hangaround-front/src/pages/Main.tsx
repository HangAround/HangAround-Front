import React from 'react'
import { makeStyles } from '@mui/styles'
import { Box, Button } from '@mui/material'
// TODO(seungji): png 파일 모듈로 import 하는 법 찾아보기
import '../index.css'
import { useLocation } from 'react-router-dom'

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
  const location = useLocation()

  // useEffect(() => {
  //   // TODO(seungji): 로그인 유무 리퀘스트 보냄.
  //     axios.get('/api/login/check')
  //     .then(res => {
  //       if (!res.data.login) {
  //         location.pathname = '/login'
  //         // or redirect to login page
  //       } else {
  //         if (sessionStorage.getItem('user_id') === null) {
  //           sessionStorage.setItem('user_id', res.data.user_id)
  //         }
  //       }
  //     })
  //     .catch((error: Error) => {
  //       console.log(error, error.message)
  //     })
  //   }, [location])

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

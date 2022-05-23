import React, { useCallback } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { makeStyles } from '@mui/styles'
import { Box, Button } from '@mui/material'
import _ from 'lodash'

import '../index.css'
import { KAKAO_LOGIN_URL, WITHOUT_LOGIN_PATH } from '../api/ApiPath'

const useStyles = makeStyles({
  root: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10px",
  },
  button: {
    fontFamily: 'DungGeunmo',
    height: 'fit-content',
    fontSize: 55,
    color: '#fff'
  },
})

export default function Main(): React.ReactElement {
  const classes = useStyles()
  const navigate = useNavigate()

  const onClickWithoutLogin = useCallback(async () => {
    const result = await axios.get(WITHOUT_LOGIN_PATH)
    if (result.data.isSuccess) {
      const userId = result.data.result.userId
      const jwt = result.data.result.JWT
      navigate('/')
      sessionStorage.setItem('userId', userId)
      sessionStorage.setItem('JWT', jwt) 
    }
  }, [navigate])

  return (
    <Box className="main">
      <Box display="flex" justifyContent="center">
        <Box
          className="mainLoginButtonBox"
          style={{ position: 'absolute', left: '22%', top: '85%' }}
        >
          <Button className={classes.button} onClick={onClickWithoutLogin}>
            WITHOUT LOGIN
          </Button>
          <Button
            style={{ fontFamily: 'DungGeunmo',
            height: 'fit-content', marginRight: 50, marginLeft: 50, fontSize: 55, color: '#fff' }}>
            OR
          </Button>
          <Button className={classes.button} href={KAKAO_LOGIN_URL}>
            KAKAO LOGIN
          </Button>
        </Box>
        <Box style={{ display: 'flex', justifyContent: 'center' }}>
          <img src={require("../statics/images/MainLogo.png")} alt="logo" />
        </Box>
      </Box>
    </Box>
  )
}

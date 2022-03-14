import React from 'react'
import { useNavigate } from 'react-router'
import { makeStyles } from '@mui/styles'
import { Box, Button } from '@mui/material'

import '../index.css'

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

  return (
    <Box className="main">
      <Box display="flex" justifyContent="center">
        <Box
          className="mainLoginButtonBox"
          style={{ position: 'absolute', left: 500, top: 750 }}
        >
          <Button className={classes.button} onClick={() => navigate('/')}>
            WITHOUT LOGIN
          </Button>
          <Button
            style={{ fontFamily: 'DungGeunmo',
            height: 'fit-content', marginRight: 50, marginLeft: 50, fontSize: 55, color: '#fff' }}>
            OR
          </Button>
          <Button className={classes.button}>
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

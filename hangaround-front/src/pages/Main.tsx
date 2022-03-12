import React from 'react'
import { Box, Button } from '@mui/material'
import { MainLogo } from '../statics/images/index.ts'
import '../index.css'

export default function Main(): React.ReactElement {
  return (
    <Box className="main">
      <Box display="flex" justifyContent="center">
        <Box className="mainLoginButtonBox" style={{ position: 'absolute', left: 500, top: 750 }}>
          <Button style={{ fontFamily: 'DungGeunmo', height: 'fit-content', fontSize: 55, color: '#fff' }}>
            WITHOUT LOGIN
          </Button>
          <Button style={{ fontFamily: 'DungGeunmo', height: 'fit-content', marginRight: 50, marginLeft: 50, fontSize: 55, color: '#fff' }}>
            OR
          </Button>
          <Button style={{ fontFamily: 'DungGeunmo', height: 'fit-content', fontSize: 55, color: '#fff' }}>
            KAKAO LOGIN
          </Button>
        </Box>
        <Box style={{ display: 'flex', justifyContent: 'center' }}>
          <img src={MainLogo} alt="logo" />
        </Box>
      </Box>
    </Box>
  )
}

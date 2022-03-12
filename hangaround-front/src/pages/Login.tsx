import React from 'react'
import { Box, Button } from '@mui/material'
import { RobotLoginLogo } from '../statics/images/index'
import '../index.css'

export default function Main() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      marginTop={10}
    >
      <img src={RobotLoginLogo} alt="logo" />
      <Box display="flex" flexDirection="row">
        <Button
          style={{     
            backgroundColor: '#7030A0',
            width: 300,
            height: 150,
            color: '#fff',
            fontSize: 55,
            fontFamily: 'DungGeunmo',
            marginRight: 100,
          }}
        >
          New
        </Button>
        <Button
          style={{
            backgroundColor: '#7030A0',
            width: 300,
            height: 150,
            color: '#fff',
            fontSize: 55,
            fontFamily: 'DungGeunmo',
          }}
        >
          Join
        </Button>
      </Box>
    </Box>
  )
}

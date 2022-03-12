import React from 'react'
import { createStyles, makeStyles } from '@mui/styles'
import { Box, Button } from '@mui/material'
import { RobotLoginLogo } from '../statics/images/index.ts'
import '../index.css'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
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
  }),
)

export default function Main(): React.ReactElement {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <img src={RobotLoginLogo} alt="logo" />
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

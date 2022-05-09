import React from 'react'
import { makeStyles } from '@mui/styles'
import { Box, Button, ButtonGroup, Typography, Divider } from '@mui/material'
import { ExitToApp, InsertLink, Settings, VideogameAsset } from '@mui/icons-material'
import Member from './Member'

const useStyles = makeStyles({
    optionBox: {
      display: 'flex',
      width: '30%',
      backgroundColor: '#7030A0',
      alignItems: 'center',
      paddingTop: 30,
      flexDirection: 'column',
    },
    optionGroup: {
      width: '90%',
      height: '1000px',
      backgroundColor: '#ffffff',
      marginTop: '30px',
    }
  })

interface OptionBoxProps {
   members?: Member[]
   onClickStartSpeech: () => void
   onClickStopSpeech: () => void
 }

export default function OptionBox(props: OptionBoxProps): React.ReactElement {
  const { members, onClickStartSpeech, onClickStopSpeech } = props 
  const classes = useStyles()

  return (
      <Box className={classes.optionBox}>
        <Box display="flex" flexDirection={"row"}>
          <Typography color="white" variant="h3" fontFamily="Dunggeunmo">채팅방 이름</Typography>
          <Box marginLeft={0}>
            <Button>
              <InsertLink style={{ color: "#300253", width: 50, height: 50 }} />
            </Button>
            <Button>
              <Settings style={{ color: "#300253", width: 50, height: 50 }} />
            </Button>
            <Button>
              <ExitToApp style={{ color: "#300253", width: 50, height: 50 }} />
            </Button>
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Button
            onClick={onClickStartSpeech}
            sx={{
              backgroundColor: 'white',
              color: '#7030A0',
              fontSize: 24,
              fontFamily: 'DungGeunmo',
              marginRight: 5
            }}
          >
            말하기
          </Button>
          <Button
            onClick={onClickStopSpeech}
            sx={{
              backgroundColor: 'white',
              color: '#7030A0',
              fontSize: 24,
              fontFamily: 'DungGeunmo'
            }}
          >
            멈추기
          </Button>
        </Box>
        <Box className={classes.optionGroup}>
          <Box padding={3}>
            <Typography color="#7030A0" variant="h4" fontFamily="Dunggeunmo">참여자 목록</Typography>
          </Box>
          <Divider color='#7030A0' />
        </Box>
        <Button
          style={{
            fontFamily: 'DungGeunmo',
            height: 'fit-content',
            width: 'fit-content',
            marginTop: 30,
            paddingLeft: 30,
            paddingRight: 30,
            fontSize: 55,
            borderRadius: 20,
            backgroundColor: '#fff',
            color: '#7030A0'
          }}>
            <VideogameAsset 
              style={{
                color: '#7030A0',
                marginRight: '10px',
                width: '50px',
                height: '50px'
              }}
            />
            GAME
          </Button>
        <ButtonGroup>
          <Button></Button>
          <Button></Button>
          <Button></Button>
        </ButtonGroup>
      </Box>
  )
}

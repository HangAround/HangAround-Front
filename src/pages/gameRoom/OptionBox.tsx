import React from 'react'
import { makeStyles } from '@mui/styles'
import { Box, Button, ButtonGroup, Typography, Divider } from '@mui/material'
import { ExitToApp, InsertLink, Settings, VideogameAsset, AccessAlarm } from '@mui/icons-material'
import _ from 'lodash'

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
      height: '600px',
      backgroundColor: '#ffffff',
      marginTop: '30px',
    }
  })

interface OptionBoxProps {
   members?: Member[]
   isTimerOn: boolean
   answer?: string
   leftTime: number
   onClickStartSpeech: () => void
   onClickStopSpeech: () => void
   onClickInviteButton: () => void
   onClickGameStart: () => void
 }

export default function OptionBox(props: OptionBoxProps): React.ReactElement {
  const {
    members,
    isTimerOn,
    answer,
    leftTime,
    onClickStartSpeech,
    onClickStopSpeech,
    onClickInviteButton,
    onClickGameStart
  } = props 
  const classes = useStyles()
  return (
      <Box className={classes.optionBox}>
        <Box display="flex" flexDirection={"row"}>
          <Typography color="white" variant="h3" fontFamily="Dunggeunmo">채팅방 이름</Typography>
          <Box marginLeft={0}>
            <Button onClick={onClickInviteButton}>
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
       {isTimerOn && (
       <Box
         sx={{
           display: 'flex',
           flexDirection: 'row',
           alignItems: 'center',
           justifyContent: 'center',
           width: '90%',
           backgroundColor: '#fff',
           marginTop: 3,
           borderRadius: 5,
           paddingTop: 2,
           paddingBottom: 2
         }}
       >
          <AccessAlarm
           sx={{
            color: '#7030A0',
            marginRight: '10px',
            width: '50px',
            height: '50px'
          }}/>
          <Typography color="#7030A0" variant="h4" fontFamily="Dunggeunmo">
            0{_.floor(leftTime / 60)} : {leftTime % 60 < 10 ? '0' + leftTime % 60 : leftTime % 60}
          </Typography>
        </Box>
        )}
        <Box className={classes.optionGroup}>
          <Box padding={3}>
            <Typography color="#7030A0" variant="h4" fontFamily="Dunggeunmo">
              {isTimerOn && !_.isNil(answer) ? "초성: " + answer : "참여자 목록"}
            </Typography>
          </Box>
          <Divider color='#7030A0' />
          {members.map((member: Member, index: number) => (
            <Typography key={index} color="#7030A0" variant="h4" fontFamily="Dunggeunmo">
              {member.userName}
            </Typography>
          ))}
        </Box>
        <Button
          sx={{
            fontFamily: 'DungGeunmo',
            height: 'fit-content',
            width: 'fit-content',
            marginTop: 3,
            paddingLeft: 3,
            paddingRight: 3,
            fontSize: 55,
            borderRadius: 20,
            backgroundColor: '#fff',
            color: '#7030A0'
          }}
          onClick={onClickGameStart}
        >
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

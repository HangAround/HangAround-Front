import React, {useCallback, useEffect, useState} from 'react'
import {makeStyles} from '@mui/styles'
import {Box, Button, Modal, Typography, TextField} from '@mui/material'
// TODO(seungji): png 파일 모듈로 import 하는 법 찾아보기
import '../index.css'
import {useLocation} from 'react-router-dom'
import {useModal} from 'react-modal-hook'
import {KeyboardVoice, Settings, Videocam} from '@mui/icons-material'
import axios from "axios";

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 200,
    },
    button: {
        backgroundColor: '#7030A0',
        width: 300,
        height: 150,
        color: '#fff',
        fontSize: 55,
        fontFamily: 'DungGeunmo',
        alignSelf: 'center',
    },
    modal: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1000,
        backgroundColor: 'white',
        border: '1px solid #000',
        borderRadius: 20,
        boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.5)',
        pt: 2,
        padding: 100,
        paddingBottom: 30,
        pb: 3,
    }
})


export default function Main(): React.ReactElement {

    const [roomCode, setRoomCode] = useState("");
    const [nickName, setNickName] = useState("");

    const classes = useStyles()
    const [openNewModal, setOpenNewModal] = useState(false)
    const [openJoinModal, setOpenJoinModal] = useState(false)
    const location = useLocation()

    const handleOnNewGameModalClick = useCallback(() => {
        setOpenNewModal(true)
    }, [setOpenNewModal])

    const handleOnNewGameModalClose = useCallback(() => {
        setOpenNewModal(false)
    }, [setOpenNewModal])

    const handleOnJoinGameModalClick = useCallback(() => {
        setOpenJoinModal(true)
    }, [setOpenNewModal])

    const handleOnJoinGameModalClose = useCallback(() => {
        setOpenJoinModal(false)
    }, [setOpenNewModal])

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

    //서버의 put join api 호출
    function join() {
        console.log(nickName);
        console.log(roomCode);
        if (roomCode === "") {
            window.alert("Room Code를 입력해주세요.")
            return;
        } else if (nickName === "") {
            window.alert("닉네임을 입력해주세요.");
            return;
        }

        const data = {
            "userId": 92,
            "userName": nickName,
            "roomCode": roomCode
        };
        const requestOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' +
                    '.eyJpZCI6IjkyIiwiaWF0IjoxNjUyNjE4MzQ3LCJleHAiOjE2NTI2Nj' +
                    'E1NDcsImlzcyI6Imhhbmdhcm91bmQifQ.' +
                    'UA5jvpxG98DJxcwGOQCadNE1sHjGHGflV14vff2QA2M'
            }
        };
        axios.put('http://3.36.52.175:3000/room/join-room', data, requestOptions)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <Box className={classes.root}>
            <img src={require("../statics/images/RobotLoginLogo.png")} alt="logo"/>
            <Box display="flex" flexDirection="row">
                <Button
                    className={classes.button}
                    style={{marginRight: 100}}
                    onClick={handleOnNewGameModalClick}
                >
                    New
                </Button>
                <Button className={classes.button} onClick={handleOnJoinGameModalClick}>
                    Join
                </Button>
                <Modal
                    open={openNewModal}
                    onClose={handleOnNewGameModalClose}
                >
                    <Box className={classes.modal}>
                        <Box display="flex" flexDirection="row">
                            <Box width={500} paddingBottom={5}>
                                <Typography variant="h3" fontFamily="DungGeunmo" color="#7030A0">
                                    Room Name
                                </Typography>
                            </Box>
                            <TextField fullWidth/>
                        </Box>
                        <Box display="flex" flexDirection="row">
                            <Box width={500} paddingBottom={5}>
                                <Typography variant="h3" fontFamily="DungGeunmo" color="#7030A0">
                                    Room Code
                                </Typography>
                            </Box>
                            <TextField fullWidth/>
                        </Box>
                        <Box display="flex" flexDirection="row">
                            <Box width={500}>
                                <Typography variant="h3" fontFamily="DungGeunmo" color="#7030A0">
                                    Room Size
                                </Typography>
                            </Box>
                            <TextField fullWidth/>
                        </Box>
                        <Button className={classes.button}
                                style={{height: 100, width: 200, marginTop: 30}}>
                            OK
                        </Button>
                    </Box>
                </Modal>
                <Modal
                    open={openJoinModal}
                    onClose={handleOnJoinGameModalClose}
                >
                    <Box className={classes.modal}>
                        <Box display="flex" flexDirection="row">
                            <Box width={500} paddingBottom={5}>
                                <Typography variant="h3" fontFamily="DungGeunmo" color="#7030A0">
                                    Room Code
                                </Typography>
                            </Box>
                            <TextField name="roomCode" fullWidth
                                       onChange={(e) => {
                                           setRoomCode(e.target.value);
                                       }}/>
                        </Box>
                        <Box display="flex" flexDirection="row">
                            <Box width={300}>
                                <Typography variant="h3" fontFamily="DungGeunmo" color="#7030A0">
                                    My SETTINGS
                                </Typography>
                            </Box>
                            <Settings style={{color: "#7030A0", width: 50, height: 50}}/>
                        </Box>
                        <Box borderRadius={10} border={1} padding={5} marginTop={5}>
                            <TextField name="nickName" placeholder="닉네임"
                                       onChange={(e) => {
                                           setNickName(e.target.value);
                                       }}/>
                            <Videocam style={{
                                color: "#7030A0",
                                width: 50, height: 50, marginLeft: 10
                            }}/>
                            <KeyboardVoice style={{
                                color: "#7030A0",
                                width: 50, height: 50, marginLeft: 10
                            }}/>
                        </Box>
                        <Button className={classes.button}
                                style={{height: 100, width: 200, marginTop: 30}}
                                onClick={() => join()}>
                            OK
                        </Button>
                    </Box>
                </Modal>
            </Box>
        </Box>
    )
}

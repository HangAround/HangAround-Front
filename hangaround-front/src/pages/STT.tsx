import React from "react";
import {makeStyles} from "@mui/styles";
import {Box} from "@mui/material";

const useStyles = makeStyles({
    html: {
        fontSize: 10
    },
    body: {
        background: '#ffc600',
        fontFamily: 'helvetica neue',
        fontWeight: 200,
        fontSize: 20
    },
    "& words": {
        maxWidth: 500,
        margin: '50 auto',
        borderRadius: 5,
        boxShadow: '10px 10px 0 rgba(0, 0, 0, 0.1)',
        padding: '1rem 2rem 1rem 5rem',
        background: "-webkit-gradient(linear, 0 0, 0 100%," +
            " from(#d9eaf3), color-stop(4%, #fff)) 0 4px",
        backgroundSize: '100% 3rem',
        position: "relative",
        lineHeight: 3
    },
    p: {
        margin: '0 0 3rem',
    },
    "& words::before": {
        content: '',
        position: "absolute",
        width: 4,
        top: 0,
        left: 30,
        bottom: 0,
        border: '1px solid',
        borderColor: 'transparent #efe4e4'
    }
})
export default function STT(): React.ReactElement {
    const classes = useStyles()
    return (
        <Box className={classes.body}>
            <div className={classes["&words"]} contentEditable={true}></div>
            <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
            <script src={require("./STTSrc")}></script>
        </Box>
    )
}
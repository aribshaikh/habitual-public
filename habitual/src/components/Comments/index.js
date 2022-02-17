import React from 'react';
import '../../App.css';
import './styles.css';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function Comments(props){
    // console.log("in comment component");
    // console.log(props.name); // this is undefined
    // console.log(props.handle);
    // console.log(props.comment);
    return (
    <Box sx ={{ml: 1}} className="comment">
        <Typography>
            <Box maxWidth="100%" sx={{textAlign: 'left', typography: 'subtitle2', fontWeight: 500}}>
                {props.name} @{props.handle}
            </Box>
            {/* <Box maxWidth="100%" sx={{ textAlign: 'left',  mb: 1, fontSize: 13 }}>
                @{props.handle}
            </Box> */}
            <Box maxWidth="100%" sx={{ textAlign: 'left', mb: 3}}>
                {props.comment}
            </Box>
        </Typography>
    </Box>
    );
}
import React from 'react'
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';


const Home = () => {
    return (
        <>
            <Box position={"relative"} width="100%" height="90vh">
                <img src='/travel.jpg' alt="Road" width={"100%"} height={"70%"} />
                <Typography
                    fontFamily={"quicksand, Dancing Script, cursive"}
                    fontWeight={"bold"}
                    variant='h3'
                    textAlign={'center'}
                    width="100%"
                    sx={{ position: "absolute", top: '0px', color: 'grey' }}>
                    Dare to live the life you have always wanted!
                </Typography>

                <Box width='100%' heigth='30%' display={'flex'} flexDirection={'column'}>
                    <Typography fontFamily={"quicksand"} textAlign={'center'} variant="h4" padding={4}>
                        SHARE YOUR TRAVEL DIARIES WITH US
                    </Typography>
                    <Box margin="auto">
                        <Button variant='outlined' sx={{ mr: 2 }}>Share Your Story</Button>
                        <Button LinkComponent={Link} to="/diaries" variant='contained' sx={{ ml: 2 }}>View Diaries</Button>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default Home;
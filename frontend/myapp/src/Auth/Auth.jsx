import React, { useState } from 'react'
import { Box, FormLabel, TextField, Typography, Button } from '@mui/material';
import { sendAuthRequest } from '../api-helpers/helpers';
import { useDispatch } from 'react-redux';
import { authActions } from '../store';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const [isSignup, setSignup] = useState(false);

    const onResRec = (data) => {
        if (isSignup) {
            localStorage.setItem('userId', data.user._id);
        }
        else {
            localStorage.setItem('userId', data.id);
        }
        dispatch(authActions.login());
        navigate('/diaries');
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(input)

        if (isSignup) {
            sendAuthRequest(true, input).then(onResRec).catch((err) => {
                console.log(err);
            });
        } else {
            sendAuthRequest(false, input).then(onResRec).catch((err) => {
                console.log(err);
            })
        }
    }

    const [input, setInput] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    return (
        <>
            <Box width="40%" borderRadius={10} boxShadow={'5px 5px 10px #ccc'} margin="auto" marginTop={10}>
                <form onSubmit={handleSubmit}>
                    <Box display="flex" flexDirection={"column"} width="60%" padding={5} margin="auto">
                        <Typography padding={1} variant='h4' textAlign="center">
                            {isSignup ? "Signup" : "Login"}
                        </Typography>
                        {isSignup && <><FormLabel>
                            Name
                        </FormLabel>
                            <TextField value={input.name} name="name" margin='normal' onChange={handleChange} />
                        </>}
                        <FormLabel>
                            Email
                        </FormLabel>
                        <TextField value={input.email} name="email" margin='normal' onChange={handleChange} />
                        <FormLabel>
                            Password
                        </FormLabel>
                        <TextField value={input.password} name="password" margin='normal' onChange={handleChange} />
                        <Button sx={{ mt: 2, borderRadius: 10 }} type="submit" variant="contained"
                        >
                            {isSignup ? "Signup" : "Login"}
                        </Button>
                        <Button sx={{ mt: 2, borderRadius: 10 }} variant="outlined" onClick={() => {
                            setSignup(!isSignup)
                        }}>
                            {isSignup ? "Login" : "Signup"}
                        </Button>

                    </Box>
                </form>
            </Box>
        </>
    )
}

export default Auth;
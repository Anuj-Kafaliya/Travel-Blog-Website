import React, { useState } from 'react'
import { Box, FormLabel, TextField, Typography, Button } from '@mui/material'
import TourIcon from '@mui/icons-material/Tour';
import { addPost } from '../api-helpers/helpers';
import { useNavigate } from 'react-router-dom';

const Add = () => {

    const navigate = useNavigate();

    const [input, setInput] = useState({
        title: '',
        description: '',
        location: '',
        imageUrl: '',
        date: '',
    });

    const handleChange = (e) => {
        setInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(input);
        addPost(input).then((res) => {
            console.log(res);
            navigate('/diaries');
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <>
            <Box display="flex" flexDirection={"column"} width="100%" height="100%">
                <Box display="flex" margin="auto" padding={2}>
                    <Typography variant='h4' fontFamily={"quicksand"}>
                        Add Your Travel Diary
                    </Typography>
                    <TourIcon sx={{ fontSize: '40px', fontWeight: "bold", paddingLeft: 1, color: 'lightcoral' }} />
                </Box>
                <form onSubmit={handleSubmit}>
                    <Box padding={3} width='60%' display="flex" margin="auto" flexDirection={"column"}>
                        <FormLabel>
                            Title
                        </FormLabel>
                        <TextField onChange={handleChange} name='title' value={input.title} variant='standard' margin='normal' />
                        <FormLabel>
                            Description
                        </FormLabel>
                        <TextField onChange={handleChange} name='description' value={input.description} variant='standard' margin='normal' />
                        <FormLabel>
                            Image URL
                        </FormLabel>
                        <TextField onChange={handleChange} name='imageUrl' value={input.imageUrl} variant='standard' margin='normal' />
                        <FormLabel>
                            Location
                        </FormLabel>
                        <TextField onChange={handleChange} name='location' value={input.location} variant='standard' margin='normal' />
                        <FormLabel>
                            Date
                        </FormLabel>
                        <TextField type='date' onChange={handleChange} name='date' value={input.date} variant='standard' margin='normal' />

                        <Button type='submit' variant='contained' color='warning' sx={{ width: '50%', margin: 'auto', mt: 2, borderRadius: 5 }}>Post</Button>
                    </Box>
                </form>
            </Box>
        </>
    )
}

export default Add
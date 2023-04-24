import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getPostDetails } from '../api-helpers/helpers';
import { Box, FormLabel, TextField, Typography, Button } from '@mui/material'
import TourIcon from '@mui/icons-material/Tour';
import { postUpdate } from '../api-helpers/helpers';

const DiaryUpdate = () => {
    const [post, setPost] = useState();

    const [input, setInput] = useState({
        title: '',
        description: '',
        location: '',
        imageUrl: '',
    });


    const id = useParams().id;
    console.log(id);

    useEffect(() => {
        getPostDetails(id).then((data) => {
            setPost(data.post);

            setInput({
                title: data.post.title,
                description: data.post.description,
                imageUrl: data.post.image,
                location: data.post.location,
            });
        }).catch((err) => {
            console.log(err);
        })
    }, [id]);

    const handleChange = (e) => {
        setInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(input);
        postUpdate(input, id).then((data) => {
            console.log(data)
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
                {post && (
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

                            <Button type='submit' variant='contained' color='warning' sx={{ width: '50%', margin: 'auto', mt: 2, borderRadius: 5 }}>Post</Button>
                        </Box>
                    </form>
                )}
            </Box>
        </>
    )
}

export default DiaryUpdate;
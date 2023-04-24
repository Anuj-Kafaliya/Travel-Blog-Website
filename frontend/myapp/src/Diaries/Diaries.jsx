import React, { useState, useEffect } from 'react'
import DiaryItem from './DiaryItem';
import { Box } from '@mui/material';
import { getAllPosts } from '../api-helpers/helpers';

const Diaries = () => {
    const [post, setPost] = useState();
    useEffect(() => {
        getAllPosts().then((data) => {
            setPost(data.posts)
        }).catch((err) => {
            console.log(err);
        })
    }, []);
    return (
        <>
            <Box display="flex" flexDirection={"column"} padding={3} justifyContent="center" alignItems={"center"}>
                {post && post.map((item, index) => (
                    <DiaryItem date={new Date(`${item.date}`).toLocaleDateString()}
                        description={item.description}
                        image={item.image}
                        id={item._id}
                        location={item.location}
                        title={item.title}
                        key={index}
                        user={item.user}

                    />
                ))}

            </Box>

        </>
    )
}

export default Diaries;
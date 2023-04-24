import React, { useState } from 'react'
import { Card, Avatar, CardHeader, IconButton, CardContent, Typography, Box, CardActions, Button, Snackbar, Alert } from '@mui/material'
import EditLocationIcon from '@mui/icons-material/EditLocation';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { postDelete } from '../api-helpers/helpers';

const DiaryItem = ({ title, description, image, location, date, id, user, }) => {
    const [open, setOpen] = useState();
    const isLoggedInUser = () => {
        if (localStorage.getItem('userId') === user) {
            return true;
        }
        return false;
    }

    const handleDelete = () => {
        postDelete(id).then((data) => {
            console.log(data)
        }).catch((err) => {
            console.log(err);
        })
        setOpen(true);
    }
    return (
        <>
            <Card sx={{ width: "40%", height: "auto", margin: 1, padding: 1, display: 'flex', flexDirection: "column", boxShadow: "5px 5px 10px #ccc" }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">

                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            {<EditLocationIcon />}
                        </IconButton>
                    }
                    title={location}
                    header={location}
                    subheader={date}
                />
                <img
                    height="194"
                    width="100%"
                    src="https://images.unsplash.com/photo-1679199685253-5041e82a4600?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                    alt={title}
                />
                <CardContent>
                    <Typography paddingBottom={1} variant="h6" color="text.secondary">
                        {title}
                    </Typography>
                    <hr />
                    <Box display="flex" paddingTop={1}>
                        <Typography width="170px" fontWeight={"Bold"} variant='div'>

                        </Typography>
                        <Typography paddingTop={1} variant="body2" color="text.secondary">
                            {description}

                        </Typography>
                    </Box>

                </CardContent>
                {isLoggedInUser() && (
                    <CardActions sx={{ ml: 'auto' }}>
                        <IconButton LinkComponent={Link} to={`/post/${id}`} color="warning">
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={handleDelete} color='warning'>
                            <DeleteIcon />
                        </IconButton>
                    </CardActions>
                )}
                <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
                    <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%' }}>
                        This is a success message!
                    </Alert>
                </Snackbar>
            </Card>
        </>
    )
}

export default DiaryItem;
const express = require('express');
const app = express();
const env = require('dotenv');
const mongoose = require('mongoose');
const userRouter = require('./routing/user-routes');
const postRouter = require('./routing/post-routes');
const cors = require('cors');

env.config();

app.use(cors());
app.use(express.json());
app.use('/user', userRouter);
app.use('/posts', postRouter);



mongoose.set('strictQuery', false);
mongoose.connect(
    `mongodb+srv://admin:fGeCe9VB8xbV7LXo@cluster0.gtge4qp.mongodb.net/?retryWrites=true&w=majority`
).then(() => {
    app.listen(4040, () => {
        console.log('listening to 4040');
    });
}).catch((err) => {
    console.log(err);
});




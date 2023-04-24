const { Post } = require('../models/post');
const { User } = require('../models/user');
const mongoose = require('mongoose');

module.exports.getAllPosts = async (req, res) => {
    let posts;
    try {
        posts = await Post.find().populate('user');
    } catch (err) {
        return console.log(err);
    }
    if (!posts) {
        return res.status(500).json({ message: "Unexpected Error" });
    }
    return res.status(200).json({ posts });
}

module.exports.addPost = async (req, res) => {
    const { title, description, location, date, image, user } = req.body;

    if (!title && title.trim() === "" && !description && description.trim() === "" && !location && location.trim() === ""
        && !date && !image === "" && !user) {
        return res.status(422).json({ message: "Invalid data" });
    }
    let existingUser;
    try {
        existingUser = await User.findById(user);
    } catch (err) {
        console.log(err);
    }
    if (!existingUser) {
        return res.status(404).json({ message: 'User Not Found' });
    }

    let post;
    try {
        post = new Post({ title, description, location, date: new Date(`${date}`), image, user });

        const session = await mongoose.startSession();

        session.startTransaction();
        existingUser.posts.push(post);
        await existingUser.save({ session });

        post = await post.save({ session });
        session.commitTransaction();
    } catch (err) {
        return console.log(err);
    }

    if (!post) {
        return res.status(500).json({ message: "Unexpected Error Occurred!!" });
    }
    return res.status(201).json({ post });
}

module.exports.getPostById = async (req, res) => {
    const id = req.params.id;

    let post;
    try {
        post = await Post.findById(id);
    } catch (err) {
        console.log(err);
    }
    if (!post) {
        return res.status(404).json({ message: "No Post found" });
    }
    return res.status(200).json({ post });
}

module.exports.updatePost = async (req, res) => {
    const id = req.params.id;
    const { title, description, location, image } = req.body;

    if (!title && title.trim() === "" && !description && description.trim() === "" && !location && location.trim() === ""
        && !image && !image.trim() === "") {
        return res.status(422).json({ message: "Invalid data" });
    }

    let post;
    try {
        post = await Post.findByIdAndUpdate(id, {
            title, description, location, image,
        });
    } catch (err) {
        return console.log(err);
    }

    if (!post) {
        return res.status(500).json({ message: "Unable to update" });
    }

    return res.status(200).json({ post });
}

module.exports.deletePost = async (req, res) => {
    const id = req.params.id;

    let post;
    try {
        post = await Post.findByIdAndRemove(id);
    } catch (err) {
        return console.log(err);
    }

    if (!post) {
        return res.status(500).json({ message: "Unable to delete" });
    }
    return res.status(200).json({ post });
}
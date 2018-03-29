const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    author: String,
    description: String,
    publishedAt: String,
    title: String,
    url: String,
    urlToImage: String
});

const UserSchema = new Schema({
    username: String,
    password: String
});

const PostModel = mongoose.model('PostModel', PostSchema);
const UserModel = mongoose.model('UserModel', UserSchema);

module.exports = {
    post: PostModel,
    user: UserModel
};
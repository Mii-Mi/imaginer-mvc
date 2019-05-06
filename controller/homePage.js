const Post = require('../database/models/Article'),
      User = require('../database/models/User');

module.exports = async (req, res) => {
    const posts = await Post.find({});
        res.render('index', { posts });
}
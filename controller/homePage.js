const Post = require('../database/models/Article'),
      User = require('../database/models/User');

module.exports = async (req, res) => {
    const posts = await Post.find({});
    console.log(req.session);

    User.findById(req.session.userId, (error, user) => {
        if (error) {
            console.log(error);
        }
        res.render('index', { posts, user });
    })
}
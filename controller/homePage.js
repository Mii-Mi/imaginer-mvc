const Post = require('../database/models/Article'),
      User = require('../database/models/User');

module.exports = async (req, res) => {
    const posts = await Post.find({}).limit(4).sort({ createDate: -1 }).then((posts) => {
        if (posts) {
            console.log(posts);
            res.render('index', { posts });
        } else {
            console.log('erreur db récup posts');
        }
    });
}
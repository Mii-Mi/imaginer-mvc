const Post = require('../database/models/Article'),
      User = require('../database/models/User');


module.exports = async (req, res) => {
    const article = await Post.findById(req.params.id);
    User.findById(req.session.userId, (error, user) => {
        if (error) {
            console.log(error);
        }
        res.render('articles', { article, user })
    })
}
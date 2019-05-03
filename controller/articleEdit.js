const User = require('../database/models/User'),
      Post = require('../database/models/Article');

module.exports = async (req, res) => {
    const article = await Post.findById(req.params.id);
    if (req.session.userId) {
        User.findById(req.session.userId, (error, user) => {
            if (error) {
                console.log(error);
            }
            console.log(article);

            res.render('article/edit', { user, article })
        })
    } else {
        res.redirect('/user/login')
    }
}
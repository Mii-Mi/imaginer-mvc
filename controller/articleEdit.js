const User = require('../database/models/User'),
      Post = require('../database/models/Article');

module.exports = (req, res) => {
    User.findById(req.session.userId, async (error, user) => {
        console.log(user.name);
        
        const article = await Post.findById(req.params.id);
            res.render('article/edit', { article , user })
    })
}
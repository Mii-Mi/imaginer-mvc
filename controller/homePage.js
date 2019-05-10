const Post = require('../database/models/Article'),
      User = require('../database/models/User');

module.exports = (req, res) => {

    let page = 0,
        src = '';

    if (req.params.page) {
        page = Number(page) + Number(req.params.page);
        src = '../'
    };

    Post.count({}, async (err, count) =>{
        if (err) {
            console.log(err);
        }
        const total = count;

        const posts = await Post.find({}).limit(4).skip(page).sort({ createDate: -1 }).then((posts) => {
            if (posts && page <= total - 4) {
                res.render('index', { posts, page, src });
            } else {
                page = page - 2
                req.flash('error', 'Il n\'y a plus d\'articles à lire')
                res.render('index', { posts, page, src })
            }
        });
    });
}
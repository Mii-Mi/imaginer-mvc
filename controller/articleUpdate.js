const Post = require('../database/models/Article'),
      path = require('path')

module.exports = (req, res) => {

    const { image } = req.files;
    const uploadFile = path.resolve(__dirname, '../public/articles', image.name);
    console.log(req._id);
    
    const query = { id: req.id };

    image.mv(uploadFile, (error) => {
        Post.findOneAndUpdate(
            query,
            {
                ...req.body,
                image: `/articles/${image.name}`
            },
            {useFindAndModify: false},
            (error, post) => {
                console.log(error);       
                res.redirect('/')
            }
        )
    })
}

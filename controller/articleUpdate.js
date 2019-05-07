const Post = require('../database/models/Article'),
      path = require('path'),
      fs = require('fs');

      
module.exports = (req, res) => {
          
    
    const imageToDelete = `public${req.body.imageOld}`;
    const { image } = req.files;
    const uploadFile = path.resolve(__dirname, '../public/articles', image.name);
    
    const query = { _id: req.body.articleId };

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
    });

    if (imageToDelete != `public/articles/${image.name}`){
        fs.unlink(imageToDelete, function (err, result) {
        console.log(err);
        });
    }
    
    
    
}

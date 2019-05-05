const Post = require('../database/models/Article'),
      path = require('path'),
      fs = require('fs');

      
module.exports = async (req, res) => {
const article = await Post.findById(req.params.id);      
console.log(article);

const imageToDelete = `public${article.image}`;
const query = article._id;
console.log(query);


Post.findByIdAndRemove(query,
    {useFindAndModify: false}, 
    function(err) {
    if (!err) {
        console.log('Suppression réussie');
    }else {
        req.flash('error', 'Échec de la suppression ...');
        res.redirect('/');
    }
});

fs.unlink(imageToDelete, function(err, result) {
    console.log(err);
});

req.flash('success', 'Suppression réussie !');
res.redirect('/');
}

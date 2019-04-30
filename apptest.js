const mongoose = require('mongoose');
const Article = require('./database/models/Article');

mongoose.connect('mongodb://localhost:27017/blog-test', { useNewUrlParser: true });

Article.findByIdAndUpdate(
    "5cc6f3a15db74c4ab5d11d22", 
    {title : 'IronMan'}, 
    (error, post) => {
    console.log(error, post);
    }
)

// Article.findById("5cc6f558dd49ff4dbfd9878f", (error, articles) => {
//     console.log(error, articles);
// })

// Article.find({
//     title: 'spiderMan'
// }, (error, articles) => {
//     console.log(error, articles);
// }) 

// Article.create({
//     title: 'spiderMan',
//     intro: 'Test d\'introduction',
//     content: 'Critique sur le film SpiderMan'
// }, (error, post) => {
//     console.log(error, post);
// }

// )
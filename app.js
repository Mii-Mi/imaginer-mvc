const express = require('express'),
      hbs = require('express-handlebars'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      fileupload = require('express-fileupload')

// Controller
const articleCreateController = require('./controller/articleAdd'),
      homePageController = require('./controller/homePage'),
      articleSingleController = require('./controller/articleSingle'),
      articlePostController = require('./controller/articlePost'),
      contactController = require('./controller/contact')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileupload());

mongoose.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true });

var Handlebars = require("handlebars");
var MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);


app.use(express.static('public'));

// Route
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'main' }));
app.set('view engine', 'hbs');

const middleware = (req, res, next) => {
    if(!req.file || !req.body.title || !req.body.content || !req.body.author){
        return res.redirect('/');
    }
    next()
}

app.use('articles/post', middleware);

app.get('/', homePageController); 

app.get('/contact', contactController);

// Articles
app.get('/articles/:id', articleSingleController);

app.get('/article/add', articleCreateController);

app.post('/articles/post', articlePostController);

app.listen(3000, function(){
    console.log('Le serveur tourne sur le port 3000');
});
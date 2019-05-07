const express = require('express'),
      hbs = require('express-handlebars'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      fileupload = require('express-fileupload'),
      expressSession = require('express-session'),
      MongoStore = require('connect-mongo'),
      flash = require('express-flash'),
      {stripTags} = require('./helpers/hbs')

// Controller
    // Articles
const articleCreateController = require('./controller/articleAdd'),
      homePageController = require('./controller/homePage'),
      articleSingleController = require('./controller/articleSingle'),
      articlePostController = require('./controller/articlePost'),
      articleEditController = require('./controller/articleEdit'),
      articleUpdateController = require('./controller/articleUpdate'),
      articleDeleteController = require('./controller/articleDelete'),
      contactController = require('./controller/contact'),
    
    // Users
      userCreateController = require('./controller/userCreate'),
      userRegister = require('./controller/userRegister'),
      userLogin = require('./controller/userLogin'),
      userLoginAuth = require('./controller/userLoginAuth')
      userLogout = require('./controller/userLogout')

const app = express();

const mongoStore = MongoStore(expressSession);

mongoose.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true });

app.use(expressSession({
    secret: 'securite',
    name: 'biscuit',
    saveUninitialized: true,
    resave: false,
    store: new mongoStore(
        {mongooseConnection: mongoose.connection}
    )
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileupload());
app.use(flash());

const auth = require('./middleware/auth');

var Handlebars = require("handlebars");
var MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);


app.use(express.static('public'));

// Route
app.engine('hbs', hbs({ 
    helpers: {stripTags: stripTags}, 
    extname: 'hbs', 
    defaultLayout: 'main' 
}));
app.set('view engine', 'hbs');
app.use('*', (req, res, next) => {
    res.locals.user = req.session.userId;
    console.log(res.locals.user);
    next()
})

// MiddleWare
const articleValidPost = require('./middleware/articleValidPost')
app.use('/articles/post', articleValidPost);

app.get('/', homePageController); 

app.get('/contact', contactController);

// Articles
app.get('/articles/:id', articleSingleController);
app.get('/article/add', auth, articleCreateController);
app.post('/articles/post', auth, articleValidPost, articlePostController);
app.get('/article/edit/:id', auth, articleEditController);
app.get('/article/delete/:id', auth, articleDeleteController);
app.post('/articles/update', auth, articleValidPost, articleUpdateController);

// Users
app.get('/user/create', userCreateController);
app.post('/user/register', userRegister);
app.get('/user/login', userLogin);
app.post('/user/loginAuth', userLoginAuth);
app.get('/user/logout',auth, userLogout);

app.use((req, res) => {
    res.render('error404')
})

// Run app
app.listen(3000, function(){
    console.log('Le serveur tourne sur le port 3000');
});

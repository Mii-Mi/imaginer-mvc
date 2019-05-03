const User = require('../database/models/User');


module.exports = (req, res) => {
    if(req.session.userId){
        User.findById(req.session.userId, (error, user) => {
        if (error) {
            console.log(error);
        }
        console.log(user);
        
        res.render('article/add', { user })
})
    }else{
        res.redirect('/user/login')
    }
}


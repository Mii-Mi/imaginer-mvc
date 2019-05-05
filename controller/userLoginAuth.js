const User = require ('../database/models/User'),
      bcrypt = require('bcrypt');

module.exports = (req, res) => {

    const { email, password} = req.body;
    User.findOne({email}, (error, user) => {
        if(user){
            bcrypt.compare(password, user.password, (error, same) => {
                if (same){
                    req.session.userId = user._id
                    req.flash('success', 'Connexion réussie !');
                    res.redirect('/')
                }else{
                    res.redirect('/user/login');
                }
            })
        }else{
            req.flash('error', 'Échec de la connexion. Veuillez essayer à nouveau ...');
            return res.redirect('/user/login')
        }
    })
}
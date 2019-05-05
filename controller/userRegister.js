const User = require('../database/models/User');

module.exports = (req, res) => {
    User.create (
        req.body, (error, user) => {

            if(error){
                req.flash('error', 'Échec de la création, essayez de nouveau ...');
                return res.redirect('/user/create')
            }
            req.flash('success', 'Enregistrement réussi, vous pouvez maintenant vous connecter !');
            res.redirect('/');
        }
    )
}
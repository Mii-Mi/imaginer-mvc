const User = require('../database/models/User');

module.exports = (req, res) => {

    User.findById(req.session.userId, (error, user) => {
        if (error || !user) {
            return res.redirect('/')
        }
        delete req.session.userId;
        req.flash('success', 'Vous êtes maintenant déconnecté !');
        return res.redirect('/')
    })
}

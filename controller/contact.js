const User = require('../database/models/User');

module.exports = (req, res) => {
    User.findById(req.session.userId, (error, user) => {
        if (error) {
            console.log(error);
        }
        res.render('contact', { user })
    })
}
module.exports = (req, res) => {

    res.render('register', {
        data: req.flash('data')[0]
    })
}
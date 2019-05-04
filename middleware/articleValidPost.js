module.exports = (req, res, next) => {
    if(!req.files) {
        console.log('articleValidError');
        return res.send('Veuillez sélectionner une image')
    }
    next()
}
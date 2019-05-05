module.exports = (req, res, next) => {
    if(!req.files) {
        console.log('articleValidError');
        req.flash('error', 'Veuillez sélectionner une image !');
        res.redirect(req.rawHeaders[11]); 
    }else{
        next()
    }
}
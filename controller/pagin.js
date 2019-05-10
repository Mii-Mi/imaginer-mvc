module.exports = (req, res) => {

// console.log(req);
page = Number(req.params.page);

    switch (req.url) {
        case `/page/next/${page}`:
            (function(){
                page += 1;
                res.redirect(`/slider/${page}`)
            })()
            break;
        case `/page/prev/${page}`:
            if(page > 0){
                (function(){
                page -= 1;
                res.redirect(`/slider/${page}`)
            })()
            }else{
                res.redirect('/')
            }
            break;
    
        default:
            req.flash('error', 'erreur, bouton non pris en charge')
            res.redirect('/');
            break;
    }
}
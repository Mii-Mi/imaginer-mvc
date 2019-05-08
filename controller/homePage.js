const Post = require('../database/models/Article'),
      User = require('../database/models/User');

module.exports = async (req, res) => {
    const posts = await Post.find({});
    console.log(posts);

    decodeHtml = function(str)
    {
        const map =
        {
            '&amp;': '&',
            '&lt;': '<',
            '&gt;': '>',
            '&quot;': '"',
            '&#039;': "'"
        };
        return str.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, function(m) {return map[m];});
    }
    
        res.render('index', { posts });
}
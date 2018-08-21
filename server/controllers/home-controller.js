module.exports = {
    indexGet: (req, res) => {
        res.render('home/index');
    },
    aboutGet: (req, res) => {
        res.render('home/about');
    }
};

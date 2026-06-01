exports.index = (req, res) => {

    res.render('dashboard/index', {
        user: req.session.user
    });

};
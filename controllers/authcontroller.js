const bcrypt = require('bcrypt');
const db = require('../config/database');

exports.loginPage = (req, res) => {
    res.render('auth/login');
};

exports.login = async (req, res) => {

    const { username, password } = req.body;

    const [rows] = await db.query(
        'SELECT * FROM users WHERE username=?',
        [username]
    );

    if (rows.length === 0) {
        return res.send('User tidak ditemukan');
    }

    const user = rows[0];

    const match = await bcrypt.compare(
        password,
        user.password
    );

    if (!match) {
        return res.send('Password salah');
    }

    req.session.user = user;

    res.redirect('/dashboard');
};

exports.logout = (req, res) => {

    req.session.destroy(() => {
        res.redirect('/');
    });

};
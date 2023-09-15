const AuthenticationService = require("../services/AuthenticationService")

const isAuthenticated = async (req, res, next) => {
    const response = await AuthenticationService.checkToken(req.session.token)
    if (!response.data.status) return res.render('pages/auth/login')
    if (!req.session.nik) return res.render('pages/auth/login')
    next()
}

module.exports = isAuthenticated

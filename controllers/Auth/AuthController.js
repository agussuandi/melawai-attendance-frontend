const AuthenticationService = require("../../services/AuthenticationService")

const AuthController = {
    async login(req, res, next) {
        const { nik, password } = req.body
        const response = await AuthenticationService.login({
            username: nik,
            password: password
        })
        
        if (response.data.status) {
            session          = req.session
            session.nik      = response.data.user.nik
            session.userName = response.data.user.name
            session.token    = response.data.token
            
            return res.redirect('/')
        }
        else {
            req.flash('notification', response.data.message)
            return res.redirect('back')
        }
    },
    async logout(req, res, next) {
        const response = await AuthenticationService.logout(req.session.token)
        if (response.data.status) {
            req.session.destroy((err) => {
                if (err) {
                    return res.json({status: false, error: err})
                }
                return res.redirect('/')
            })
        } else {
            return res.redirect('back')
        }
    }
}

module.exports = AuthController
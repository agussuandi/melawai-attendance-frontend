const { exec } = require('child_process')

const ClockOutController = {
    async index(req, res, next) {
        return res.render('pages/attendance/clockOut/index')
    },
    async store(req, res, next) {
        const { nik } = req.body
    
        exec(`node providers/ClockOut.js ${nik} ${req.session.token}`, (error, stdout, stderr) => {
            const response = stdout.replace(/\r?\n|\r/g, '')
            return res.render('pages/attendance/clockOut/result', {
                result: JSON.parse(response)
            })
        })
    }
}

module.exports = ClockOutController
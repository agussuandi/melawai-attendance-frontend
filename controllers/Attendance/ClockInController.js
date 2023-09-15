const { exec } = require('child_process')

const ClockInController = {
    async index(req, res, next) {
        return res.render('pages/attendance/clockIn/index')
    },
    async store(req, res, next) {
        const { nik } = req.body
    
        exec(`node providers/ClockIn.js ${nik} ${req.session.token}`, (error, stdout, stderr) => {
            const response = stdout.replace(/\r?\n|\r/g, '')
            res.render('pages/attendance/clockIn/result', {
                result: JSON.parse(response)
            })
        })
    }
}

module.exports = ClockInController
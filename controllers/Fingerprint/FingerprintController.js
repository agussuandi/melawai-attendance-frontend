const { exec } = require('child_process')

const FingerprintController = {
    async index(req, res, next) {
        return res.render('pages/fingerprint/index')
    },
    async store(req, res, next) {
        const { nik } = req.body
        exec(`node providers/CaptureFinger.js ${nik} ${req.session.token}`, (error, stdout, stderr) => {
            const response = stdout.replace(/\r?\n|\r/g, '')
            return res.render('pages/fingerprint/result', {
                result: JSON.parse(response)
            })
        })
    }
}

module.exports = FingerprintController
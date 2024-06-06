const moment = require("moment-timezone")
const { exec } = require('child_process')

const attendanceServices = require('../../services/AttendanceService')

const LiveAttendanceController = {
    async index(req, res) {
        return res.render('pages/front/live-attendance/index', {
            moment: moment,
            dotenv: process.env
        })
    },
    async last(req, res) {
        const resHome = await attendanceServices.getAttendanceHome()
        return res.json(resHome.data)
    },
    async store(req, res, next) {
        const { nik, code } = req.body

        exec(`node providers/Attendance.js ${nik} ${code} NON_TOKEN`, (error, stdout, stderr) => {
            const response = stdout.replace(/\r?\n|\r/g, '')
            return res.json({
                result: JSON.parse(response)
            })
        })
    }
}

module.exports = LiveAttendanceController
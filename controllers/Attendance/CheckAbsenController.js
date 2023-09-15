const attendanceServices = require('../../services/AttendanceService')

const CheckAbsenController = {
    async index(req, res, next) {
        const { nik } = req.query
        if (nik === undefined) {
            return res.render('pages/attendance/checkAbsen/index')
        }
        else {
            const attendance = await attendanceServices.attendanceCheck(nik, req.session.token)
            return res.render('pages/attendance/checkAbsen/result', {
                isValid: attendance.data.status,
                message: attendance.data.message,
                attendance: attendance.data.data
            })
        }
    },
}

module.exports = CheckAbsenController
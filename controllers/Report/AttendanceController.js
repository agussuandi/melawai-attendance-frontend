const attendanceServices = require("../../services/AttendanceService")

const AttendanceController = {
    async index(req, res, next) {
        const response = await attendanceServices.getAttendancePeriod(req.session.nik, req.session.token)

        return res.render('pages/report/attendance/index', {
            message: response.data.status ? false : response.data.message,
            attendances: response.data
        })
    },
}

module.exports = AttendanceController

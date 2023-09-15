const moment = require("moment-timezone")
const attendanceServices = require("../../services/AttendanceService")

const HomeController = {
    async index(req, res, next) {
        return res.render('pages/home/index')
    },
    async new(req, res) {
        const resHome = await attendanceServices.getAttendanceHome()
        
        return res.render('pages/home/new', {
            moment: moment,
            dotenv: process.env,
            // wib: moment().tz("Asia/Jakarta").format('YYYY-MM-DD hh:mm:ss'),
            // wita: moment().tz("Asia/Makassar").format('YYYY-MM-DD hh:mm:ss'),
            // wit: moment().tz("Asia/Jayapura").format('YYYY-MM-DD hh:mm:ss'),
            resHome: resHome?.data?.lastIn === null ? false : resHome.data
            // resHome: false
        })
    }
}

module.exports = HomeController

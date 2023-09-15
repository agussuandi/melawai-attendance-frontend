require('dotenv').config()
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')

const app = express()

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '/public')))
app.use(bodyParser.json())

const AuthController = require('./controllers/Auth/AuthController')
const HomeController = require('./controllers/Home/HomeController')
const ClockInController = require('./controllers/Attendance/ClockInController')
const ClockOutController = require('./controllers/Attendance/ClockOutController')
const AttendanceController = require('./controllers/Report/AttendanceController')
const CheckAbsenController = require('./controllers/Attendance/CheckAbsenController')
const FingerprintController = require('./controllers/Fingerprint/FingerprintController')

const LiveAttendanceController = require('./controllers/V2/LiveAttendanceController')

const isAuthenticated = require('./middleware/AuthenticateMiddleware')

const oneDay = 1000 * 60 * 60 * 24
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}))

app.use(flash())

app.use((req, res, next) => {
    res.locals.nik = req.session.nik
    res.locals.userName = req.session.userName
    res.locals.sideHeader = req.originalUrl
    res.locals.sideChild = req.originalUrl
    res.locals.notification = req.flash('notification')
    next()
})

app.get('/', isAuthenticated, HomeController.index)
app.get('/home', isAuthenticated, HomeController.index)
app.post('/login', AuthController.login)
app.post('/logout', isAuthenticated, AuthController.logout)
app.get('/attendance/clockIn', isAuthenticated, ClockInController.index)
app.post('/attendance/clockIn', isAuthenticated, ClockInController.store)
app.get('/attendance/clockOut', isAuthenticated, ClockOutController.index)
app.post('/attendance/clockOut', isAuthenticated, ClockOutController.store)
app.get('/attendance/check', isAuthenticated, CheckAbsenController.index)
app.get('/fingerprint', isAuthenticated, FingerprintController.index)
app.post('/fingerprint', isAuthenticated, FingerprintController.store)
app.get('/report/attendance', isAuthenticated, AttendanceController.index)

app.get('/v2',  LiveAttendanceController.index)
app.get('/v2/attendance/last', LiveAttendanceController.last)
app.post('/v2/attendance', LiveAttendanceController.store)

app.listen(3333, () => {
    console.log(`Server running on port 3333 🚀`)
})
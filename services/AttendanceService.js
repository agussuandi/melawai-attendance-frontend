const fs = require('fs')
const axios = require('axios')
const FormData = require('form-data')
const moment = require("moment-timezone")

const attendanceServices = {
    async getKaryawan(nik) {
        try {
            return await axios.get(`${process.env.HOST_BACKEND}/api/v1/karyawan/${nik}`)
                .then(result => {
                    return result
                })
                .catch(err => {
                    console.log(err)
                })
        } catch (e) {
            return { error: e.message };
        }
    },
    async attendanceCheck(nik, token) {
        try {
            return await axios.get(`${process.env.HOST_BACKEND}/api/v1/attendances/${nik}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(result => {
                    return result
                })
                .catch(err => {
                    console.log(err)
                })
        } catch (e) {
            return { error: e.message };
        }
    },
    async clockIn(username, code, token) {
        try {
            return await axios.post(`${process.env.HOST_BACKEND}/api/v1/attendances`, { nik: username, code: code, location: process.env.APP_KEY }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(result => {
                    return result
                })
                .catch(err => {
                    console.log(err)
                })
        } catch (e) {
            return { error: e.message };
        }
    },
    async clockOut(username, code, token) {
        try {
            return axios.put(`${process.env.HOST_BACKEND}/api/v1/attendances/${username}`, { nik: username, code: code, location: process.env.APP_KEY }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(result => {
                    return result
                })
                .catch(err => {
                    console.log(err)
                })
        } catch (e) {
            return { error: e.message };
        }
    },
    async fingerPrintStore(nik, name, token) {
        const fileFpt = fs.createReadStream("scans\\" + nik + ".txt")

        let form = new FormData()
        form.append("nik", nik)
        form.append("name", name)
        form.append("file", fileFpt)

        return axios.post(`${process.env.HOST_BACKEND}/api/v1/fingerPrint`, form, {
            headers: {
                ...form.getHeaders(),
                Authorization: `Bearer ${token}`
            }
        })
            .then(result => {
                return result
            })
            .catch(err => {
                console.log({ err })
            })
    },
    async getAttendancePeriod(nik, token) {
        try {
            return await axios.get(`${process.env.HOST_BACKEND}/api/v1/report/attendances?nik=${nik}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(result => {
                    return result
                })
                .catch(err => {
                    console.log(err)
                })
        } catch (e) {
            return { error: e.message };
        }
    },
    async getAttendanceHome() {
        try {
            return await axios.get(`${process.env.HOST_BACKEND}/api/v1/attendances/check?location=${process.env.APP_KEY}`, {
                headers: {
                    Authorization: `Bearer NON_TOKEN`
                }
            })
                .then(result => {
                    return result
                })
                .catch(err => {
                    console.log(err)
                })
        } catch (e) {
            return { error: e.message };
        }
    },
    async attendance(username, code, token) {
        try {
            return axios.post(`${process.env.HOST_BACKEND}/api/v1/attendances`, {
                code: code,
                datetime: moment().tz(process.env.APP_TIMEZONE).format('YYYY-MM-DD hh:mm:ss'),
                employee_nik: username,
                location_code: process.env.APP_KEY
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(result => {
                    return result
                })
                .catch(err => {
                    console.log(err)
                })
        } catch (e) {
            return { error: e.message };
        }
    },
}

module.exports = attendanceServices
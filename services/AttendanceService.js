
const axios = require('axios')
const fs = require('fs')
const FormData = require('form-data');

const attendanceServices = {
    async getKaryawan(nik) {
        try {
            return await axios.get(`${process.env}/api/v1/karyawan/${nik}`)
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
            return await axios.get(`${process.env}/api/v1/attendance/${nik}`, {
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
            return await  axios.post(`${process.env}/api/v1/attendance`, {nik: username, code: code, location: process.env.APP_KEY}, {
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
            return axios.put(`${process.env}/api/v1/attendance/${username}`, {nik: username, code: code, location: process.env.APP_KEY}, {
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
    async fingerPrintStore(username, token) {
        const fileFpt = fs.createReadStream("scans\\"+ username +".txt")
        
        let form = new FormData()
        form.append("file", fileFpt)
        form.append("name", username)
        
        return axios.post(`${process.env}/api/v1/fingerPrint`, form, {
            headers: {...form.getHeaders(),
            Authorization: `Bearer ${token}`
        } })
        .then(result => {
            return result
        })
        .catch(err => {
            console.log({err})
        })
    },
    async getAttendancePeriod(nik, token) {
        try {
            return await axios.get(`${process.env}/api/v1/report/attendance?nik=${nik}`, {
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
            return await axios.get(`${process.env}/api/v1/attendance?location=${process.env.APP_KEY}`, {
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
            return axios.post(`${process.env}/api/attendance`, {
                employee_nik: username, 
                code: code, 
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
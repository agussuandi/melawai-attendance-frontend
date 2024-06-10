const moment = require("moment-timezone")
const { exec } = require('child_process')
const https = require('https')
const fs = require('fs')
const path = require('path')
const axios = require('axios')

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
    },
    async karyawan(req, res) {
        try
        {
            const { id } = req?.params
            const urlKaryawan = `${process.env.HOST_BACKEND}/api/v1/karyawan/${id}`
            const responseKaryawan = await axios(urlKaryawan)
            if (responseKaryawan?.data?.status) {
                const urlPath = `${process.env.HOST_BACKEND}/storage/fpt/${id}.txt`
                // const filePath = path.join(`${__dirname}/scans`, `${id}.txt`)

                https.get(urlPath, response => {
                    if (response.statusCode === 200) {
                        const fileStream = fs.createWriteStream(`scans/${id}.txt`)
                        response.pipe(fileStream)
                
                        fileStream.on('finish', () => {
                            fileStream.close()
                            return response
                        })
                    } else {
                        return {
                            status: false,
                            message: `Failed to download file: ${response.statusCode}`
                        }
                    }
                })
            }
            else throw new Error('Data karyawan tidak ditemukan, silahkan registrasi atau hubungi HO')

            return res.json(responseKaryawan?.data)
        }
        catch (error)
        {
            return res.json({ status: false, message: error?.message })
        }
    },
}

module.exports = LiveAttendanceController
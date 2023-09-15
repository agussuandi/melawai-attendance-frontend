const attendanceServices = require("./services/AttendanceService")

const args = process.argv.slice(2);

if (args.length < 1) {
    console.log(`NIK tidak diketahui..`)
    process.exit()
}

const username = args[0]

const attendanceCheck = async username => {
    const response = await attendanceServices.attendanceCheck(username)
    if (response.data.status) {
        console.log(`Karyawan     : Agus Suandi\nNIK          : ${username}\nTanggal      : ${response.data.data.trans_date ?? '-'}\nAbsen Datang : ${response.data.data.clock_in ?? '-'}\nAbsen Pulang : ${response.data.data.clock_out ?? '-'}`)
    }
    else {
        console.log(`==== Belum Ada Absen Hari Ini ====`)
    }
}

initFunction = async () => {
    await attendanceCheck(username)
}

initFunction()
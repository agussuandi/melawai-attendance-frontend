
const axios = require('axios')

const AuthenticationService = {
    async login(payload) {
        try {
            return await axios.post(`${process.env}/api/v1/login`, payload)
            .then(result => {
                return result
            })
            .catch(err => {
                console.log(err)
            })
        } catch (e) {
            return { status: false, error: e.message };
        }
    },
    async logout(token) {
        try {
            return await axios.post(`${process.env}/api/v1/logout`, {}, {
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
            return { status: false, error: e.message };
        }
    },
    async checkToken(token) {
        try {
            return await axios.post(`${process.env}/api/v1/checkToken`, {}, {
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
            return { status: false, error: e.message };
        }
    },
}

module.exports = AuthenticationService
// var http = require('http');

// http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) {
//     resp.on('data', function(ip) {
//         console.log("My public IP address is: " + ip);
//     });
// });

// const fs = require('fs')
// const axios = require('axios')
// const FormData = require('form-data');

// axios({
//     method: 'GET',
//     url: 'http://127.0.0.1:8000/api/v1/fingerPrint'
// })
// .then(res => {
//     console.log(res.data.output)
// })

// const username = 'B23000020'
// const fileFpt = fs.createReadStream("scans\\"+ username +".fpt")
// const url = "http://127.0.0.1:8000/api/v1/fingerPrint"
// let form = new FormData();

// form.append("file", fileFpt)
// form.append("name", username)
// axios.post(url, form, { headers: {...form.getHeaders()} })
// .then(res => {
//     console.log(res.json())
// })
// .catch(err => {
//     console.log({err})
// })

// const attendanceServices = require("./services/AttendanceService")

// const lala = async () => {
//     const lulu = await attendanceServices.getKaryawan('B23000022')
//     console.log(lulu.data.output)
// }

// console.log(JSON.stringify({ status: true, message: 'Anda sudah melakukan Absen Datang' }))

const dart = `"{\"status\":false,\"message\":\"Anda sudah melakukan Absen Datang\"}"`
// console.log(dart.replaceAll('"{', '{'))
// console.log(dart.replaceAll('}"', '}'))
console.log(dart.slice(1, -1))

MIICATCCAasEggFyMIIBbjA0MC8CAQMCAQIEEJpxpBwAqkc4mARo/lXCBYsEEEedatG5qBHSp6cAQDOfExcCAwIAAAIBAQSCASwA4OkAyCrjc1yJOz1WpJ2RUKfDaR9vjyoLfZWO8lvG9u9xdm/DRd+/F6HboiTx/gyDzO6CmqS0XYR2PVsDuHDJlB1CU3FcHiTEJSEF8BEo8hFrZc3Mgqa0lHYKDfNXzJ6mhhhfu2U5eBahMYTxpkdmK3hSOrAaNnuHBkTxwNWCNOKRSprXLxfiG8NbHrvEQjDqW+h4xNMSa06Ys7kxUq84lolZOz+pUR3njqCfa4d0kejgH0wS9/WXctB7kqzn5kKOTjyiTT8Ta6+UdQkYZ8xq+W+bbL3nedfg0gMkeUUBArI0g6VYW0xY22+sJ4JvAAAAAAAAiWKrAST6qAIsa6wB/////zD6qAI6jKsBJPqoAl6MqwExSB17qgBLAAAAAJDQERYAeAETAFHI0hECAQACAQAEAAMRADX6ivTRs0k4kYO3jNcY2GgDEQChwhEAyqER0osCAJAnB1DEFw0wMzAzMDQyMjU5NDlaMA0GCSqGSIb3DQEBBAUAA0EARN2z5GAAvOEA+NFcUi4kFw2LPk8LcX1t2UXt6qEXMN/CUErdj85tNlf0e00DRi7rggoxS0G1laxvulLXPnzjKA==


MIIHdjCCBt8EggamMIIGojA0MC8CAQMCAQIEEFBf7KT+1UBerD8TpixQx2YEEEedatG5qBHSp6cAQDOfExcCAwIAAAIBAQSCBmAA+B0ByCrjc1yxUyXTVo5nIWTAFpChvZ+ZO5wrDoCzXrVusZnn9U52yYCmGpI6YacRiJ5FB7Y+f+4+DeNPGAhcnhhezEIxpynscYW9v4caAUSJZF17110yxWDMKDIuhAtKEw3+w3fPZDzTWG6fPDs6B0GIwg31OJJcwvuCSDf3NlrE7ock+tJ6gw8Kf2Rn2jOSdxYwo1YUMzVDT9WeyGonOqGZ0KOGIvPnE3O4NTlS1ytbzcarSWMcsUGYG1B5I+AeI4OzO6hD9hJjGVAmLgUy0VhaoES+Mzy05+4xbIUqrrghiMSn7B/XxekDY4YmNGodUpyQZOqFGej7bMPBG0mPwVnqGH108F7mipvp/XPpB8onkBcVAsfSCYRT53ZyfpRsbwD4+gDIKuNzXIVUFTqMwUKFNQnpHEBVWb/NfTaAWBJTOHFXgSgdpc+Zu90CvJqbBLqR/h8CxQ5yjHQZgvnJqvCh8PFgDjKgNbV37a1xeMEUfnFzDDDnuj4noI/AfRQbRrytu/gmE731JTX6656/DYf//6msWvAQ4kU2WErkZaxIaQXccDpZKi7JL2KUPDYEneowf0jCyL2hlELMyw8ELZJz5exY2Lln/z3vVCaVMpvjhhZRBcgDdlQqHOa3CjzL2FsXgEOyoHRRXKnlNlGuLwWInLD8wSt7Ef+3ZE894NV4lnBXZ4ljqFHSWl9leYkK3yjYLHBl0GPF2hzgrKXabwD4+QDIKuNzXIZSJmol3PUcPPAK3rZ65sSn05IYeq3QgeaHen7k854/8JfoGRcnOTxxl8IRtRz1bPW0BDa9vQ6wtua3FRY4t/PqDqXuxGKKV2asZ3y9dbgkYWPqRaQLJrbYrP7gD/Rgf9B+uLjq/2pocxlFCYvLeIWIoOAvPw5rESD3/nuSypLZqFUFyuJ7PpLVRRbBMtfjtyHodxRlNLi2GOSAnTYmTPT0usdvMsHNZOWpTweTZZGB564Crd7TKqjG21x3CaszgBUPOuIIzkjajWXH/N6NcMbYXspFt/vutlYIWEYNJO4RgN1W0hbjl2B0FHcOp2J8u/KDrXBvAOj/AMgq43NchV8XSFoy3bWygXqtudxsCzdauA82HSo7xrpiXBo/I7oXVY3HtfnTxzjZltined3P1l1jG6C4VdbT/1TpZv6w5ZvRObx5H2nza7a8fSh8rW2SCSIf2OQNop/szi+9ApvlNAdDftpGE1vKG1CME0wKZc3L3/zZgNN2PrY/oWshxbHXmhBqxgBBU3xvToofZjW7oGwubDMW98GAj9sfSJwK3of5YWj/E5XIKfhqwLtUCEaDqsMBHZ5vgx6VrqOMBPXg0pMxrnjHCJdMrAWLaVkEKyjnkARVjQ4WLQB3LBd+P6UuM9Hl8pMyIE0WS3L6hx7uQ0PfkgYVB/zAzm8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAQACAQAEAAMRAOncqG0MP0jYgxqcft5vYvgDEQChwhEAyqER0osCAJAnB1DEFw0yMzAxMDIwMTM4MDVaMA0GCSqGSIb3DQEBBAUAA4GBAKc5zJqrmWDabbEmUv3W+uEyRq0YL6ZknXXLGDkl1ZcATuvzGlEhIFtpP4pW0C6U1Q0fbjHuNn7wDCqv49/pSIEwehX3nPs+sJse9Ewlfj+EoPnDy9Y2TkKFR0OVN3pRBlQoCcJVkGZXT9tJPnf5diz6VLKKDqiHqltefzBQ5U/f
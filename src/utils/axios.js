import axios from "axios"

axios.defaults.headers.common['Content-Type'] = 'application/json'

let poxyUrl = "/dev/"
let isDev = process.env.NODE_ENV === "development"

const _axios = (url,data) => {
    if (isDev) url = poxyUrl + url
    return new Promise((res,rej)=>{
        axios.post(url, data)
        .then(function (response) {
            res(response.data);
        }).catch(function (error) {
            rej(error)
        });
    })
}
export default _axios

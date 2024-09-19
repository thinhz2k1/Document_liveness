import axios from "axios";

const instance = axios.create({
    // baseURL: 'http://192.168.0.126:8000/',
    baseURL: 'https://reqres.in/',
})

export default instance;
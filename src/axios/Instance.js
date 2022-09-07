import axios from "axios"
//baseURL = 'http://192.168.2.101:5000/'
baseURL = 'https://fyp-app-server.herokuapp.com/'

const instance = axios.create({ baseURL: baseURL });

export {instance}
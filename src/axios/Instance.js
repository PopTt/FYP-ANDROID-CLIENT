import axios from "axios"
//baseURL = 'http://192.168.2.101:5000/'
baseURL = 'https://fyp-app-server.herokuapp.com/'
testURL = 'http://192.168.0.212:5000/'

const instance = axios.create({ baseURL: testURL });

export {instance}
import axios from "axios"
//baseURL = 'http://192.168.2.101:5000/'
baseURL = 'https://fyp2-server.herokuapp.com/'
testURL = 'http://192.168.0.211:5000/'

const instance = axios.create({ baseURL: testURL });

export {instance}
import axios from "axios"
baseURL = 'http://192.168.2.102:5000/'

const instance = axios.create({ baseURL: baseURL });

export {instance}
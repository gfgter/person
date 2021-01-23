import axios from 'axios';

console.log('env', process.env.NODE_ENV)
    // 创建一个axios实例
export const request = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ?
        'http://47.103.207.13:2008/api' : 'http://47.103.207.13:2008/api'
})

export default request;
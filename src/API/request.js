//对axios进行二次封装
import axios from 'axios';
//引入进度条
import nprogress from 'nprogress'
//引入进度条样式
import "nprogress/nprogress.css";
import store from '@/store';
//start:进度条开始，done:进度条结束
//1.利用axios对象的方法create,去创建一个axios的实例
//2.request就是axios,只不过自己配置了一下
const requests = axios.create({
    //基础路径，发送请求的时候，路径当中会出现api
    baseURL: '/api',
    timeout: 5000,
});
//请求拦截器：在发送请求之前，请求拦截器可以检测到，可以在请求发送之前做一些事情
requests.interceptors.request.use((config) => {
        // config:配置对象，对象里面有一个属性很重要，header请求头
        if (store.state.Detail.uuid_token) {
            config.headers.userTempId = store.state.Detail.uuid_token;
        }
        if (store.state.User.token) {
            config.headers.token = store.state.User.token;
        }
        nprogress.start();
        return config;
    })
    //响应拦截器
requests.interceptors.response.use((res) => {
    //成功的回调函数：服务器响应的数据回来后，响应拦截器可以检测到，可以做一些事情
    nprogress.done();
    return res.data;
}, (error) => {
    //响应失败的回调函数
    return Promise.reject(new Error('faile'))
})

export default requests;
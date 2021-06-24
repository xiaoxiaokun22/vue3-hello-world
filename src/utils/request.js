import axios from 'axios';
import { message } from 'ant-design-vue';
import qs from 'qs';
import { store } from '../store';
const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    // baseURL: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
    // baseURL: 'http://61.174.52.49:8188/api/v1',
    baseURL: 'http://localhost:8081/mocks',
    // only applicable for request methods 'PUT', 'POST', and 'PATCH'
    // post时参数由[request payload]转为【form data】
    transformRequest: [
        data => qs.stringify(data)
    ],
    // paramsSerializer: params => qs.stringify(params),
    // validateStatus: status => {
    //     if ((status >= 200) && (status < 300)) {
    //         return true
    //     } else {
    //         handleError(status)
    //     }
    // },
    timeout: 10000
});

service.interceptors.request.use(
    config => {
        let auth =localStorage.getItem('token') || null;
        const brandId = 'all';
        //请求统一添加参数
        config.data = {
            ...config.data,
            _brand: brandId
        }
        //请求统一添加头信息
        config.headers = {
            ...config.headers,
            Authorization: auth
        }
        // console.log(config);
        return config;
    },
    error => {
        //console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        if (response.status && response.status === 200 && response.data.status == 'failure') {
            message.error(response.data.msg);
            return Promise.reject();
        }
        return response;
    },
    error => {
        //console.log(error);
        return Promise.reject();
    }
);

export default service;

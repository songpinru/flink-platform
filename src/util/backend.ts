import axios, { AxiosError } from "axios";
import { ElMessage } from "element-plus";
import  env  from "@/config/env";


const backend = axios.create({
    baseURL: env[import.meta.env.MODE].url,
    timeout: 1000,
    headers: { 'Content-Type': 'application/json' }
});

//响应拦截器，统一直接返回data
backend.interceptors.response.use((response)=>{
    return response.data
},(error:AxiosError)=>{
    //处理网络错误
    let msg = '';
    let status = error.response?.status;
    switch (status) {
        case 401:
            msg = "token过期";
            break;
        case 403:
            msg = '无权访问';
            break;
        case 404:
            msg = "请求地址错误";
            break;
        case 500:
            msg = "服务器出现问题";
            break;
        default:
            msg = "无网络";

    }
    ElMessage({
        type: 'error',
        message: msg
    })
    return Promise.reject(error);
})

export default backend;


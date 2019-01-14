import axios from 'axios';
import MD5 from 'js-md5';
import vue from '../main.js';
import DEV_CONFIG from './config.js';
import util from './util'
const service =axios.create({
    baseURL:DEV_CONFIG.dataServer,
    timeout:30000,
})

const DisplayActivityListDoQuery =DEV_CONFIG.dataServer+ 'activity/queryActivityList.json';//陈列活动接口

// request拦截器
service.interceptors.request.use(config => {    
    let context = util.getContext()
    config.data.context = context;
    config.data.sign=util.getSign(context);
    
    return config;
},error =>{
    Promise.reject(error);
})

// respone拦截器
service.interceptors.response.use(
    response => {
        if(response.data.errorMsg === "MEMBER_NOT_LOGIN"){
            sessionStorage.clear();
            vue.$router.replace('/');
        }else if( response.data.status === 1 ){                        
            if(DisplayActivityListDoQuery === response.config.url && response.data.data.items === 0){
                //品牌下无陈列活动
                vue.$Message.warning('该品牌暂无陈列活动')
                return
            }
            return response.data
        }else{
            vue.$Message.error(response.data.errorMsg)
            return response.data
        }
    },
    error => {
        if( error && error.response ){
            if( error.response.status !== 200 ){
                vue.$Message.error('系统繁忙，请稍后再试');
            }
        }

        console.log(error)
       
        return Promise.reject(error);
    }
)
export default service;
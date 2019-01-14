/*
 * 项目配置
 * */

// TEST 测试环境   PRO 生产环境  dev 本地环境
let RUNTIME_ENVIRONMENT = "";

let dommain = location.hostname; // 主机域名

let port = location.port;

if (dommain.search('112.124.18.48') != -1 || dommain.search('op.hzhuihe.cn') != -1 || (dommain.search('localhost') != -1 && port == '8083')) {
    RUNTIME_ENVIRONMENT = 'TEST'//测试环境
    // RUNTIME_ENVIRONMENT = 'pro'//正式环境
} else {
    RUNTIME_ENVIRONMENT = 'pro'
}

// RUNTIME_ENVIRONMENT = "TEST"

if (port == '8091') {
    RUNTIME_ENVIRONMENT = 'dev'
}
var PROJECT_CONFIG = {};



if (RUNTIME_ENVIRONMENT === "dev") {
    /*
     * 本地环境配置
     *
     * */
    PROJECT_CONFIG = {
        'VERSION': '1.0.0',
        'clientType': 'WEB',
        'rootPath': 'web',
        'dataServer': 'http://localhost:8080/hzai-web/',
        'downloadServer': 'http://localhost:8080',
        'ossServer': 'https://hbrand.oss-cn-hangzhou.aliyuncs.com/',
        'fileServer': 'http://localhost:8080/'
    };
}

if (RUNTIME_ENVIRONMENT === "pro") {
    /*
     * 生产环境配置
     *
     * */
    PROJECT_CONFIG = {
        'VERSION': '1.0.0',
        'clientType': 'WEB',
        'rootPath': 'web',
        // 'dataServer': 'http://pms.hzhuihe.cn/hzai/',
        'dataServer': 'http://112.17.87.71:8081/hzai/',
        'downloadServer': 'http://pms.hzhuihe.cn',
        'ossServer': 'https://hbrand.oss-cn-hangzhou.aliyuncs.com/',
        'fileServer': 'http://114.55.24.191:8090/',
        'littleGameServer': 'https://hzhuihe.cn/'
    };
}

if (RUNTIME_ENVIRONMENT === "TEST") {
    /*
     * 测试环境配置
     *
     * */
    PROJECT_CONFIG = {
        'VERSION': '1.0.0',
        'clientType': 'WEB',
        'rootPath': 'web',
        'dataServer': 'http://112.124.18.48:8090/hzai/',
        // 'dataServer': 'http://192.168.1.138:8080/hzai-web/',//张权
        'downloadServer': 'http://112.124.18.48:8090',
        'ossServer': 'https://hbrand.oss-cn-hangzhou.aliyuncs.com/',
        'fileServer': 'http://112.124.18.48:8090/',
        'littleGameServer': 'https://op.hzhuihe.cn/'
    };
}

PROJECT_CONFIG['uploadFile'] = PROJECT_CONFIG.dataServer + 'dataSet/doUploadFileToServer.file';
export default PROJECT_CONFIG
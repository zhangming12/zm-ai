import './plugins/crypto-min.js'
import './plugins/hmac-min.js'
import './plugins/sha1-min.js'
import Base64 from './plugins/base64.js'

var accessid= 'LTAIIKr2gHrLW1pp';
var accesskey= '8RuhER7GukaY9t2AKMhPrysTuYYLmt';
var host = 'https://hbrand.oss-cn-hangzhou.aliyuncs.com';
var g_dirname = '';
var g_object_name = '';
var policyText = {
    "expiration": "2020-01-01T12:00:00.000Z", //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
    "conditions": [
        ["content-length-range", 0, 1048576000] // 设置上传文件的大小限制
    ]
};

var policyBase64 = Base64.encode(JSON.stringify(policyText));
var message = policyBase64
var bytes = Crypto.HMAC(Crypto.SHA1, message, accesskey, { asBytes: true }) ;
var signature = Crypto.util.bytesToBase64(bytes);

var upData = {
    'OSSAccessKeyId': 'LTAIIKr2gHrLW1pp',
    'policy': policyBase64,
    'success_action_status': '200', //让服务端返回200,不然，默认会返回204
    'signature': signature
}

export default upData
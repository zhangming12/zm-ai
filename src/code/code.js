let code = {};

code.base = `
//成功返回
{
    "is_success": 1,
    "errorCode": null,
    "errorMsg": null
}
//失败返回
{
    "is_success": 0,
    "errorCode": "SYSTEM_ERROR",
    "errorMsg": "系统异常"
}
`;

code.bordered = `
//以Jquery为例
$.ajax({
    url:basePath + '/getUser',
    type:'post',
    dataType:'json',
    contentType:"application/json",
    async:true,//异步请求
    cache:false,
    data:JSON.stringify(sendData),//使用变量sendData
    //执行成功的回调函数
    success:function(data) {
        alert(data.info)
    },
    //执行失败或错误的回调函数
    error:function(data) {
        alert("认证失败");
    }
});
`;  

export default code;
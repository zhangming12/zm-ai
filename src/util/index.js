function formateTime(str) {
    //将日期字符串转为时间戳
    str = str.replace(/-/g, "/");
    return new Date(str).getTime();
}

function timeToString(time) {
    //将时间戳转为字符串
    let str = "";
    let data = new Date(Number(time));
    let year = data.getFullYear();
    let month = data.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    let day = data.getDate();
    day = day < 10 ? "0" + day : day;
    str = year + '-' + month + '-' + day + " 00:00:00";
    return str;
}
//搜索条件 时间默认当天 00:00:00-23:59:59
let myDate = new Date();
let tomorrowTimestamp = myDate.getTime();
let tomorrowTime = timeToString(tomorrowTimestamp);
let tomorrowTimes = formateTime(tomorrowTime) + 24 * 3600000;
let tomorrow = timeToString(tomorrowTimes);
// timestamp -= timestamp - 7*24*60*60*1000;
let todayYear = myDate.getFullYear(); //获取年份
let todayMonth = myDate.getMonth() + 1; //获取月份
todayMonth = todayMonth < 10 ? '0' + todayMonth : todayMonth;

let todayDate = myDate.getDate(); //获取月份
let todayDate1 = myDate.getDate(); //获取月份

todayDate = todayDate < 10 ? '0' + todayDate : todayDate; //当天
// let sevenAgoDate=(todayDate-7)<10?'0'+(todayDate-7):(todayDate-7);//7天之前

function getDate(index) { // 获取7天之前的时间
    var date = new Date(); //当前日期
    var newDate = new Date();
    newDate.setDate(date.getDate() + index); //官方文档上虽然说setDate参数是1-31,其实是可以设置负数的
    let getMonth = newDate.getMonth() < 9 ? '0' + (newDate.getMonth() + 1) : (newDate.getMonth() + 1)
    let getDate = newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate()
    var time = newDate.getFullYear() + "-" + getMonth + "-" + getDate;
    return time;
}

let sevenAgoDate = getDate(-7)
let threeAgoDate = getDate(-3)
let defaultTime = todayYear + '-' + todayMonth + '-' + todayDate; //2018-02-08
let default7Ago = todayYear + '-' + todayMonth + '-' + sevenAgoDate; //2018-02-08
// let tomorrow 

let defaultSameTime = todayYear + '-' + todayMonth + '-01'; // 2018-02-01

export let EDFAULT_TIME = defaultTime; //2018-01-17

let hours = myDate.getHours(); //获取当前小时数(0-23)
let minutes = myDate.getMinutes(); //获取当前分钟数(0-59)
let seconds = myDate.getSeconds(); //获取当前秒数(0-59)

export let EDFAULT_STARTTIME = sevenAgoDate + ' 00:00:00'; //2018-01-17 00:00:00
// export let EDFAULT_STARTTIME = threeAgoDate + ' 00:00:00';//2018-01-17 00:00:00
export let EDFAULT_THREE_AGOTIME = threeAgoDate + ' 00:00:00'; //2018-01-17 00:00:00
export let EDFAULT_START_7AGOTIME = sevenAgoDate + ' 00:00:00'; //2018-01-17 00:00:00

export let EDFAULT_STARTSAMETIME = defaultSameTime + ' 00:00:00'; //2018-01-17 00:00:00

export let TODAY_END = defaultTime + ' 24:00:00'; //2018-01-17 23:59:59

export let TODAY_START = defaultTime + ' 00:00:00';

export let EDFAULT_TOMORROW = tomorrow; //2018-01-18 00:00:00
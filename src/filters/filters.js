export function formatYearMonth(){
    /**
     * @desc 格式化时间
     * @param {String} 时间戳
     * @return {String} 11月11日
     */
    var time = new Date(time);
    var month = time.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }
    var day = time.getDate();
    if (day < 10) {
        day = '0' + day;
    }
    var date =  month + '月' + day+'日';
    return date
}
export function formatYear(time){
    /**
     * @desc 格式化时间
     * @param {String} 时间戳
     * @return {String} 2018-03-05
     */
        var time = new Date(time);
        var year = time.getFullYear();
        var month = time.getMonth() + 1;
        if (month < 10) {
            month = '0' + month;
        }
        var day = time.getDate();
        if (day < 10) {
            day = '0' + day;
        }
        var date = year + '-' + month + '-' + day;
        return date
}

export function formatDate(date, fmt) {
    /**
     * @desc 格式化时间
     * @return {String} 2018-03-02 17:34
     */
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};
function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}
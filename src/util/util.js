/*
 * @Author: lisong 
 * @Date: 2018-08-16 14:31:29 
 * @Last Modified by: lisong
 * @Last Modified time: 2018-08-24 14:44:12
 */

require('es6-promise').polyfill();
import axios from 'axios';
import Vue from 'vue';
import md5 from 'js-md5';
import vue from '../main.js';
import iVue from 'iview';
import DEV_CONFIG from './config.js';

Vue.use(iVue);
let util = {

    title: function (title) {
        title = title ? title : 'e店家后台管理系统';
        window.document.title = title;
    },
    ajax: axios.create({
        // baseURL: ajaxUrl,
        baseURL: DEV_CONFIG.dataServer,
        timeout: 30000,
        // contentType: 'application/json;charset=UTF-8'
    }),
    doPost(method, params, option, errorType) {
        iVue.Spin.show({
            render: (h) => {
                return h('div', {
                    style: {
                        width: '200px',
                        height: "200px",
                        background: "#000",
                        opacity: "0.2",
                        borderRadius: '10px',
                        paddingTop: '80px'
                    }
                }, [
                        h('Icon', {
                            'class': 'demo-spin-icon-load',
                            props: {
                                type: 'load-a',
                                size: 40,
                                color: "white"
                            },
                            style: {
                                animation: 'ani-demo-spin 1s linear infinite'
                            }
                        }),
                        h('p', {
                            style: {
                                color: "white",
                                fontSize: "14px"
                            }
                        }, '加载中...')
                    ])
            }
        });
        iVue.LoadingBar.start();
        this.ajax.post(method, this.getPramsData(params))
            .then(
                res => {
                    if (res.status === 200) {
                        if (typeof option == 'function') {
                            iVue.LoadingBar.finish();
                            if (res.data.status == 1) {
                                option(res.data.data);
                            } else {
                                if (res.data.errorMsg == 'MEMBER_NOT_LOGIN') {
                                    sessionStorage.clear();
                                    vue.$router.replace('/');
                                } else {
                                    if (!errorType) {
                                        vue.$Message.error(res.data.errorMsg)
                                    }
                                }
                            }
                        }
                    } else {
                        iVue.LoadingBar.finish();
                        vue.$Message.error('服务器异常，请联系：400-920-5710');
                    }
                    iVue.Spin.hide();
                }
            )
            .catch(error => {
                iVue.Spin.hide();
                iVue.LoadingBar.finish();
                if (error.response) {
                    if (error.response.status && error.response.status !== 200) {
                        vue.$Message.error(`系统繁忙(${error.response.status})，请联系：400-920-5710`);
                    } else {
                        vue.$Message.error(error.response.data.message);
                    }
                }
            })
    },
    downloadFile(method, params, option, errorType) {

        this.ajax.post(method, this.getPramsData(params))
            .then(
                res => {
                    const content = res;
                    const blob = new Blob([content]);
                    const fileName = "P50517-135940.jpg";
                    if ("download" in document.createElement("a")) {
                        // 非IE下载
                        const elink = document.createElement("a");
                        elink.download = fileName;
                        elink.style.display = "none";
                        elink.href = URL.createObjectURL(blob);
                        document.body.appendChild(elink);
                        elink.click();
                        URL.revokeObjectURL(elink.href); // 释放URL 对象
                        document.body.removeChild(elink);
                    } else {
                        // IE10+下载
                        navigator.msSaveBlob(blob, fileName);
                    }
                }
            )
            .catch(error => {
                iVue.Spin.hide();
                iVue.LoadingBar.finish();
                if (error.response) {
                    if (error.response.status && error.response.status !== 200) {
                        vue.$Message.error(`系统繁忙(${error.response.status})，请联系：400-920-5710`);
                    } else {
                        vue.$Message.error(error.response.data.message);
                    }
                }
            })
    },
    exportData(url, data) {
        axios({
            // 用axios发送post请求
            method: "post",
            url, // 请求地址
            data, // 参数
            responseType: "blob" // 表明返回服务器返回的数据类型
        }).then(res => {
            // 处理返回的文件流
            const content = res;
            const blob = new Blob([content]);
            const fileName = "aaa.jpg";
            if ("download" in document.createElement("a")) {
                // 非IE下载
                const elink = document.createElement("a");
                elink.download = fileName;
                elink.style.display = "none";
                elink.href = URL.createObjectURL(blob);
                document.body.appendChild(elink);
                elink.click();
                URL.revokeObjectURL(elink.href); // 释放URL 对象
                document.body.removeChild(elink);
            } else {
                // IE10+下载
                navigator.msSaveBlob(blob, fileName);
            }
        });
    },
    doPostNoLoading(method, params, option, errorType) {

        iVue.LoadingBar.start();
        this.ajax.post(method, this.getPramsData(params))
            .then(
                res => {
                    if (res.status === 200) {
                        if (typeof option == 'function') {
                            iVue.LoadingBar.finish();
                            if (res.data.status == 1) {
                                option(res.data.data);
                            } else {
                                if (res.data.errorMsg == 'MEMBER_NOT_LOGIN') {
                                    sessionStorage.clear();
                                    vue.$router.replace('/');
                                } else {
                                    if (!errorType) {
                                        vue.$Message.error(res.data.errorMsg)
                                    }
                                }
                            }
                        }
                    } else {
                        iVue.LoadingBar.finish();
                        vue.$Message.error('服务器异常，请联系：400-920-5710');
                    }
                }
            )
            .catch(error => {
                iVue.LoadingBar.finish();
            })
    },
    doGet(method, params, option, errorType) {
        iVue.LoadingBar.start();

        this.ajax.get(method, this.getPramsData(params))
            .then(
                res => {
                    if (typeof option == 'function') {
                        iVue.LoadingBar.finish();
                        if (res.data.status == 1) {
                            option(res.data.data);
                        } else {
                            if (res.data.errorMsg == 'MEMBER_NOT_LOGIN') {
                                sessionStorage.clear();
                                vue.$router.replace('/');
                            } else {
                                if (!errorType) {
                                    if (res.data.errorMsg) {
                                        vue.$Message.error(res.data.errorMsg)
                                    }
                                }
                            }
                        }
                    }
                }
            )
    },
    checkPhone(phone) {
        if (!/^1[3456789]\d{9}$/.test(phone)) {
            return false;
        } else {
            return true;
        }
    },
    getHoursData(time) {
        let num = Number(this.createTime(time).slice(11, 2));
        return num < 10 ? `0${num}:00` : `${num}:00`;
    },
    setHoursData(time, val) {
        if (!time) {
            // iVue.Message.info("时间不能为空");
            return false;
        }
        let str = "";
        if (typeof time != 'number') {
            if (typeof time == "string") {
                time = time.slice(0, 10);
                time = time.split("-").join("/");
                time = Date.parse(new Date(time));
            } else {
                time = time.getTime();
            }

        }
        str = this.createTime(time).slice(0, 11) + val + ":00";
        if (val == "24:00") {
            str = this.createTime(time + 24 * 3600 * 1000).slice(0, 11) + "00:00:00";
        }
        return str;
    },
    getContext() { //获取后台传入的公用数据
        var result = {};
        result['clientType'] = 'web';
        result['token'] = this.getToken();
        result['clientMac'] = '';
        result["timestamp"] = Date.now() + '';
        return result;
    },
    getSign(context) { // MD5加密
        var timestamp = context.timestamp;
        var token = context.token || '';
        // var content = (token + timestamp + "key=MKnEu6zaS04N23XoMUL8GOwOKIQwXMvT");
        var content = (token + timestamp + "key=MKnEu6zaS04N23XoMUL8GOwOKIQwXMvT");
        return md5(content).toUpperCase();
    },
    getPramsData(prams) { // 获取传入后台的具体DATA
        var result = {};
        var context = this.getContext();
        result['data'] = prams;
        result['context'] = context;

        result['sign'] = this.getSign(context);
        return result;
    },
    getToken () { // 获取TOKEN
        var user = sessionStorage.getItem("user");
        if (user) {
            user = JSON.parse(user);
            return user.token;
        } else {
            return "";
        }
    },
    getFormData (object) { // input的值
        var result = {};
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                result[key] = object[key].value
            }
        }
        return result
    },
    createTime(date) {
        /**
         * @desc 格式化时间
         * @param {String} 时间戳
         * @return {String} "2018-01-18 00:00:00"
         */
        var time = new Date(Number(date));
        if (time == 'Invalid Date') { // 日期格式不对
            return date
        } else {
            var time = time.getTime();
            var date = this.formatYear(time);
            var hours = this.formatTime(time);
            return date + ' ' + hours
        }
    },
    formatEndTime(date) {
        /**
         * @desc 格式化时间
         * @param {String} 时间戳
         * @return {String} "2018-01-18 23:59:59"
         */
        var time = new Date(Number(date));
        if (time == 'Invalid Date') { // 日期格式不对
            return date
        } else {
            var time = time.getTime();
            var date = this.formatYear(time);
            var hours = "23:59:59";
            return date + ' ' + hours
        }
    },
    defaultTime() { // 今天、昨天、明天、一周前、一月前
        var obj = {};
        var date = new Date();
        var todayTime = date.getTime();
        var yesterdayTime = todayTime - 3600 * 1000 * 24;
        var sevenDayTime = todayTime - 3600 * 1000 * 24 * 7;
        var tsmhdayTime = todayTime - 3600 * 1000 * 24 * 30;
        var tomorrow = todayTime + 24 * 3600 * 1000;

        // 今天
        obj['today'] = this.formatYear(todayTime);
        obj['yesterday'] = this.formatYear(yesterdayTime);
        obj['tomorrow'] = this.formatYear(tomorrow);
        obj['week'] = this.formatYear(sevenDayTime);
        obj['month'] = this.formatYear(tsmhdayTime);
        return obj
    },
    formatYear(time) { // 格式化年月日
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
    },
    formatYearMonth(time) {
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
        var date = month + '月' + day + '日';
        return date
    },
    formatTime(time) { // 格式化时分秒
        var time = new Date(time);
        var hours = time.getHours();
        if (hours < 10) {
            hours = '0' + hours;
        }
        var minute = time.getMinutes();
        if (minute < 10) {
            minute = '0' + minute;
        }
        var second = time.getSeconds();
        if (second < 10) {
            second = '0' + second;
        }
        var hours = hours + ':' + minute + ':' + second;
        return hours
    },
    Md5: function (pwd) { // md5签名
        return md5(pwd)
    },
    TimeDown: function (time, each, call) { // 倒计时
        var date = new Date(),
            StartTime = date.getTime();
        Time()
        var t = setInterval(Time, 1000);
        function Time() {
            var date = new Date(),
                ThisTime = date.getTime();
            var desc = ThisTime - StartTime;
            var showTime = time - parseInt(desc / 1000);
            if (typeof each == 'function') {
                each(showTime);
            }
            if (showTime <= 0) {
                clearInterval(t);
                if (typeof call == 'function') {
                    call();
                }
            }
        }
    },
    sendMsg(mobile, status, call) { // 发送验证码
        this.doPost('sendAuthCode.json', {
            phone: mobile,
            smsBizCode: status
        }, res => {
            call(res)
        })
    },
    isEmpty: function (object) {
        for (var name in object) {
            return false;
        }
        return true;
    },
    deleteEmptyProperty(object) { // 删除对象中的空值 空数组 空对象 
        for (var i in object) {
            var value = object[i];
            if (typeof value === 'object') {
                if (Array.isArray(value)) {
                    if (value.length == 0) {
                        delete object[i];
                        continue;
                    } else {
                        object[i] = object[i][object[i].length - 1]
                    }
                }
                this.deleteEmptyProperty(value);
                if (this.isEmpty(value)) {
                    delete object[i];
                }
            } else {
                if (value === '' || value === null || value === undefined) {
                    delete object[i];
                } else {
                }
            }
        }
    },
    JsonChange(data) {
        var obj = {}
        for (var i in data) {
            obj[i] = data[i]
        }
        return obj
    },
    getExportUrl(method, prams) { // 导出EXCEL
        var urlPrams = this.getPramsData(prams);
        return DEV_CONFIG.dataServer + method + '?jsonReq=' + JSON.stringify(urlPrams);
    },
    getBrands(call) { // 获取品牌列表
        this.doPost('brand/doQueryWithPage.json', {
            status: 1
        }, (res) => {
            if (typeof call == 'function') {
                call(res)
            }
        })
    },
    getActivityList(id, call) { // 获取活动列表
        this.doPost('activity/queryActivityList.json', {
            brandId: id
        }, (res) => {
            if (typeof call == 'function') {
                call(res)
            }
        })
    },
    getBankList(call) { // 获取银行列表
        this.doPost('brandAccount/getBankList.json', {}, (res) => {
            if (typeof call == 'function') {
                call(res)
            }
        })
    },
    mergeJson(a, b) {
        var obj = {};
        for (var i in a) {
            obj[i] = a[i]
        }
        for (var j in b) {
            obj[j] = b[j]
        }
        return obj
    },
    Count(a, b, num) {
        var number = ((a - b) / b).toFixed(num);
        if (number == Infinity) {
            return 10000
        } else if (number == -Infinity) {
            return -10000
        } else if (isNaN(number)) {
            return 0
        } else {
            return (number * 100).toFixed(1)
        }
    },
    brandList(call) { // 获取品牌列表
        var user = sessionStorage.getItem('user');

        if (user) {
            user = JSON.parse(user);
            if (user.userType === 'P') {
                this.getBrands(function (res) {
                    if (typeof call == 'function') {
                        call(res.datalist);
                    }
                })
            } else {
                //var brands = user.brands;
                var brands = user.brandInfoList;
                var arr = [];
                var obj = {};
                for (const item of brands) {
                    arr.push({
                        id: item.id,
                        brandName: item.brandName,
                        logoUrl: item.logoUrl
                    });
                }
                // for(var i in brands ){
                //     arr.push({
                //         id: i,
                //         brandName: brands[i]
                //     }); 
                // }
                if (typeof call == 'function') {
                    call(arr);
                }
            }
        }
    },
    redGoodsList: function (call) { // 红包奖项列表
        this.doPost('goodsInfo/queryWithPage.json', {
            status: 1,
            type: 2
        }, function (res) {
            if (typeof call == 'function') {
                call(res.datalist);
            }
        })
    },
    arrNoRepeat: function (array) {
        var arr = [];
        var json = {};
        for (var i = 0; i < array.length; i++) {
            if (!json[array[i]]) {
                arr.push(array[i]);
                json[array[i]] = 1;
            }
        }
        return arr;
    },
    changeArea(groupId, activityId, areaCode, call) {
        this.doPostNoLoading('queryActivityArea.json', {
            activityId: activityId,
            areaCode: areaCode,
            groupId: groupId
        }, (res) => {
            call(res)
        })
    },
    Percentage(number1, number2) {
        return (Math.round(number1 / number2 * 10000) / 100.00 + "%");// 小数点后两位百分比

    },
    getRandomStr(len = 32) { //生成随机数
        const $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        const maxPos = $chars.length;
        let str = '';
        for (let i = 0; i < len; i++) {
            str += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return str;
    },
    deepCopy(data) { //拷贝数组、对象
        function typeOf(obj) {
            const toString = Object.prototype.toString;
            const map = {
                '[object Boolean]': 'boolean',
                '[object Number]': 'number',
                '[object String]': 'string',
                '[object Function]': 'function',
                '[object Array]': 'array',
                '[object Date]': 'date',
                '[object RegExp]': 'regExp',
                '[object Undefined]': 'undefined',
                '[object Null]': 'null',
                '[object Object]': 'object'
            };
            return map[toString.call(obj)];
        }
        const t = typeOf(data);
        let o;

        if (t === 'array') {
            o = [];
        } else if (t === 'object') {
            o = {};
        } else {
            return data;
        }

        if (t === 'array') {
            for (let i = 0; i < data.length; i++) {
                o.push(this.deepCopy(data[i]));
            }
        } else if (t === 'object') {
            for (let i in data) {
                o[i] = this.deepCopy(data[i]);
            }
        }
        return o;
    },
    ENUMS: {
        goodsType: {
            '0': '电子券',
            '1': '实物',
            '2': '电子红包',
            '5': '咪咕流量包',
            '9': '谢谢惠顾'
        },
        blackType: {
            '0': '正常',
            '1': '异常'
        },
        payStatus: {
            'unpay': '未支付',
            'paid': '已支付',
            'confirm': '退回',
            'success': '成功'
        },
        userType: {
            'A':'审核员',
            'P': '平台',
            'V': "品牌商",
            'W': '品牌业务员',
            "B": "B端门店",
            "BI": "B端导入门店",
            "C": "C端客户",
            "DM": "主任",
            "LM": "配送员",
            "PI": "巡检员",
            "CL": "公司领导",
            "ES": "内部员工",
            "FS": "工厂员工",
            "HX": "核销员",
            "M":"经销商"
        },
        textType: {
            'text': '图文',
            'video': '视频'
        },
        limitType: {
            '0': '未受限',
            '1': '受限'
        },
        workerType: {
            '0': '未绑定',
            '1': '已绑定'
        },
        activityType: {
            '1': '进行',
            '2': '暂停',
            '3': '未开始',
            '4': '已结束'
        },
        userStauts: { // 用户状态类型
            '0': '初始',
            '1': '正常',
            '2': '锁定',
            '3': '注销',
        },
        harvestStauts: {//收货状态
            '0': '未发货',
            '1': '已发货',
            '2': '已收货',
        },
        complateStatus: { //门店状态
            '0': '未完善',
            '1': '已完善'
        }
    },
    openNewPage(vm, path, query) {
        let pageOpenedList = vm.$store.state.app.pageOpenedList;
        let openedPageLen = pageOpenedList.length;
        let i = 0;
        let tagHasOpened = false;
        while (i < openedPageLen) {
            if (path === pageOpenedList[i].path) { // 页面已经打开
                vm.$store.commit('pageOpenedList', {
                    index: i,
                    path: path,
                    query: query
                });
                tagHasOpened = true;
                break;
            }
            i++;
        }
        if (!tagHasOpened) {
            let tag = vm.$store.state.app.tagsList.filter((item) => {
                return path === item.path;
            });
            tag = tag[0];
            if (tag) {
                tag = tag.children ? tag.children[0] : tag;
                // if (argu) {
                //     tag.argu = argu;
                // }
                if (query) {
                    tag['query'] = query;
                }
                vm.$store.commit('increateTag', tag);
            }
        }
    }
};
util.title = function (title) {
    title = title ? title : 'e店家后台管理系统';
    window.document.title = title;
};



export default util;
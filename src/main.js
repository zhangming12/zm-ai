/*
 * @Author: lisong 
 * @Date: 2017-09-08 20:49:03 
 * @Last Modified by: lisong
 * @Last Modified time: 2018-08-16 15:37:42
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import $ from 'jquery'
import App from './App'
import { router } from './router'
import store from './store/store'
import iView from 'iview'
import Util from './util/util'
import "!style-loader!css-loader!less-loader!./assets/index.less"
import "./styles/index.less";//自定义公共css样式

Vue.config.productionTip = false;
Vue.use(iView);
Vue.prototype.Global = Util;
/* 
    iview全局提示配置
*/
Vue.prototype.$Message.config({
    duration: 2.5
});
/* 
  路由配置
*/
router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    if (!sessionStorage.getItem('user') && to.name !== 'login') {  // 判断是否已经登录且前往的页面不是登录页
        next({
            name: 'login'
        });
    } else if (sessionStorage.getItem('user') && to.name === 'login') {  // 判断是否已经登录且前往的是登录页
        next({
            name: 'home'
        });
    } else {
        next();
    }
});

router.afterEach((to, from) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0)
})
// 日期处理
Date.prototype.pattern = function (fmt) { // 日期处理
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    var week = {
        "0": "\u65e5",
        "1": "\u4e00",
        "2": "\u4e8c",
        "3": "\u4e09",
        "4": "\u56db",
        "5": "\u4e94",
        "6": "\u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[this.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

/* eslint-disable no-new */
var vm = new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})

export default vm

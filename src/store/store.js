import vue from 'vue';

import vuex from 'vuex';

import app from './modules/app';

vue.use(vuex);

export default new vuex.Store({
    state: {
        salaemanData: '',
        displaySkuData:[],
        skuList:{},
        status:false
    },
    mutations: {
        default (state,data) {
            state.salaemanData = data;
        },
        clearDisplaySkuData(state){
            //陈列 --> 清空sku数据
            state.displaySkuData = [];
        },
        resetDispalySkuData(state,data){
            //陈列 --> 设置sku数据
            state.displaySkuData = data;
        },
        //活动设置sku清空
        settingSkuClear(state){
            state.skuList = {}
        },
        //活动设置存储sku
        settingSkuSave(state,key,value){
            state.skuList[key] = value;
            state.status = true;
        },
        changeStatus(state){
            state.status = !state.status;
        }

    },
    modules: {
        app
    }
})
/*
 * @Author: zm 
 * @Date: 2018-11-21
 * @Last Modified by: zm
 * @Last Modified time: 2018-11-21
 */
import Vue from 'vue'
import Router from 'vue-router'
//开发环境不适用懒加载
const _import = require('./_import_' + process.env.NODE_ENV);

Vue.use(Router)

export const routers = [
    {
        path: '/',
        name: 'login',
        meta: {
            title: '登录'
        },
        component: _import('login')
    },
    // {
    //     path: '/',
    //     name: 'login',
    //     meta: {
    //         title: '登录'
    //     },
    //     component: _import('labelManagement/label-management')
    // },
    {
        path: '/home',
        name: 'home',
        meta: {
            title: ''
        },
        component: _import('index'),
        children: [
            {
                path: '/index',
                title: '首页',
                name: 'index',
                component: _import('index/index')
            },
            //图片标注
            {
                path: '/imageOverlays',
                title: '图片标注',
                name: 'imageOverlays',
                component: _import('imageOverlays/image-overlays')
            },
            //图片审核
            {
                path: '/imageAudit',
                title: '图片审核',
                name: 'imageAudit',
                component: _import('imageAudit/image-audit')
            },
            //标签管理
            {
                path: '/labelManagement',
                title: '标签管理',
                name: 'labelManagement',
                component: _import('labelManagement/label-management')
            },
            //数据集管理
            {
                path: '/datasetManagement',
                title: '数据集管理',
                name: 'datasetManagement',
                component: _import('datasetManagement/dataset-management')
            },
            //数据集下载
            {
                path: '/datasetDownload',
                title: '数据集下载',
                name: 'datasetDownload',
                component: _import('datasetDownload/dataset-download')
            },
            //人员维护
            {
                path: '/personnelMaintenance',
                title: '人员维护',
                name: 'personnelMaintenance',
                component: _import('personnelMaintenance/personnel-maintenance')
            },
            //图片查看
            {
                path: '/imageLook',
                title: '图片查看',
                name: 'imageLook',
                component: _import('imageLook/image-look')
            },
            //品牌导入
            {
                path: '/importBrand',
                title: '品牌导入',
                name: 'importBrand',
                component: _import('importBrand/import-brand')
            },
            //菜单管理
            {
                path: '/menuManagement',
                title: '菜单管理',
                name: 'menuManagement',
                component: _import('menuManagement/menu-management')
            },
            //角色管理
            {
                path: '/roleManagement',
                title: '角色管理',
                name: 'roleManagement',
                component: _import('roleManagement/role-management')
            },
            //角色管理-新建/修改角色
            {
                path: '/createNewRole',
                title: '新建/修改角色',
                name: 'createNewRole',
                component: _import('roleManagement/create-new-role')
            },
            //品牌维护
            {
                path: '/brandManage',
                title: '品牌维护',
                name: 'brandManage',
                component: _import('brandManage/brand-manage')
            },
            //产品类别
            {
                path: '/productManage',
                title: '产品类别',
                name: 'productManage',
                component: _import('productManage/product-manage')
            },
            //demo
            {
                path: '/demo',
                title: 'demo',
                name: 'demo',
                component: _import('demo/demo')
            },
            {
                path: '/imageDemo',
                title: 'imageDemo',
                name: 'imageDemo',
                component: _import('demo/imageDemo')
            },
        ]
    }
];

export const router = new Router({
    routes: routers
})

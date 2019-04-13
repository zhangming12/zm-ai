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

export const routers = [{
        path: '/',
        name: 'login',
        meta: {
            title: '登录'
        },
        component: _import('login')
    },
    {
        path: '/home',
        name: 'home',
        meta: {
            title: ''
        },
        component: _import('index'),
        children: [{
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
            //外包图片审核
            {
                path: '/outImageAudit',
                title: '图片审核',
                name: 'outImageAudit',
                component: _import('outsource/image-audit')
            },
            //外包图片标注
            {
                path: '/outImageOverlays',
                title: '图片标注',
                name: 'outImageOverlays',
                component: _import('outsource/image-overlays')
            },
            //图片审核外包
            {
                path: '/imageAuditOut',
                title: '复审',
                name: 'imageAuditOut',
                component: _import('imageAudit/image-audit-out')
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
            //外包数据集管理
            {
                path: '/outDatasetManagement',
                title: '数据集管理',
                name: 'outDatasetManagement',
                component: _import('outsource/datasetManagement/dataset-management')
            },
            //外包数据集管理-标签管理
            {
                path: '/outLabelManege',
                title: '数据集管理',
                name: 'outLabelManege',
                component: _import('outsource/datasetManagement/label-manage')
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
            //外包人员维护
            {
                path: '/outPersonnelMaintenance',
                title: '人员维护',
                name: 'outPersonnelMaintenance',
                component: _import('outsource/personnel-maintenance')
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
            //外包角色管理
            {
                path: '/outRoleManagement',
                title: '角色管理',
                name: 'outRoleManagement',
                component: _import('outsource/roleManagement/role-management')
            },
            //外包角色管理-新建/修改角色
            {
                path: '/outCreateNewRole',
                title: '新建/修改角色',
                name: 'outCreateNewRole',
                component: _import('outsource/roleManagement/create-new-role')
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
            //参数配置
            {
                path: '/parameterSetting',
                title: '参数配置',
                name: 'parameterSetting',
                component: _import('parameterSetting/parameter-setting')
            },
            //公司管理
            {
                path: '/businessOrganization',
                title: '公司管理',
                name: 'businessOrganization',
                component: _import('businessOrganization/business-organization')
            },
            //标注看板
            {
                path: '/labelKanban',
                title: '标注看板',
                name: 'labelKanban',
                component: _import('labelKanban/label-kanban')
            },
            //标注看板个人
            {
                path: '/labelKanbanPersion',
                title: '标注看板',
                name: 'labelKanbanPersion',
                component: _import('labelKanban/label-kanban-persion')
            },
            //API管理--个人中心
            {
                path: '/personalCenter',
                title: '个人中心',
                name: 'personalCenter',
                component: _import('APIManage/personal-center')
            },
            //API管理--技术文档
            {
                path: '/technicalDocumentation',
                title: '技术文档',
                name: 'technicalDocumentation',
                component: _import('APIManage/technical-documentation')
            },
            //API管理--接口信息
            {
                path: '/interfaceInformation',
                title: '接口信息',
                name: 'interfaceInformation',
                component: _import('APIManage/interface-information')
            },
            //API管理--客户信息
            {
                path: '/userInformation',
                title: '客户信息',
                name: 'userInformation',
                component: _import('APIManage/user-information')
            },
            //API管理--监控报表
            {
                path: '/monitoringReport',
                title: '监控报表',
                name: 'monitoringReport',
                component: _import('APIManage/monitoring-report')
            },
            //API管理--模型列表
            {
                path: '/modelList',
                title: '模型列表',
                name: 'modelList',
                component: _import('APIManage/model-list')
            },
            //标注报表
            {
                path: '/labelTable',
                title: '标注报表',
                name: 'labelTable',
                component: _import('labelTable/label-table')
            },
            //类别管理
            {
                path: '/categoryManagement',
                title: '类别管理',
                name: 'categoryManagement',
                component: _import('brandManage/category-management')
            },
            //标签管理
            {
                path: '/labelManage',
                title: '标签管理',
                name: 'labelManage',
                component: _import('datasetManagement/label-manage')
            },
            //标注数据统计
            {
                path: '/labelDataSummary',
                title: '标注数据统计',
                name: 'labelDataSummary',
                component: _import('dataSummary/label-data-summary')
            },
            //审核数据统计
            {
                path: '/auditDataSummary',
                title: '审核数据统计',
                name: 'auditDataSummary',
                component: _import('dataSummary/audit-data-summary')
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
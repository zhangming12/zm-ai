<style lang="less" scoped>
    .goodsDetail{
        overflow: hidden;  
        .showVideoPlay{
            width: 180px;
            height: 200px;
            position: relative;
            video{
                width: 100%;
                height: 98%;
            }
            .ivu-btn{
                padding: 3px 15px;
            }
            .triangle{
                position: absolute;
                top: 0;
                z-index: 99;
                width: 50px;
                height: 50px;
            }
        }        
        .goodsInfor{
            margin-top: 12px;
            p{
                margin-bottom: 12px;
            }
        }
        Button{
            padding: 3px 10px;
        }
    }
    .lookDetail{
        overflow: hidden;
        margin-bottom: 10px;
        .btnDetail{
            float: right;
        }
    }
    .colorError{
        color: #ed3f14;
    }
    .overflow{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>

<template>
        <Card>                            
            <div class="goodsDetail">           
                <Row>
                    <Col span="11">
                        <div class="showVideoPlay">
                            <video  :src="storeInfor.firstRadioUrl"  controls></video> 
                            <img class="triangle" src="../assets/image/triangle-first.jpg" >                                
                        </div>                                
                        <div class="goodsInfor">
                            <P>拍摄时间：{{storeInfor.uploadTime | formatDate}}</P>
                            <P>客户编号：{{storeInfor.joinCode }}</P>
                            <P>业代姓名：{{storeInfor.workerName}}</P>
                            <P>销售路线：{{storeInfor.salesRoute}}</P>
                        </div> 
                    </Col>
                    <Col span="12" offset="1">
                        <div class="showVideoPlay">
                            <video  :src="storeInfor.thisRadioUrl"  controls></video> 
                            <img class="triangle" src="../assets/image/triangle-this.jpg" >                                                                                        
                        </div>                                
                        <div class="goodsInfor">
                            <P>上传周期：{{storeInfor.startTime | formatYear}}至{{storeInfor.endTime | formatYear}}</P>
                            <P class="overflow" :title="storeInfor.storeName">门店名称：{{storeInfor.storeName  }}</P>
                            <P>业代手机：{{storeInfor.workerPhone}}</P>
                            <P>坐标预警：<span  :class="{ 'colorError': storeInfor.riskStatus == '异常'}">{{storeInfor.riskStatus}}</span> </P>
                        </div> 
                    </Col>
                </Row> 
                <div class="lookDetail">
                    <Button type="warning" class="btnDetail" @click="handleLookDetail(storeInfor.id,storeInfor.joinCode)">查看详情</Button>                                          
                </div>
            </div>             
        </Card>
</template>

<script>
import { formatDate,formatYear } from '@/filters/filters.js'; //搜索条件默认时间
    export default {
        props:{  
            // storeInforData:Object,
            storeInforData:{
                type:Object,
                default:function(){
                    return {}
                }
            },
            loongBizType:{
                type:String,
                default:'non'
            }
        },
        data(){
            return {
                storeInfor:{
                    uploadTime:'',
                    joinCode:'',
                    workerName:'',
                    salesRoute:'',

                    startTime:'',
                    endTime:'',
                    storeName:'',
                    workerPhone:'',
                    riskStatus:'',
                }
            }
        },
        watch:{
            storeInforData(val){                               
                if (val) {
                    this.storeInfor = val;
                }
            }
        },
        methods: {
            handleLookDetail(id,joinCode){
                let queryParams = { 
                    joinCode:joinCode,                                                                                                                                    
                    id:id,                                                                                                                                                        
                } 
                if(this.loongBizType != 'non') {
                    queryParams['loongBizType'] = this.loongBizType;
                }                                                                                                                                 
                this.$router.push({ path:'/examineDetail',query:queryParams})
            }
        },
        created(){  
            
            if (this.storeInforData) {
                this.storeInfor = this.storeInforData;
            }                       
        },
        filters:{            
            formatDate(time) {
                var date = new Date(time);
                return formatDate(date, "yyyy-MM-dd hh:mm:ss");
            },
            formatYear(time){                
                return formatYear(time)
            }                  
        }
    }
</script>
<style lang="less" scoped>
@import "../../config/index.less";
.box {
  width: 100%;
  margin: 0 auto 15px;
  padding-bottom: 0;
  background: #fff;
}

.time {
  float: left;
  padding: 0px 10px;
  border: 1px solid @primary-color;
  margin-right: 10px;
  cursor: pointer;
}
.form {
  position: relative;
  display: flex;
  //   justify-content: center;
  align-items: center;
  .container {
    width: 90%;

    .w18 {
      width: 20%;
    }
  }
  .w10 {
    position: absolute;
    top: 0;
    right: 0;
  }
}
.contentTop {
  overflow: hidden;
  margin-bottom: 10px;
  .export {
    height: 24px;
    float: right;
    div {
      background: @primary-color;
      color: #fff;
      padding: 3px 12px;
      border-bottom: 0;
      cursor: pointer;
      i {
        margin-right: 2px;
      }
    }
  }
  .upDate {
    float: right;
    border: 1px solid #aeaeae;
    padding: 2px 12px;
    margin-right: 10px;
    margin-top: 4px;
    color: #333;
  }
  .demo {
    float: right;
    color: @primary-color;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    margin-right: 20px;
    span {
      text-decoration: underline;
    }
  }
}

.searchBox {
  overflow: hidden;
  .search_btn {
    float: left;
    width: 50px;
    padding: 5px 14px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .search_icon {
    float: left;
    padding: 5px 10px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
.demo {
  color: @primary-color;
  margin-left: 20px;
  cursor: pointer;
}
.sitem {
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
}
.switch {
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  .left,
  .right {
    //   border: 1px solid #e5e5e5;
    width: 40%;
    text-align: center;
    cursor: pointer;
    color: white;
    background-color: #999;
  }
  .active {
    background-color: @primary-color;
  }
}

.title {
  line-height: 30px;
  h3 {
    font-size: 18px;
  }
}
.starBox {
  display: flex;
  flex-direction: row;
  img {
    width: 20px;
    height: 20px;
    margin-top: 4px;
    margin-left: 4px;
  }
}
.main-container {
  padding-bottom: 10px !important;
  position: relative;
}
.scoreBox {
  width: 100%;
  height: calc(~"100% -50px");
  position: absolute;
  top: 60px;
  left: 10px;
  right: 10px;
  bottom: 0;
  #scoreImage {
    width: 100%;
    height: 100%;
    min-height: 500px;
  }
}
</style>

<template>
	<div id="Main">
		<!-- <h2 class="Title">陈列活动分值配置</h2> -->
        <div class="main-container">
            <div class="box" style="height:50px;">
                <Form ref="form" class="form" :model="formData" :label-width="10">
                    <div class="container">
                        
                        <div class="btn-left w18">
                            <Form-item required>
                                <DatePicker style="display:block;" v-model="formData.queryStartTime" type="date" placeholder="开始时间"></DatePicker>
                            </Form-item>
                        </div>
                        <div class="btn-left w18">
                            <Form-item required>
                                <DatePicker style="display:block;" v-model="formData.queryEndTime" type="date" placeholder="结束时间"></DatePicker>
                            </Form-item>
                        </div>
                        <div class="btn-left w18">
                            <Form-item required>
                                <Select v-model="formData.app"  placeholder="请选择应用" clearable>
                                    <Option :value="item.id" v-for="(item,index) in appList" :key="index">{{ item.name }}</Option>
                                </Select> 
                            </Form-item>
                        </div>
                        <div class="btn-left w18">
                            <Form-item required>
                                <Select v-model="formData.app"  placeholder="请选择API" clearable>
                                    <Option :value="item.id" v-for="(item,index) in apiList" :key="index">{{ item.name }}</Option>
                                </Select> 
                            </Form-item>
                        </div>
                        <div class="btn-left w18">
                            <Form-item required>
                                <RadioGroup v-model="formData.succ">
                                    <Radio label="调用成功"></Radio>
                                    <Radio label="调用失败"></Radio>
                                </RadioGroup>
                            </Form-item>
                        </div>
                    </div>
                    <div class="btn-right w10">
                        <div class="searchBox">
                            <div class="btn-right search-right" @click="submit('form')">
                                <Button shape="circle" icon="ios-search" type="primary">搜索</Button>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
            <div class="box scoreBox" style="padding:10px">
                
                <div id="scoreImage"></div>
            </div>
        </div>
	</div>
</template>

<script>
import config from "@/util/config.js";
import fieldNameDes from "@/components/field-name-description.vue";
import dataRange from "@/components/data-rang.vue";
import exportBtn from "@/components/Button/export-btn.vue";
import addNewBtn from "@/components/Button/addNew-btn.vue";
// import {
//   thirtyAgoDate,
//   sevenAgoDate,
//   toadyDate,
//
// } from "@/util/index.js";
import echarts from "echarts";
export default {
  name: "customer-service-audit-self-week",
  components: {
    dataRange,
    exportBtn,
    fieldNameDes
  },
  data() {
    return {
      appList: [],
      apiList: [],
      userId: "",
      formData: {
        flag: true,
        queryStartTime: "",
        queryEndTime: ""
      },
      scoreImage: null
    };
  },
  created() {
    this.getUserId();
    this.init();
  },
  watch: {},
  mounted() {
    this.scoreImage = echarts.init(document.getElementById("scoreImage"));
    this.scoreInit();
  },
  methods: {
    getUserId() {
      var user = sessionStorage.getItem("user");
      if (user) {
        const userData = JSON.parse(user);
        this.userId = userData.userId;
      } else {
        this.userId = "";
      }
    },
    submit(name) {
      this.init();
    },
    scoreInit(xAxisData = [], totalData = [0, 0, 0, 0, 0, 0, 0]) {
      let scoreImageOption = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: xAxisData
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "调用量",
            type: "line",
            label: {
              normal: {
                show: true,
                position: "top",
                formatter: function(params) {
                  if (params.value > 0) {
                    return params.value;
                  } else {
                    return "";
                  }
                }
              }
            },
            areaStyle: { normal: {} },
            data: totalData
          }
        ]
      };
      this.scoreImage.setOption(scoreImageOption, true);
    },
    init() {
      let data = {};
      data["queryStartTime"] = this.Global.createTime(
        this.formData.queryStartTime
      );
      data["queryEndTime"] = this.Global.createTime(this.formData.queryEndTime);
      this.Global.deleteEmptyProperty(data);
      data["userId"] = this.userId;
      //分值查看
      this.Global.doPost(
        "auditIntegral/queryAuditIntegralOneselfByIntegral.json",
        data,
        res => {
          let xAxisData = [];
          let yAxisData = [];
          if (res && res.length) {
            res.forEach(item => {
              xAxisData.push(item.stringCountTime);
              yAxisData.push(item.integralCount ? item.integralCount : 0);
            });
          }
          this.scoreInit(xAxisData, yAxisData);
        }
      );
    }
  }
};
</script>
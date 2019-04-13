<style lang="less" scoped>
@import "../../config/index.less";
#Main {
  height: 100%;
}
.main-container {
  min-height: 100%;
  position: relative;
  background: #ffffff;
  padding-bottom: 60px;
  .page-box {
    overflow: hidden;
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
}
.contentTop {
  height: 40px;
  line-height: 40px;
  margin-bottom: 0;
}
.ivu-table-row {
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1) !important;
  transform: translateY(0px);
}
.table-box {
  padding: 0 10px;
  min-height: 500px;
  // padding-bottom: 60px;
  position: relative;
  .numColor {
    color: @primary-color;
  }
}

//搜索条件 时间控件
.ivu-date-picker {
  display: block;
}
//搜索条件 radio按钮
.ivu-radio-wrapper {
  margin-right: 30px;
}
.searchBox {
  overflow: hidden;
  .search-left,
  .search-right {
    width: 50%;
  }
  .search-left {
    button {
      outline: none;
      border: none;
      width: 60px;
      height: 30px;
      line-height: 30px;
      background: #ffffff;
      margin-left: 10px;
      cursor: pointer;
      color: @primary-color;
    }
  }
  .search-right {
    img {
      cursor: pointer;
      margin-left: 10px;
    }
  }
}
.myModal {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  .modal-main {
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
    height: 100%;
    h3 {
      text-align: center;
      font-size: 14px;
    }
    .modal-table {
      max-height: 500px;
      overflow-y: auto;
      margin-top: 10px;
      .modal-table-top {
        overflow: hidden;
        height: 30px;
        line-height: 30px;
        .numColor {
          color: @primary-color;
        }
      }
    }
  }
}
.upDate {
  float: left;
  border: 1px solid #aeaeae;
  border-radius: 4px;
  padding: 2px 12px;
  margin-right: 10px;
  color: #333;
  cursor: pointer;
  // text-overflow: ellipsis
  // white-space: nowrap;
}
.demo {
  float: left;
  margin-left: 10px;
  color: @primary-color;
  line-height: 24px;
  cursor: pointer;
  margin-right: 20px;
  span {
    text-decoration: underline;
  }
}
.maintain-footer {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}
</style>
<template>
  <div id="Main">
    <!-- <h2 class="Title">标注数据统计</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" :model="formData" :label-width="10">
          <div class="container">
            <div class="btn-left w18">
              <Form-item prop="startTime" required>
                <DatePicker
                  type="date"
                  v-model="formData.startTime"
                  placeholder="开始时间"
                  style="display:block"
                ></DatePicker>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item prop="endTime" required>
                <DatePicker
                  type="date"
                  v-model="formData.endTime"
                  placeholder="结束时间"
                  style="display:block"
                ></DatePicker>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item required prop="companyId">
                <Select
                  v-model="formData.companyId"
                  placeholder="公司"
                  @on-change="changeValue"
                  clearable
                >
                  <Option
                    :value="item.id"
                    v-for="(item,index) in companyList"
                    :key="index"
                  >{{ item.name }}</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item required>
                <Select v-model="formData.dataId" placeholder="数据集" clearable>
                  <Option
                    :value="item.id"
                    :key="index"
                    v-for="(item,index) in datasetList"
                  >{{item.name}}</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item required>
                <Select v-model="formData.userId" placeholder="人员" clearable>
                  <Option
                    :value="item.userId"
                    v-for="(item,index) in peopleList"
                    :key="index"
                  >{{ item.userName }}</Option>
                </Select>
              </Form-item>
            </div>

            <div class="btn-left w10">
              <div class="searchBox">
                <div class="btn-right search-right" @click="submit('search')">
                  <Button shape="circle" icon="ios-search" type="primary">搜索</Button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </div>
      <div class="table-box box">
        <div class="contentTop">
          <span class="btn-left">
            共查询到
            <span class="numColor">{{pageNum}}</span> 条记录
          </span>
        </div>
        <hhTable ref="table" :columns="columns1" :pageData="pageData" :noneStatus="noneStatus"></hhTable>
      </div>
      <div class="page-box">
        <div style="float: right;">
          <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dataRange from "@/components/data-rang.vue";
import hhTable from "@/components/table/table.vue";
import { TODAY_END, TODAY_START } from "@/util/index.js";
export default {
  name: "audit-data-summary-keepAlive",
  data() {
    return {
      noneStatus: false,
      datasetList: [],
      columns1: [
        {
          title: "序号",
          type: "index",
          width: 70,
          align: "center"
        },
        {
          title: "名称",
          key: "userName",
          align: "center",
          tooltip: true,
          render: (h, parmas) => {
            let str =
              this.formData.companyId == 0
                ? parmas.row.companyName
                : parmas.row.userName;
            return h("div", str);
          }
        },
        {
          title: "审核图片数",
          key: "picNum",
          align: "center",
          tooltip: true,
          width: 150
        },
        {
          title: "审核框数",
          key: "tagNum",
          align: "center",
          tooltip: true
        },
        {
          title: "通过图片数",
          key: "picSuccessNum",
          align: "center",
          tooltip: true
        },
        {
          title: "退回图片数",
          key: "picCheckNum",
          align: "center",
          tooltip: true
        }
      ],
      start: {
        time: "",
        hour: ""
      },
      end: {
        time: TODAY_END,
        hour: "24:00"
      },
      page: 1,
      pageSize: 10,
      peopleList: [],
      formData: {
        startTime: TODAY_START,
        endTime: TODAY_END,
        brandId: "",
        groupId: "",
        activityId: "",
        userId: ""
      },
      page: 1,
      pageNum: 0,
      pageData: [],
      companyList: [],
      activityList: []
    };
  },
  components: {
    dataRange,
    hhTable
  },
  created() {
    this.queryAllCompanylist();
  },
  watch: {},
  methods: {
    queryAllCompanylist() {
      this.Global.doPost("company/doQueryAll.json", { status: 1 }, res => {
        this.companyList = res;
        res.unshift({
          id: "0",
          name: "全部公司"
        });
        if (res && res.length) {
          this.formData.companyId = res[0].id;
          this.changeValue(res[0].id);
        }
      });
    },
    submit(type) {
      if (!this.formData.startTime) {
        this.$Message.error("请开始时间");
        return false;
      }

      if (!this.formData.endTime) {
        this.$Message.error("请结束时间");
        return false;
      }
      if (!this.formData.companyId) {
        this.$Message.error("公司不能为空");
        return false;
      }
      this.page = 1;
      this.init();
    },
    changePage(size) {
      this.page = size;
      this.init(size, 10);
    },
    init(currentPage, pageSize) {
      var data = this.Global.JsonChange(this.formData);
      data["startTime"] = new Date(this.formData.startTime).pattern(
        "yyyy-MM-dd"
      );
      data["endTime"] = new Date(this.formData.endTime).pattern("yyyy-MM-dd");
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      data["type"] = 2;
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost("labelStatistics/doQueryReport.json", data, res => {
        this.pageData = res.datalist;
        this.pageNum = res.items;
        this.page = res.page;

        this.noneStatus = true;
      });
    },

    changeValue(val) {
      if (!val) return;
      //全部公司
      if (val == "0") {
        this.datasetList = [];
        this.formData.dataId = "";
        this.peopleList = [];
        this.formData.userId = "";
      } else {
        //根据公司查询数据集

        let data = { companyId: val, status: 1 };
        this.Global.doPost(
          "dataUser/doQueryDataSetByCompanyId.json",
          data,
          res => {
            this.datasetList = res;
            if (res && res.length) {
              this.formData.dataId = res[0].id;
              this.queryLabelList(this.formData.dataId);
            }
          }
        );
        //根据公司查询员工
        this.Global.doPost("user/doQueryUserByCompanyId.json", data, res => {
          this.peopleList = res;
        });
      }
    }
  }
};
</script>
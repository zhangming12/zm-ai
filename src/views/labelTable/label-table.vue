<style lang="less" scoped>
@import "../../config/index.less";
#Main {
  height: 100%;
}
.main-container {
  position: relative;
  min-height: 100%;
  background: #ffffff;
  padding-bottom: 60px;
  .page-box {
    overflow: hidden;
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
}
.ivu-table-row {
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1) !important;
  transform: translateY(0px);
}
.table-box {
  padding: 0 10px;
  margin-top: 20px;
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
    width: 48%;
  }
  .search-left {
    button {
      outline: none;
      border: none;
      width: 60px;
      height: 30px;
      line-height: 30px;
      background: #ffffff;
      margin-left: 8px;
      cursor: pointer;
      color: @primary-color;
    }
  }
  .search-right {
    width: 52%;
    img {
      cursor: pointer;
      margin-left: 6px;
    }
  }
}
.form {
  position: relative;
  display: flex;
  // justify-content: center;
  .container {
    width: 87.5%;
    .w18 {
      width: 20%;
    }
    .w36 {
      width: 40%;
    }
  }
  .w10 {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
<template>
  <div id="Main">
    <!-- <h2 class="Title">标注看板</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" class="form" :model="formData" :label-width="10">
          <div class="container">
            <div class="btn-left w36">
              <Form-item required>
                <DatePicker
                  type="daterange"
                  v-model="formData.queryTime"
                  split-panels
                  placeholder="时间"
                  style="display:block;"
                ></DatePicker>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item required>
                <Input placeholder="账号" v-model.trim="formData.account" clearable></Input>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item required>
                <Input placeholder="手机号" v-model.trim="formData.phone" clearable></Input>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item required>
                <Select v-model="formData.type" placeholder="*操作类型" clearable>
                  <Option value="1">标注</Option>
                  <Option value="2">审核</Option>
                </Select>
              </Form-item>
            </div>
          </div>
          <div class="btn-left w10">
            <div class="searchBox">
              <div class="btn-right search-right" @click="submit('form')">
                <Button shape="circle" icon="ios-search" type="primary">搜索</Button>
              </div>
            </div>
          </div>
        </Form>
      </div>
      <div class="table-box box">
        <div class="contentTop">
          <span class="btn-left">
            此表共包含
            <span class="numColor">{{ pageNum }}</span>条数据
          </span>
          <exportBtn class="btn-right" @btnClick="exportExcel"/>
        </div>
        <hhTable :columns="columns1" :pageData="pageData" :noneStatus="noneStatus" disabled-hover></hhTable>
      </div>
      <div class="page-box">
        <div style="float: right;">
          <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
        </div>
      </div>
      <fieldNameDes/>
    </div>
  </div>
</template>

<script>
import hhTable from "@/components/table/table.vue";
import exportBtn from "@/components/Button/export-btn.vue";
import fieldNameDes from "@/components/field-name-description.vue";
export default {
  name: "label-table",
  data() {
    return {
      formData: {
        queryTime: [],
        type: "1"
      },
      page: 1,
      pageNum: 0,
      pageSize: 10,
      noneStatus: false,
      columns1: [
        {
          title: "用户名",
          key: "userName",
          width: 160,
          align: "center",
          tooltip: true
        },
        {
          title: "时间",
          key: "datatime",
          minWidth: 140,
          align: "center",
          tooltip: true
          // render: (h, parmas) => {
          //   if (parmas.row.startTime)
          //     return h("div", this.Global.createTime(parmas.row.startTime));
          //   return "";
          // }
        },
        {
          title: "图片数",
          key: "picNum",
          width: 160,
          align: "center",
          tooltip: true
        },
        {
          title: "框数",
          key: "tagNum",
          width: 160,
          align: "center",
          tooltip: true
        },
        {
          title: "绩效级别",
          key: "level",
          minWidth: 140,
          align: "center",
          tooltip: true
        }
      ],
      pageData: []
    };
  },
  components: {
    hhTable,
    fieldNameDes,
    exportBtn
  },
  created() {
    this.init();
  },
  watch: {},
  methods: {
    exportExcel() {
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      delete data["queryTime"];
      if (this.formData.queryTime[0]) {
        data["startTime"] = this.Global.createTime(
          this.formData.queryTime[0]
        ).replace(" 00:00:00", "");
        data["endTime"] = this.Global.createTime(
          this.formData.queryTime[1]
        ).replace(" 00:00:00", "");
      }
      var url = this.Global.getExportUrl(
        "labelStatistics/doPerformanceReportExport.json",
        data
      );
      window.open(url);
    },
    submit(name) {
      if (this.formData.phone) {
        if (!this.Global.checkPhone(this.formData.phone)) {
          this.$Message.info("请输入正确的手机号");
          return false;
        }
      }
      if (!this.formData.type) {
        this.$Message.info("请选择操作类型");
        return false;
      }
      this.page = 1;
      this.init(this.page, 10);
    },
    changePage(size) {
      this.page = size;
      this.init(size, 10);
    },
    init() {
      var data = this.Global.JsonChange(this.formData);
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      this.Global.deleteEmptyProperty(data);
      delete data["queryTime"];
      if (this.formData.queryTime[0]) {
        data["startTime"] = this.Global.createTime(
          this.formData.queryTime[0]
        ).replace(" 00:00:00", "");
        data["endTime"] = this.Global.createTime(
          this.formData.queryTime[1]
        ).replace(" 00:00:00", "");
      }
      this.Global.doPost(
        "labelStatistics/doPerformanceReport.json",
        data,
        res => {
          this.pageNum = res.items;
          this.pageData = res.datalist;
          this.page = res.page;
          this.noneStatus = true;
        }
      );
    }
  }
};
</script>
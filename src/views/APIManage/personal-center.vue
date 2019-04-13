
<style lang="less" scoped>
@import "../../config/index.less";
.box {
  width: 100%;
  margin: 10px auto 15px;
  padding-bottom: 0;
  background: #fff;
  .item {
    padding-left: 25px;
  }
  h3 {
    position: relative;
    padding-left: 20px;
    margin-bottom: 10px;
    height: 24px;
    line-height: 24px;
    &::before {
      position: absolute;
      display: block;
      content: "";
      top: 2px;
      left: 10px;
      width: 3px;
      height: 20px;
      background-color: @primary-color;
    }
  }
  .table-box {
    padding: 10px;
    padding-top: 0;
  }
}
</style>

<template>
	<div id="Main">
		<!-- <h2 class="Title">个人中心</h2> -->
        <div class="main-container">
            <div class="box">
                <h3>个人信息</h3>
                <Row>
                    <Col span="6">
                        <div class="item">
                            企业组织:{{ companyName }}
                        </div>
                    </Col>
                    <Col span="6">
                        <div class="item">
                            姓名: {{ name }}
                        </div>
                    </Col>
                    <Col span="6">
                        <div class="item">
                            账号:{{ loginAccount }}
                        </div>
                    </Col>
                    <Col span="6">
                        <div class="item">
                            手机号: {{ phone }}
                        </div>
                    </Col>
                    <!-- <Col span="5">
                        <div class="item">
                            登陆时间:
                        </div>
                    </Col> -->
                </Row>
            </div>
            <div class="box">
                <h3>接口鉴权</h3>
                <div class="table-box">
                    <Table ref="table1" :columns="columns1" :data="pageData1" :noneStatus="noneStatus" disabled-hover></Table>
                </div>
            </div>
            <div class="box">
                <h3>应用</h3>
                <div class="table-box">
                    <Table ref="table2" :height="pageData2.length > 6 ? 400 : ''" :columns="columns2" :data="pageData2" :noneStatus="noneStatus" disabled-hover></Table>
                </div>
            </div>
            <div class="box">
                <h3>用量</h3>
                <div class="table-box">
                    <Table ref="table3" :columns="columns3" :pageData="pageData3" :noneStatus="noneStatus" disabled-hover></Table>
                </div>
            </div>
           
            <fieldNameDes/>
        </div>
	</div>
</template>

<script>
import fieldNameDes from "@/components/field-name-description.vue";
import hhTable from "@/components/table/table.vue";
import { labelStatus } from "@/util/ENUMS.js";
export default {
  name: "personal-center",
  components: {
    hhTable,
    fieldNameDes
  },
  data() {
    return {
      companyName: "",
      phone: "",
      name: "",
      addShow: false, //新建/修改莫太快
      addData: {},
      type: "", //add--新建  modify--修改
      noneStatus: false,
      formData: {
        brandId: "",
        labelName: ""
      },
      brandList: [],
      page: 1,
      pageSize: 10,
      pageNum: 0,
      columns1: [
        {
          title: "序号",
          type: "index",
          width: 80
        },
        {
          title: "用户ID",
          key: "userId",
          align: "center",
          tooltip: true
        },
        {
          title: "API_key",
          key: "apiKey",
          align: "center",
          tooltip: true,
          render: (h, params) => {
            let tag = [];
            tag.push(
              h("Button", {
                style: {
                  fontSize: "24px",
                  border: "none",
                  padding: "0 4px",
                  display: params.row.apiKey ? "none" : "inline"
                },
                attrs: {
                  icon: "ios-eye-outline",
                  type: "default"
                },
                on: {
                  click: () => {
                    this.Global.doPost(
                      "personal/doGetApiKey.json",
                      params.row.userId,
                      res => {
                        this.$set(params.row, "apiKey", res);
                      }
                    );
                  }
                }
              })
            );
            tag.push(
              h(
                "span",
                {
                  style: {
                    display: params.row.apiKey ? "inline" : "none"
                  }
                },
                params.row.apiKey
              )
            );
            return h(
              "div",
              {
                style: {
                  display: "flex",
                  "flex-direction": "row",
                  "justify-content": "center",
                  "align-items": "center"
                }
              },
              tag
            );
          }
        },
        {
          title: "创建时间",
          key: "createTime",
          align: "center",
          tooltip: true,
          render: (h, params) => {
            let str = "";
            if (params.row.createTime)
              str = this.Global.createTime(params.row.createTime);
            return h("div", str);
          }
        },
        {
          title: "操作",
          width: 150,
          align: "center",
          render: (h, params) => {
            let tag = [
              h(
                "Tooltip",
                {
                  attrs: {
                    content: "重置",
                    theme: "light"
                  }
                },
                [
                  h("Button", {
                    style: {
                      fontSize: "24px",
                      border: "none",
                      padding: "0 4px"
                    },
                    attrs: {
                      icon: "ios-refresh-circle-outline",
                      type: "default"
                    },
                    on: {
                      click: () => {
                        this.Global.doPost(
                          "personal/doResetApiKey.json",
                          params.row.userId,
                          res => {
                            this.queryTableData();
                          }
                        );
                      }
                    }
                  })
                ]
              )
            ];
            return h(
              "div",
              {
                style: {
                  display: "flex",
                  "flex-direction": "row",
                  "justify-content": "center",
                  "align-items": "center"
                }
              },
              tag
            );
          }
        }
      ],
      columns2: [
        {
          title: "序号",
          type: "index",
          width: 80
        },
        {
          title: "接口名称",
          key: "name",
          align: "center",
          tooltip: true
        },
        {
          title: "接口地址",
          key: "service",
          align: "center",
          tooltip: true
        },
        {
          title: "创建时间",
          key: "createTime",
          align: "center",
          tooltip: true,
          render: (h, params) => {
            let str = "";
            if (params.row.createTime)
              str = this.Global.createTime(params.row.createTime);
            return h("div", str);
          }
        }
      ],
      columns3: [
        {
          title: "序号",
          type: "index",
          width: 80
        },
        {
          title: "API",
          key: "labelNo",
          align: "center",
          tooltip: true
        },
        {
          title: "调用量",
          key: "labelNo",
          align: "center",
          tooltip: true
        },
        {
          title: "调用失败",
          key: "labelNo",
          align: "center",
          tooltip: true
        },
        {
          title: "失败率",
          key: "labelNo",
          align: "center",
          tooltip: true
        },
        {
          title: "详细统计",
          key: "apiKey",
          align: "center",
          tooltip: true,
          render: (h, params) => {
            let tag = [];
            tag.push(
              h("Button", {
                style: {
                  fontSize: "24px",
                  border: "none",
                  padding: "0 4px",
                  display: params.row.apiKey ? "none" : "inline"
                },
                attrs: {
                  icon: "ios-eye-outline",
                  type: "default"
                },
                on: {
                  click: () => {
                    this.Global.doPost(
                      "personal/doGetApiKey.json",
                      params.row.userId,
                      res => {
                        this.$set(params.row, "apiKey", res);
                      }
                    );
                  }
                }
              })
            );
            tag.push(
              h(
                "span",
                {
                  style: {
                    display: params.row.apiKey ? "inline" : "none"
                  }
                },
                params.row.apiKey
              )
            );
            return h(
              "div",
              {
                style: {
                  display: "flex",
                  "flex-direction": "row",
                  "justify-content": "center",
                  "align-items": "center"
                }
              },
              tag
            );
          }
        }
      ],
      pageData1: [],
      pageData2: [],
      pageData3: [],
      productList: [],
      loginAccount: "",
      userId: "",
      allLabelList: [] //所有的标签列表
    };
  },
  created() {
    if (Object.keys(this.$route.query).length) {
      this.userId = this.$route.query.userId;
      this.queryTableData(this.userId);
    } else {
      this.queryTableData();
    }
  },
  watch: {
    addShow(val) {
      if (!val) {
        this.addData = {};
      }
    }
  },
  methods: {
    queryProductList(val) {
      this.Global.doPost(
        "brandCategory/doQueryAll.json",
        { brandId: val },
        res => {
          this.productList = res;
        }
      );
    },
    //查看
    lookPicture(row) {
      let { labelName } = row;
      this.$router.push({
        path: "/imageLook",
        query: { labelName }
      });
    },
    queryTableData(userId) {
      this.pageData1 = [];
      //   2003190200
      let api = "";
      if (userId) {
        api = "merchant/doGet.json";
      } else {
        api = "personal/doGet.json";
      }
      userId = userId ? userId : "";
      this.Global.doPost(api, userId, res => {
        this.pageData2 = res.apiServiceVOS;
        this.pageData1.push({
          userId: res.userId,
          //   apiKey: res.apiKey,
          createTime: res.createTime
        });
        this.name = res.name;
        this.loginAccount = res.loginAccount;
        this.companyName = res.companyName;
        this.phone = res.phone;
      });
    }
  }
};
</script>
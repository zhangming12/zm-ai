
<style lang="less" scoped>
@import "../../config/index.less";
.box {
  width: 100%;
  margin: 0 auto 15px;
  padding-bottom: 0;
  background: #fff;
}

.form {
  position: relative;
  display: flex;
  // justify-content: center;
  align-items: center;
  .container {
    width: 52.5%;

    .w18 {
      width: 33.33333%;
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
.myModal {
  position: absolute;
  width: 100%;

  height: 100%;
  top: 0;
  left: 0;
  .modal-main {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    .header {
      background-color: #e5e5e5;
      height: 40px;
      line-height: 40px;
      font-size: 18px;
      font-weight: bold;
      color: #666;
      padding-left: 20px;
    }
    .modal-table {
      max-height: 500px;
      margin-top: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .model-form {
        width: 400px;
        margin-left: 100px;
      }
    }
    .footer {
      text-align: right;
      padding: 10px 20px 10px 0;
    }
  }
}
</style>

<template>
	<div id="Main">
		<!-- <h2 class="Title">模型列表</h2> -->
        <div class="main-container">
            <div class="box">
                <Form ref="form" class="form" :model="formData" :label-width="10">
                    <div class="container">
                        <div class="btn-left w18">
                            <Form-item prop="brandId">
                                <Input placeholder="请输入模型名称" v-model="formData.name" clearable></Input>
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
            <div class="box" style="padding:10px">
                <div class="contentTop">
                    <span class="btn-left">此表共包含<span class='numColor'>{{pageNum}}</span>条数据</span>
                    <!-- <exportBtn  class="btn-right" @btnClick="exportExcel" /> -->
                    <addNewBtn  class="btn-right" title="新建" @btnClick="showModel" />
                </div>
                <hhTable ref="table" :columns="columns" :pageData="pageData" :noneStatus="noneStatus" disabled-hover></hhTable>
            
            </div>
            <div class="page-box">
                <div>
                    <Page :total="pageNum" :current="1" @on-change="changePage"></Page>
                </div>
            </div>
           
            <fieldNameDes/>
        </div>
        <myModal class="myModal"
                    @close="closeModel"
                    width='600'
                    :modal="addShow">
                    <div slot="main" class="modal-main">
                      <div class="header">
                          {{ type == 'add' ? '新建' : '修改'}}
                      </div>
                      <div class="modal-table">
                          <Form ref="form" class="model-form" :label-width="88">
                              <Form-item label="模型ID:" required>
                                  <Input clearable v-model.trim="addData.model" placeholder="限英文且20个字符以内"></Input>
                              </Form-item>
                              <Form-item label="模型名称:" required>
                                  <Input clearable v-model.trim="addData.name" placeholder="限英文且20个字符以内"></Input>
                              </Form-item>
                              <Form-item label="接口地址:" required>
                                  <Input clearable v-model.trim="addData.url" placeholder="限英文且20个字符以内"></Input>
                              </Form-item>
                              <Form-item label="阀值:" required>
                                  <Input clearable v-model.number="addData.threshold" placeholder="限英文且20个字符以内"></Input>
                              </Form-item>
                              <Form-item label="调用量:" required>
                                  <Input clearable v-model.trim="addData.speed" placeholder="限20个字符以内"></Input>
                              </Form-item>
                              <Form-item label="备注信息:">
                                  <Input clearable v-model.trim="addData.memo" placeholder="限英255个字符以内"></Input>
                              </Form-item>
                              
                          </Form>
                      </div>
                      <div class="footer">
                          <Button @click="save" type="primary">保存</Button>
                      </div>
                    </div>
        </myModal>
	</div>
</template>

<script>
import myModal from "@/components/Modal/my-modal.vue";
import fieldNameDes from "@/components/field-name-description.vue";
import hhTable from "@/components/table/table.vue";
import exportBtn from "@/components/Button/export-btn.vue";
import addNewBtn from "@/components/Button/addNew-btn.vue";
import { labelStatus } from "@/util/ENUMS.js";
export default {
  name: "model-list",
  components: {
    exportBtn,
    hhTable,
    myModal,
    fieldNameDes,
    addNewBtn
  },
  data() {
    return {
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
      columns: [
        {
          title: "序号",
          type: "index"
        },
        {
          title: "模型ID",
          key: "model",
          align: "center",
          tooltip: true,
          width: 100
        },
        {
          title: "模型名称",
          key: "name",
          align: "center",
          tooltip: true,
          width: 120
        },
        {
          title: "接口地址",
          key: "url",
          align: "center",
          tooltip: true,
          width: 150
        },
         {
          title: "阀值",
          key: "threshold",
          align: "center",
          tooltip: true,
          width: 150
        },
        {
          title: "调用量",
          key: "speed",
          align: "center",
          tooltip: true,
          width: 150
        },
        {
          title: "备注",
          key: "memo",
          align: "center",
          tooltip: true
        },
        {
          title: "状态",
          key: "status",
          align: "center",
          tooltip: true,
          render: (h, params) => {
            return h("div", "正常");
          }
        },
        {
          title: "操作",
          width: 100,
          align: "center",
          render: (h, params) => {
            let tag = [
              h(
                "Tooltip",
                {
                  attrs: {
                    content: "修改",
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
                      icon: "ios-create-outline",
                      type: "default"
                    },
                    on: {
                      click: () => {
                        this.type = "modify";
                        this.addData.model = params.row.model;
                        this.addData.name = params.row.name;
                        this.addData.memo = params.row.memo;
                        this.addData.speed = params.row.speed;
                        this.addData.threshold = params.row.threshold;
                        this.addData.url = params.row.url;
                        this.addData.id = params.row.id;
                       
                        this.addShow = true;
                      }
                    }
                  })
                ]
              ),
              h(
                "Tooltip",
                {
                  attrs: {
                    content: "删除",
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
                      icon:
                        params.row.status == 1
                          ? "ios-close-circle-outline"
                          : "ios-checkmark-circle-outline",
                      type: "default"
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: "警告",
                          content: `确定删除该标签？`,
                          onOk: () => {
                            let data = {
                              id: params.row.id,
                              status: params.row.status == 1 ? 0 : 1
                            };
                            this.Global.doPost(
                              "apiModel/doDelete.json",
                              params.row.id,
                              res => {
                                this.$Message.success("删除成功");
                                this.init();
                              }
                            );
                          }
                        });
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
      pageData: [],
      productList: [],
      allLabelList: [] //所有的标签列表
    };
  },
  created() {
    this.init();
  },
  watch: {
    addShow(val) {
      if (!val) {
        this.addData = {};
      }
    }
  },
  methods: {
    save() {
      if (!this.addData.model) {
        this.$Message.info("请输入模型ID");
        return false;
      }
      if (!this.addData.name) {
        this.$Message.info("请输入模型名称");
        return false;
      }
      if (!this.addData.url) {
        this.$Message.info("请输入接口地址");
        return false;
      }
    //   if (!this.addData.threshold) {
    //     this.$Message.info("请输入阀值");
    //     return false;
    //   }
    //   if (this.addData.articleName.length > 50) {
    //     this.$Message.info("物体名称的长度在五十个字符以内");
    //     return false;
    //   }
    //   if (this.addData.memo) {
    //     if (this.addData.memo.length > 255) {
    //       this.$Message.info("备注的长度在255个字符以内");
    //       return false;
    //     }
    //   }
      let data = this.Global.JsonChange(this.addData);
      this.Global.deleteEmptyProperty(data);
      let api = "";
      if (this.type == "modify") {
        data["id"] = this.addData.id;
        api = "apiModel/doUpdate.json";
      } else {
        api = "apiModel/doSave.json";
      }
      this.Global.doPost(api, data, res => {
        this.$Message.success("保存成功");
        this.addShow = false;
        this.init();
      });
    },
    isChineseChar(str) {
      let reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
      return reg.test(str);
    },
    showModel() {
      this.type = "add";
      this.addShow = true;
    },
    closeModel() {
      this.addShow = false;
    },
    submit(name) {
      this.page = 1;
      this.init();
    },
    changePage(size) {
      this.page = size;
      this.init();
    },
    init() {
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      data["status"] = 1;
      this.Global.doPost("apiModel/doQueryWithPage.json", data, res => {
        this.pageData = res.datalist;
        this.pageNum = res.items;
        this.page = res.page;
        this.noneStatus = true;
      });
    },
    exportExcel() {
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      var url = this.Global.getExportUrl("label/doLabelExport.json", data);
      window.open(url);
    }
  }
};
</script>
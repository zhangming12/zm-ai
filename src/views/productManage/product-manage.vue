
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
    // padding: 10px;
    width: 100%;
    height: 100%;

    .modal-table {
      max-height: 500px;
      //   margin-top: 10px;
      .modal-table-top {
        overflow: hidden;
        height: 30px;
        line-height: 30px;
      }
    }
  }
  .modal-main {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    h3 {
      text-align: center;
      font-size: 14px;
    }
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
.upDate {
  cursor: pointer;
  text-align: center;
  border: 1px solid #aeaeae;
  padding: 2px 12px;
  margin-right: 10px;
  width: 150px;
}
</style>

<template>
	<div id="Main">
		<!-- <h2 class="Title">标签管理</h2> -->
        <div class="main-container">
            <div class="box">
                <Form ref="form" class="form" :model="formData" :label-width="10">
                    <div class="container">
                        <div class="btn-left w18">
                            <Form-item prop="brandId">
                                <Input placeholder="请输入类别名称" v-model="formData.name" clearable></Input>
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

                    <!-- <importBtn  class="btn-right" @btnClick="showImportBrand = true" /> -->
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
                              
                              <Form-item label="类别编号:" required>
                                  <Input clearable v-model.trim="addData.code" placeholder="限20个字符以内"></Input>
                              </Form-item>
                              <Form-item label="类别名称:" required>
                                  <Input clearable v-model.trim="addData.name" placeholder="限20个字符以内"></Input>
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

        <!--品牌导入 -->
      <myModal class="myModal"
            @close="closeModal"
            :modal="showImportBrand">
            <div slot="main" class="modal-main">
              <h3 style="margin-top:10px;">品牌导入</h3>
              <div class="modal-table" style="padding:10px;">
                  <Form ref="form" :label-width="88">
                      <div style="overflow:hidden;">
                          <div class='upDate'>
                              <Upload :action="importUrl" 
                              :show-upload-list=false
                              :on-success='handleSuccess'
                              :on-error='handleError'
                              >
                              <Icon type="ios-folder" size='14' color='#53a3f4'></Icon>
                              <span>{{ importBrandData.uploadText }}</span>
                              </Upload>
                          </div>
                      </div>
                      <div class="fotter" style="text-align:center;">
                          <Button @click="closeModal" type="primary">取消</Button>
                          <Button @click="importExcel" type="success">导入</Button>
                      </div>
                  </Form>
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
import importBtn from "@/components/Button/import-btn.vue";
import addNewBtn from "@/components/Button/addNew-btn.vue";

import config from "@/util/config.js";
import { labelStatus } from "@/util/ENUMS.js";
export default {
  name: "label-management",
  components: {
    exportBtn,
    importBtn,
    hhTable,
    myModal,
    fieldNameDes,
    addNewBtn
  },
  data() {
    return {
      importUrl: config.uploadFile,
      //导入内部员工
      showImportBrand: false,
      importBrandData: {
        loadFilePath: "",
        uploadText: "请选择上传文件"
      },
      addShow: false, //新建/修改莫太快
      addData: {},
      type: "", //add--新建  modify--修改
      noneStatus: false,
      formData: {
        brandId: "",
        labelName: ""
      },
      page: 1,
      pageSize: 10,
      pageNum: 0,
      columns: [
        {
          title: "序号",
          type: "index"
        },
        {
          title: "类别编号",
          key: "code",
          align: "center",
          tooltip: true
        },
        {
          title: "类别名称",
          key: "name",
          align: "center",
          tooltip: true
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
            return h("div", labelStatus[params.row.status]);
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
                        this.addShow = true;
                        // this.addData.labelName = params.row.labelName;
                        this.addData.name = params.row.name;
                        this.addData.code = params.row.code;
                        this.addData.memo = params.row.memo;
                        this.addData.id = params.row.id;
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
                              id: params.row.id
                              //   status: params.row.status == 1 ? 0 : 1
                            };
                            this.Global.doPost(
                              "categoryType/doDelete.json",
                              //   data,
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
      } else {
        this.queryProductList();
      }
    },
    showImportBrand(val) {
      if (!val) {
        this.importBrandData.uploadText = "请选择上传文件";
        this.importBrandData.loadFilePath = "";
      }
    }
  },
  methods: {
    handleError() {},
    handleSuccess(response, file, fileList) {
      this.importBrandData.uploadText = file.name;
      var url = response.data;
      if (url) {
        this.importBrandData.loadFilePath = url;
      }
    },
    importExcel() {
      if (!this.importBrandData.loadFilePath) {
        this.$Message.info("请选择上传文件");
        return false;
      }
      this.Global.doPost(
        "brand/brandInfoImport.json",
        {
          loadFilePath: this.importBrandData.loadFilePath
        },
        res => {
          this.$Message.success("导入成功");
          this.showImportBrand = false;
        }
      );
    },
    closeModal() {
      this.showImportBrand = false;
    },
    queryProductList() {
      if (!this.productList.length) {
        this.Global.doPost("", {}, res => {
          this.productList = res;
        });
      }
    },
    //查看
    lookPicture(row) {
      let { labelName } = row;
      this.$router.push({
        path: "/imageLook",
        query: { labelName }
      });
    },
    save() {
      if (!this.addData.code) {
        this.$Message.info("类别编号不能为空");
        return false;
      }
      if (!this.addData.name) {
        this.$Message.info("类别名称不能为空");
        return false;
      }
      if (this.addData.name.length > 20) {
        this.$Message.info("类别名称的长度在二十个字符以内");
        return false;
      }
      if (this.addData.code.length > 20) {
        this.$Message.info("类别编号的长度在二十个字符以内");
        return false;
      }
      let data = this.Global.JsonChange(this.addData);
      this.Global.deleteEmptyProperty(data);
      let api = "";
      if (this.type == "modify") {
        data["id"] = this.addData.id;
        api = "categoryType/doUpdate.json";
      } else {
        api = "categoryType/doSave.json";
      }
      this.Global.doPost(api, data, res => {
        this.$Message.success("保存成功");
        this.addShow = false;
        this.init();
      });
    },
    // 查询全部标签
    queryAllLabel() {
      let data = {};
      this.Global.doPost("label/doQueryAll.json", data, res => {
        this.allLabelList = res;
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
      this.Global.doPost("categoryType/doQueryWithPage.json", data, res => {
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
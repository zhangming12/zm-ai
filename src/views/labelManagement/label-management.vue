
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
		<!-- <h2 class="Title">标签管理</h2> -->
        <div class="main-container">
            <div class="box">
                <Form ref="form" class="form" :model="formData" :label-width="10">
                    <div class="container">
                        <!-- <div class="btn-left w18">
                            <Form-item prop="labelName">
                                <Input placeholder="请输入标签名称" v-model="formData.labelName" clearable></Input>
                            </Form-item>
                        </div> -->
                        <div class="btn-left w18">
                            <Form-item prop="brandId">
                                <Input placeholder="请输入物体名称" v-model="formData.articleName" clearable></Input>
                            </Form-item>
                        </div>
                        <div class="btn-left w18">
                            <Form-item prop="brandId">
                                <Select v-model="formData.brandId" placeholder="请选择品牌归属" clearable>
                                    <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.name }}</Option>
                                </Select>
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
                    <exportBtn  class="btn-right" @btnClick="exportExcel" />
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
                              <Form-item label="品牌归属:" v-if="type == 'add'" required>
                                  <Select @on-change="queryProductList" v-model="addData.brandId" placeholder="请选择品牌归属" clearable>
                                      <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.name }}</Option>
                                  </Select>
                              </Form-item>
                              <Form-item label="产品类别:" required>
                                  <Select v-model="addData.categoryTypeId" placeholder="请选择产品类别" clearable>
                                      <Option :value="item.categoryTypeId" v-for="(item,index) in productList" :key="index">{{ item.categoryTypeName }}</Option>
                                  </Select>
                              </Form-item>
                              <!-- <Form-item label="标签名称:" required>
                                  <Input clearable v-model.trim="addData.labelName" placeholder="限英文且50个字符以内"></Input>
                              </Form-item> -->
                              <Form-item label="物体名称:" required>
                                  <Input clearable v-model.trim="addData.articleName" placeholder="限50个字符以内"></Input>
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
  name: "label-management",
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
          title: "标签ID",
          key: "labelNo",
          align: "center",
          tooltip: true,
          width: 100
        },
        {
          title: "标签名称",
          key: "labelName",
          align: "center",
          tooltip: true,
          width: 150
        },
        {
          title: "物体名称",
          key: "articleName",
          align: "center",
          tooltip: true,
          width: 150
        },
        {
          title: "品牌归属",
          key: "brandName",
          align: "center",
          tooltip: true,
          width: 150
        },
        {
          title: "标注图片数",
          key: "num",
          align: "center",
          tooltip: true,
          render: (h, params) => {
            let tag = [];
            tag.push(
              h(
                "Tooltip",
                {
                  attrs: {
                    content: "查看",
                    theme: "light"
                  },
                  style: {
                    display:
                      params.row.imageNum != 0 && !params.row.imageNum
                        ? "inline"
                        : "none"
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
                      icon: "ios-eye-outline",
                      type: "default"
                    },
                    on: {
                      click: () => {
                        let data = {
                          id: params.row.id
                        };
                        this.Global.doPost(
                          "label/doPicCountForLabel.json",
                          data,
                          res => {
                            console.log(res);
                            this.$set(params.row, "imageNum", res);
                          }
                        );
                      }
                    }
                  })
                ]
              )
            );
            tag.push(
              h(
                "span",
                {
                  style: {
                    display:
                      params.row.imageNum == 0 || params.row.imageNum
                        ? "inline"
                        : "none"
                  }
                },
                params.row.imageNum
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
          title: "产品类别",
          key: "categoryTypeName",
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
                    content: "查看",
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
                      icon: "ios-search-outline",
                      type: "default"
                    },
                    on: {
                      click: () => {
                        this.lookPicture(params.row);
                      }
                    }
                  })
                ]
              ),
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
                        this.addData.articleName = params.row.articleName;
                        this.addData.categoryTypeId = params.row.categoryTypeId;
                        this.addData.memo = params.row.memo;
                        this.addData.id = params.row.id;
                        this.queryProductList(
                          params.row.brandId,
                          params.row.categoryTypeId
                        );
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
                    content: params.row.status == 1 ? "弃用" : "正常",
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
                          content: `确定${
                            params.row.status == 1 ? "弃用" : "正常"
                          }该标签？`,
                          onOk: () => {
                            let data = {
                              id: params.row.id,
                              status: params.row.status == 1 ? 0 : 1
                            };
                            this.Global.doPost(
                              "label/doDelete.json",
                              params.row.id,
                              res => {
                                this.$Message.success("操作成功");
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
    this.Global.doPost("brand/doQueryAll.json", { status: 1 }, res => {
      if (res && res.length) {
        this.brandList = res;
      }
    });
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
    save() {
      if (this.type == "add" && !this.addData.brandId) {
        this.$Message.info("请选择品牌归属");
        return false;
      }
      if (!this.addData.categoryTypeId) {
        this.$Message.info("请选择产品类别");
        return false;
      }
      if (!this.addData.articleName) {
        this.$Message.info("请填写物体名称");
        return false;
      }
      if (this.addData.articleName.length > 50) {
        this.$Message.info("物体名称的长度在五十个字符以内");
        return false;
      }
      if (this.addData.memo) {
        if (this.addData.memo.length > 255) {
          this.$Message.info("备注的长度在255个字符以内");
          return false;
        }
      }
      let data = this.Global.JsonChange(this.addData);
      this.Global.deleteEmptyProperty(data);
      let api = "";
      if (this.type == "modify") {
        data["id"] = this.addData.id;
        api = "label/doUpdate.json";
      } else {
        api = "label/doSave.json";
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
      this.Global.doPost("label/doQueryWithPage.json", data, res => {
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
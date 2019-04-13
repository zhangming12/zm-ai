
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
      width: 33.3333%;
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
      .select-box {
        width: 90%;
        margin-left: 5%;

        .header-title {
          border-bottom: 2px solid #e5e5e5;
          font-size: 14px;
          line-height: 24px;
        }
        .select-main {
          width: 100%;
          max-height: 300px;
          overflow-y: auto;
          .s-item {
            line-height: 30px;
          }
        }
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
    <!-- <h2 class="Title">类别管理</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" class="form" :model="formData" :label-width="10">
          <div class="container">
            <div class="btn-left w18">
              <Form-item prop="name">
                <Input placeholder="类别名称" v-model="formData.categoryTypeName"></Input>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item prop="phone">
                <Input placeholder="类别编号" v-model="formData.categoryTypeCode"></Input>
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
          <span class="btn-left">
            此表共包含
            <span class="numColor">{{pageNum}}</span>条数据
          </span>
          <addNewBtn class="btn-right" title="添加类别" @btnClick="showModel"/>
        </div>
        <hhTable
          ref="table"
          :columns="columns"
          :pageData="pageData"
          :noneStatus="noneStatus"
          disabled-hover
        ></hhTable>
      </div>
      <div class="page-box">
        <div>
          <Page :total="pageNum" :current="1" @on-change="changePage"></Page>
        </div>
      </div>

      <fieldNameDes/>
    </div>
    <!-- 添加类别 -->
    <myModal class="myModal" @close="addShow = false" width="740" :modal="addShow">
      <div slot="main" class="modal-main">
        <div class="header">添加类别</div>
        <div class="modal-table">
          <div class="boxs">
            <Form
              ref="form"
              class="form"
              style="justify-content: space-between;"
              :model="formData"
              :label-width="10"
            >
              <div class="container" style="width:85%;">
                <div class="btn-left w18" style="width:45%;">
                  <Form-item prop="labelName">
                    <Input placeholder="类别名称" v-model="addData.name" clearable></Input>
                  </Form-item>
                </div>
                <div class="btn-left w18" style="width:45%;">
                  <Form-item prop="articleName">
                    <Input placeholder="类别编号" v-model="addData.code" clearable></Input>
                  </Form-item>
                </div>
              </div>
              <div class="btn-right w10" style="margin-right:10px;">
                <div class="searchBox">
                  <div class="btn-right search-right" @click="filterCate('form')">
                    <Button
                      shape="circle"
                      icon="ios-search"
                      type="primary"
                    >搜索</Button>
                  </div>
                </div>
              </div>
            </Form>
          </div>
          <div class="select-box">
            <div class="header-title">
              <Row>
                <Col span="10" offset="4">编号</Col>
                <Col span="10">名称</Col>
              </Row>
            </div>
            <div class="select-main">
              <CheckboxGroup v-model="selectedCategory">
                <template v-if="filterCategoryList.length">
                  <div class="s-item" v-for="item in filterCategoryList" :key="item.id">
                    <Row>
                      <Col span="4">
                        <Checkbox :label="item.id">{{ str }}</Checkbox>
                      </Col>
                      <Col span="10">{{ item.code }}</Col>
                      <Col span="10">{{ item.name }}</Col>
                    </Row>
                  </div>
                </template>
              </CheckboxGroup>
            </div>
          </div>
        </div>
        <div class="footer" style="margin-top:10px;">
          <Button @click="saveCategory" type="primary" style="padding:2px 20px;">确定</Button>
          <Button @click="addShow = false;" type="info" style="padding:2px 20px;">取消</Button>
        </div>
      </div>
    </myModal>
  </div>
</template>

<script>
import myModal from "@/components/Modal/my-modal.vue";
import fieldNameDes from "@/components/field-name-description.vue";
import hhTable from "@/components/table/table.vue";
import addNewBtn from "@/components/Button/addNew-btn.vue";
export default {
  name: "category-management",

  components: {
    hhTable,
    myModal,
    fieldNameDes,
    addNewBtn
  },
  data() {
    return {
      str: "",
      selectedCategory: [], //已选的类别
      allCategoryList: [],
      filterCategoryList: [],
      addData: {
        roles: []
      },
      addShow: false, //新建/修改莫太快
      type: "", //add--新建  modify--修改
      noneStatus: false,
      formData: {
        brandId: "",
        labelName: ""
      },
      page: 1,
      pageNum: 0,
      columns: [
        {
          title: "序号",
          type: "index",
          width: 100
        },
        {
          title: "类别名称",
          key: "categoryTypeName",
          align: "center",
          tooltip: true
        },
        {
          title: "类别编号",
          key: "categoryTypeCode",
          align: "center",
          tooltip: true
        },
        {
          title: "删除",
          width: 120,
          align: "center",
          render: (h, params) => {
            let tag = [
              h("Button", {
                style: {
                  fontSize: "24px",
                  border: "none",
                  padding: "0 4px"
                },
                attrs: {
                  icon: "ios-trash-outline",
                  type: "default"
                },
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      title: "警告",
                      content: "确定删除该类别？",
                      onOk: () => {
                        let data = {
                          categoryTypeId: params.row.categoryTypeId,
                          brandId: params.row.brandId
                        };
                        this.Global.doPost(
                          "brandCategory/doDelete.json",
                          data,
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
      pageSize: 10,
      brandId: ""
    };
  },
  created() {
    let query = this.$route.query;
    if (Object.keys(query).length) {
      let { brandId } = query;
      this.brandId = brandId;
      this.init();
    }
  },
  watch: {
    addShow(val) {
      if (!val) {
        this.addData = {};
        this.selectedCategory = [];
      } else {
        this.queryAllCategory();
      }
    }
  },
  methods: {
    filterCate() {
      let arr1 = [],
        arr2 = [];
      if (this.addData.name) {
        this.allCategoryList.forEach(item => {
          if (item.name.indexOf(this.addData.name) != -1) {
            arr1.push(item);
          }
        });
      } else {
        arr1 = [...this.allCategoryList];
      }
      if (this.addData.code) {
        arr1.forEach(item => {
          if (item.code.indexOf(this.addData.code) != -1) {
            arr2.push(item);
          }
        });
      } else {
        arr2 = [...arr1];
      }
      this.filterCategoryList = [...arr2];
    },
    //查询所有的类别
    queryAllCategory() {
      this.Global.doPost(
        "categoryType/doQueryAllNotReleteBrand.json",
        {  brandId: this.brandId },
        res => {
          this.allCategoryList = res;
          this.filterCategoryList = [...res];
        }
      );
    },
    saveCategory() {
      let data = {
        brandId: this.brandId
      };
      data["categoryTypeIds"] = [...this.selectedCategory];
      this.Global.doPost("brandCategory/doSave.json", data, res => {
        this.$Message.success("操作成功");
        this.addShow = false;
        this.init();
      });
    },
    showModel() {
      this.type = "add";
      this.addShow = true;
    },
    save() {
      if (!this.addData.userName) {
        this.$Message.info("姓名不能为空");
        return false;
      }
      if (!this.addData.loginAccount) {
        this.$Message.info("账户不能为空");
        return false;
      }
      if (!this.addData.phone) {
        this.$Message.info("手机号不能为空");
        return false;
      }
      if (!this.Global.checkPhone(this.addData.phone)) {
        this.$Message.info("请输入正确的手机号");
        return false;
      }
      if (this.type == "add" && !this.addData.loginPwd) {
        this.$Message.info("初始密码不能为空");
        return false;
      }
      if (!this.addData.roles.length) {
        this.$Message.info("角色不能为空");
        return false;
      }
      let data = this.Global.JsonChange(this.addData);
      if (this.type != "add") {
        data["userId"] = this.addData.userId;
      }
      data["roles"] = this.addData.roles;
      let api = "";
      if (this.type == "add") {
        data["loginPwd"] = this.Global.Md5(this.addData.loginPwd);
        api = "user/doRegister.json";
      } else {
        delete data["loginPwd"];
        api = "user/doUserUpdate.json";
      }

      this.Global.doPost(api, data, res => {
        this.$Message.success(this.type == "add" ? "新建成功" : "修改成功");
        this.addShow = false;
        this.init();
      });
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
    //筛选类别
    filterCategory() {},
    init() {
      var data = this.Global.JsonChange(this.formData);
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      data["brandId"] = this.brandId;
      // data["status"] = 1;
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost(
        "brandCategory/doQueryCategoryWithPageForBrand.json",
        data,
        res => {
          this.pageData = res.datalist;
          this.pageNum = res.items;
          this.page = res.page;
          this.noneStatus = true;
        }
      );
    }
  }
};
</script>
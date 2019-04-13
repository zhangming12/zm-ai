
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
      .model-form {
        width: 400px;
        margin-left: 100px;
        .item-box {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          .left {
            width: 70px;
            span {
              color: red;
              font-size: 14px;
            }
          }
          .right {
            flex: 1;
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
    <!-- <h2 class="Title">人员维护</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" class="form" :model="formData" :label-width="10">
          <div class="container">
            <div class="btn-left w18">
              <Form-item prop="name">
                <Input placeholder="请输入姓名" v-model="formData.userName"></Input>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item prop="phone">
                <Input placeholder="请输入手机号" v-model="formData.phone"></Input>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item prop="phone">
                <!-- <Input placeholder="所属企业" v-model="formData.phone"></Input> -->
                <Select v-model="formData.companyId" placeholder="所属企业" clearable>
                  <Option
                    :value="item.id"
                    v-for="(item,index) in companyList"
                    :key="index"
                  >{{ item.name }}</Option>
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
          <span class="btn-left">此表共包含
            <span class="numColor">{{pageNum}}</span>条数据
          </span>
          <addNewBtn class="btn-right" title="新建" @btnClick="showModel"/>
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
    <myModal class="myModal" @close="closeModel" width="600" :modal="addShow">
      <div slot="main" class="modal-main">
        <div class="header">{{ type == 'add' ? '新建' : '修改'}}</div>
        <div class="modal-table">
          <Form ref="form" class="model-form" :label-width="10">
            <!-- <Form-item>
              <div class="item-box">
                <div class="left">
                  <span>*</span>企业组织:
                </div>
                <div class="right">
                  <Select v-model="addData.companyId" placeholder="所属企业" clearable>
                    <Option
                      :value="item.id"
                      v-for="(item,index) in companyList"
                      :key="index"
                    >{{ item.name }}</Option>
                  </Select>
                </div>
              </div>
            </Form-item> -->
            <Form-item>
              <div class="item-box">
                <div class="left">
                  <span>*</span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:
                </div>
                <div class="right">
                  <Input v-model.trim="addData.userName" placeholder="请输入姓名" clearable></Input>
                </div>
              </div>
            </Form-item>
            <Form-item>
              <div class="item-box">
                <div class="left">
                  <span>*</span>账&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号:
                </div>
                <div class="right">
                  <Input
                    :disabled="type == 'modify'"
                    v-model.trim="addData.loginAccount"
                    placeholder="请输入账户"
                  ></Input>
                </div>
              </div>
            </Form-item>
            <Form-item label>
              <div class="item-box">
                <div class="left">
                  <span>*</span>手机号码:
                </div>
                <div class="right">
                  <Input v-model.trim="addData.phone" placeholder="请输入手机号码" autocomplete="off" clearable></Input>
                </div>
              </div>
            </Form-item>
            <Form-item v-if="type == 'add'">
              <div class="item-box">
                <div class="left">
                  <span>*</span>初始密码:
                </div>
                <div class="right">
                  <Input
                    type="password"
                    v-model.trim="addData.loginPwd"
                    placeholder="支持英文数字符号且20个字符以内"
                    clearable
                    autocomplete="off"
                  ></Input>
                </div>
              </div>
            </Form-item>
            <Form-item>
              <div class="item-box">
                <div class="left">
                  <span>*</span>角&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色:
                </div>
                <div class="right">
                  <!-- <Input v-model.trim="addData.role" placeholder="限英20个字符以内" clearable></Input> -->
                  <Select multiple v-model="addData.roles" placeholder="请选择角色" clearable>
                    <Option
                      :value="item.id"
                      v-for="(item,index) in roleList"
                      :key="index"
                    >{{ item.name }}</Option>
                  </Select>
                </div>
              </div>
            </Form-item>
          </Form>
        </div>
        <div class="footer">
          <Button @click.native="save" type="primary" style="padding:4px 20px;">保存</Button>
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
export default {
  name: "out-personnel-maintenance",

  components: {
    exportBtn,
    hhTable,
    myModal,
    fieldNameDes,
    addNewBtn
  },
  data() {
    return {
      addData: {
        roles: []
      },
      roleList: [],
      addShow: false, //新建/修改莫太快
      type: "", //add--新建  modify--修改
      noneStatus: false,
      formData: {
        brandId: "",
        labelName: ""
      },
      companyList: [],
      page: 1,
      pageNum: 0,
      columns: [
        {
          title: "序号",
          type: "index"
        },
        {
          title: "所属企业",
          key: "companyName",
          align: "center",
          tooltip: true
        },
        {
          title: "姓名",
          key: "userName",
          align: "center",
          tooltip: true
        },
        {
          title: "账号",
          key: "loginAccount",
          align: "center",
          tooltip: true
        },
        {
          title: "手机号",
          key: "phone",
          align: "center",
          tooltip: true
        },
        {
          title: "角色",
          key: "role",
          align: "center",
          tooltip: true
        },

        {
          title: "操作",
          width: 120,
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
                        let role = [];
                        if (params.row.roleList && params.row.roleList.length) {
                          params.row.roleList.forEach(item => {
                            role.push(item.id);
                          });
                        }
                        this.addData.roles = role;
                        this.addData.phone = params.row.phone;
                        this.addData.userId = params.row.userId;
                        this.addData.userName = params.row.userName;
                        this.addData.loginAccount = params.row.loginAccount;
                        this.addData.companyId = params.row.companyId;
                        this.type = "modify";
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
                      icon: "ios-trash-outline",
                      type: "default"
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: "警告",
                          content: "确定删除该人员？",
                          onOk: () => {
                            let data = {
                              userId: params.row.userId,
                              status: 3
                            };
                            this.Global.doPost(
                              "user/doDelectUser.json",
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
      pageSize: 10
    };
  },
  created() {
    this.queryAllCompanyList();
    this.queryRoleList();
    this.init();
  },
  watch: {
    addShow(val) {
      if (!val) {
        this.addData = {
          roles: []
        };
      }
    }
  },
  methods: {
    //查询所有的公司
    queryAllCompanyList() {
      this.Global.doPost("company/doQueryAll.json", {}, res => {
        this.companyList = res;
      });
    },
    showModel() {
      this.type = "add";
      this.addShow = true;
    },
    save() {
    //   if (!this.addData.companyId) {
    //     this.$Message.info("企业组织不能为空");
    //     return false;
    //   }
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
        api = "outUser/doRegister.json";
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
    queryRoleList() {
      this.Global.doPost(
        "outRole/doQueryAll.json",
        {
          status: 1
        },
        res => {
          this.roleList = res;
        }
      );
    },
    init() {
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      this.Global.doPost("outUser/doQueryWithPage.json", data, res => {
        this.pageData = res.datalist;
        if (res.datalist && res.datalist.length) {
          res.datalist.forEach(item => {
            let role = [];
            if (item.roleList && item.roleList.length) {
              item.roleList.forEach(val => {
                role.push(val.name);
              });
            }
            item.role = role.join();
          });
        }
        this.pageNum = res.items;
        this.page = res.page;
        this.noneStatus = true;
      });
    }
  }
};
</script>
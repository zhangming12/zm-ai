<style lang="less" scoped>
@import "../../config/index.less";

.box {
  width: 100%;
  // box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  margin: 0 auto 15px;
  padding: 30px 20px 0;
  background: #fff;
}

.ivu-radio-wrapper {
  margin-right: 30px;
}
.buttonBox {
  padding: 10px 0;
  h4 {
    margin-left: 30px;
    font-weight: normal;
    margin-bottom: 20px;
  }
  .selectBox {
    width: 94%;
    margin-left: 3%;
    height: 400px;
    padding: 10px 0;
    border: 1px solid #e5e5e5;
    .left,
    .right {
      float: left;
      width: 48%;
      height: 100%;
      margin-left: 2%;
      overflow-y: auto;
    }
    .left {
      border-right: 1px solid;
    }
  }
}
.roleBox {
  overflow: hidden;
  width: 100%;
  height: auto;
  .roleBoxLeft,
  .roleBoxRight {
    float: left;
    width: 48%;
    margin-left: 2%;
    box-sizing: border-box;
  }
  .roleBoxLeft {
    border-right: 1px solid #e5e5e5;
  }
}
.btn {
  text-align: center;
  margin: 15px;
  .btnSearch {
    margin: 5px;
  }
}
</style>

<template>
  <div id="Main">
    <!-- <h2 class="Title">新建角色</h2> -->
    <div class="main-container">
      <div class="box">
        <Form :model="formData" :label-width="88" :rules="rules">
          <Row>
            <Col span="6">
              <Form-item label="角色名称" prop="name" required>
                <Input v-model.trim="formData.name" placeholder="请输入角色名称"/>
              </Form-item>
            </Col>
            <Col span="6">
              <Form-item label="角色说明" prop="description">
                <Input v-model.trim="formData.description" placeholder="请输入角色说明"/>
              </Form-item>
            </Col>
            <Col span="6">
              <Form-item label=" " :label-width="30">
                <Checkbox v-model="formData.isDataSetPower">操作数据集权限</Checkbox>
              </Form-item>
            </Col>
          </Row>
        </Form>
      </div>
      <div class="box buttonBox">
        <Form :label-width="88" ref="form" :rules="rules">
          <Row>
            <Col span="24">
              <h4>菜单选择:</h4>
              <div class="selectBox">
                <div class="left">
                  <Tree
                    @on-check-change="checkChange"
                    ref="fatherTree"
                    :data="baseData"
                    show-checkbox
                  ></Tree>
                </div>
                <div class="right">
                  <Tree :data="checkedData" ref="tree"></Tree>
                </div>
              </div>
            </Col>
          </Row>
        </Form>
        <div class="btn">
          <Button @click="cancel" class="btnSearch" type="info">取消</Button>
          <Button @click="submit('form')" class="btnSearch" type="success">保存</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "create-new-role",
  data() {
    return {
      rules: {
        // brandId: [{ required: true, message: "品牌不能为空", trigger: "blur" }]
      },
      baseData: [],
      type: "", //类型 add 新建  modify 修改
      formData: {
        isDataSetPower: false,
        roleName: "",
        description: ""
      },
      checkedData: [],
      showUnlock: false,
      i: 0
    };
  },
  created() {
    let implode = (arr, parentId, level) => {
      let newArr = [];
      if (arr.length === 0) {
        return newArr;
      }
      arr.forEach(item => {
        if (item.parentId === parentId) {
          item = {
            title: item.name,
            id: item.id,
            level,
            orderIndex: item.sort
          };
          item.children = implode(arr, item.id, level + 1);
          newArr.push(item);
        }
      });

      return newArr;
    };
    this.Global.doPost("menu/doQueryAll.json", { status: 1 }, res => {
      this.baseData = [];
      let arr = implode(res, 0, 1);
      arr.sort((a, b) => a.orderIndex - b.orderIndex);
      arr.forEach(item => {
        if (item.children && item.children.length) {
          item.children.sort((a, b) => a.orderIndex - b.orderIndex);
        }
      });
      this.baseData = arr;
      if (this.$route.query.type === "edit") {
        this.Global.doPost(
          "role/doGet.json",
          parseInt(this.$route.query.id, 10),
          res => {
            this.formData.name = res.name;
            this.formData.description = res.description;
            this.formData.isDataSetPower =
              res.isDataSetPower == 1 ? true : false;
            // 为选中的菜单添加 checked = true;
            let checkedArr = [];
            res.menuVOList.forEach(item => {
              let level = null;
              if (item.target == "menu") {
                level = 1;
              }
              if (item.target == "page") {
                level = 2;
              }
              checkedArr.push({
                children: [],
                checked: true,
                level,
                title: item.name,
                id: item.id
              });
              this.baseData.forEach((j, index) => {
                if (j.children && j.children.length) {
                  j.children.forEach((val, num) => {
                    if (item.id == val.id) {
                      this.$set(
                        this.baseData[index].children[num],
                        "checked",
                        true
                      );
                    }
                  });
                }
              });
            });
            // 过滤选中菜单显示
            this.checkedData = implode(res.menuVOList, 0, 1);
          }
        );
      }
    });
  },
  watch: {
    showUnlock(val) {
      if (!val) {
      }
    }
  },
  methods: {
    checkChange(val) {
      let arr = []; //选中的
      val.forEach(item => {
        if (item.level == 1) {
          //选中的是一级
          this.baseData.forEach(val => {
            if (val.id == item.id) {
              arr.push({
                title: val.title,
                level: 1,
                children: [],
                expand: true
              });
            }
          });
        }
        if (item.level == 2) {
          //选中的是二级
          this.baseData.forEach(val => {
            if (val.children && val.children.length) {
              val.children.forEach(j => {
                if (item.id == j.id) {
                  if (arr.length) {
                    let flag = null;
                    //有一级的情况
                    arr.forEach(k => {
                      if (k.title == val.title) {
                        flag = k;
                      }
                    });
                    if (flag) {
                      flag.children.push({
                        expand: true,
                        level: 2,
                        title: item.title,
                        children: []
                      });
                    } else {
                      arr.push({
                        title: val.title,
                        level: 1,
                        expand: true,
                        children: [
                          {
                            expand: true,
                            level: 2,
                            title: item.title,
                            children: []
                          }
                        ]
                      });
                    }
                    //没有一级的情况
                  } else {
                    arr.push({
                      title: val.title,
                      level: 1,
                      expand: true,
                      children: [
                        {
                          expand: true,
                          level: 2,
                          title: item.title,
                          children: []
                        }
                      ]
                    });
                  }
                }
              });
            }
          });
        }
        if (item.level == 3) {
          //选中的是三级
          this.baseData.forEach(val => {
            if (val.children && val.children.length) {
              val.children.forEach(j => {
                if (j.children && j.children.length) {
                  j.children.forEach(n => {
                    if (item.id == n.id) {
                      //arr为空时
                      if (arr.length == 0) {
                        arr.push({
                          title: val.title,
                          expand: true,
                          level: 1,
                          children: [
                            {
                              expand: true,
                              level: 2,
                              title: j.title,
                              children: [
                                {
                                  expand: true,
                                  level: 3,
                                  title: item.title,
                                  children: []
                                }
                              ]
                            }
                          ]
                        });
                      } else {
                        let flag1 = null;

                        arr.forEach(a => {
                          if (a.title == val.title) {
                            flag1 = a;
                          }
                        });

                        if (flag1) {
                          let flag2 = null;
                          //有包含他的一级
                          flag1.children.forEach(b => {
                            if (b.title == j.title) {
                              flag2 = b;
                            }
                          });
                          if (flag2) {
                            //有包含他的二级
                            flag2.children.push({
                              title: item.title,
                              children: [],
                              level: 3,
                              expand: true
                            });
                          } else {
                            //没有包含她的二级
                            flag1.children.push({
                              title: j.title,
                              expand: true,
                              level: 2,
                              children: [
                                {
                                  title: item.title,
                                  children: [],
                                  level: 3,
                                  expand: true
                                }
                              ]
                            });
                          }
                        } else {
                          //没有包含它的一级
                          arr.push({
                            title: val.title,
                            expand: true,
                            level: 1,
                            children: [
                              {
                                expand: true,
                                level: 2,
                                title: j.title,
                                children: [
                                  {
                                    expand: true,
                                    level: 3,
                                    title: item.title,
                                    children: []
                                  }
                                ]
                              }
                            ]
                          });
                        }
                      }
                    }
                  });
                }
              });
            }
          });
        }
      });
      this.checkedData = arr;
    },
    cancel() {
      this.$router.back();
    },
    createNewAccount() {
      this.type = "add";
      this.showUnlock = true;
    },
    submit(name) {
      if (!this.formData.name) {
        this.$Message.error("请输入角色名称");
        return false;
      }
      if (this.checkedData.length < 1) {
        this.$Message.error("请选择角色菜单");
        return false;
      }
      this.init();
    },
    init() {
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      let datas = this.$refs["fatherTree"].getCheckedNodes();
      let idList = [];
      datas.forEach(item => {
        idList.push(item.id);
        if (item.level == 2) {
          this.baseData.forEach(val => {
            if (val.children && val.children.length) {
              val.children.forEach(a => {
                if (a.id == item.id) {
                  idList.push(val.id);
                }
              });
            }
          });
        }
        if (item.level == 3) {
          this.baseData.forEach(val => {
            if (val.children && val.children.length) {
              val.children.forEach(a => {
                if (a.children && a.children.length) {
                  a.children.forEach(b => {
                    if (b.id == item.id) {
                      idList.push(val.id);
                      idList.push(a.id);
                    }
                  });
                }
              });
            }
          });
        }
      });
      idList = this.arrRemoval(idList);
      data["isDataSetPower"] = this.formData.isDataSetPower ? 1 : 0;
      if (this.$route.query.type === "edit") {
        data["menus"] = idList;
        data["id"] = this.$route.query.id;
      } else {
        data["menus"] = idList;
        data["status"] = 1;
      }
      this.Global.doPost("role/doSave.json", data, res => {
        this.$router.back();
      });
    },
    arrRemoval(arr) {
      let obj = {};
      let newArr = [];

      for (let i = 0, len = arr.length; i < len; i++) {
        if (!obj[arr[i]]) {
          obj[arr[i]] = "a";
          newArr.push(arr[i]);
        }
      }
      return newArr;
    },
    roleSureSetting() {}
  }
};
</script>
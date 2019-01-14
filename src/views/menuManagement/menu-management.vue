<style lang="less" scoped>
@import "../../config/index.less";

.box {
  width: 100%;
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
    height: 500px;
    padding: 10px 0;
    border: 1px solid #e5e5e5;
    .left,
    .right {
      // float: left;
      width: 100%;
      height: 100%;
      padding-left: 2%;
    }
    .left {
      // border-right: 1px solid;
      overflow-y: auto;
    }
    .right {
      .btn-box {
        width: 200px;
        border: 1px solid #e5e5e5;
        padding: 10px;
        .block-btn {
          display: block;
          // margin-bottom: 10px;
        }
      }
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
.upload-box {
  img {
    float: left;
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
}
.form {
  .item {
    display: flex;
    .left {
      width: 100px;
    }
    .right {
      flex: 1;
    }
  }
}
</style>
    
    <template>
    <div id="Main">
        <!-- <h2 class="Title">菜单管理</h2> -->
        <div class="main-container">
            <div class="box buttonBox">
                <Form :label-width="88">
                    <Row>
                        <Col span='24'>
                        <h4>菜单管理:</h4>
                        <div class="selectBox">
                            <div class="left">
                                <Tree ref="tree" :data="treeData" :render="renderContent" @on-check-change="save"></Tree>
                            </div>
                        </div>
                        </Col>
                    </Row>
                </Form>
            </div>

        </div>
        <!-- 新建/修改一级菜单 -->
        <Modal v-model="oneMenuShow">
            <h3 slot="header" style="color:#f60;text-align:center">
                {{menuData.type == 'add'?'新建一级菜单':'修改一级菜单'}}
            </h3>
            <Form :model="menuData" :label-width="88">
                <Form-item label='菜单名称:' required>
                    <Input v-model.trim="menuData.resName" placeholder="请输入菜单名称"></Input>
                </Form-item>
                <Form-item label='排序号:' required>
                    <Input v-model.trim="menuData.orderIndex" placeholder="请输入序号"></Input>
                </Form-item>
                <Form-item label='菜单说明:'>
                    <Input v-model.trim="menuData.summary" placeholder="请输入功能说明"></Input>
                </Form-item>
            </Form>
            <div slot="footer" style="text-align:center;">
                <Button type="text" @click="cancel">取消</Button>
                <Button type="text" @click="partitionSave">保存</Button>
            </div>
        </Modal>
        <!-- 新建/修改二级菜单 -->
        <Modal v-model="twoMenuShow">
            <h3 slot="header" style="color:#f60;text-align:center">
                {{menuData.type == 'add'?'新建二级菜单':'修改二级菜单'}}
            </h3>
            <Form :model="menuData" :label-width="100" class="form">
                <Form-item label='菜单名称:' required>
                    <Input v-model.trim="menuData.resName" placeholder="请输入菜单名称"></Input>
                </Form-item>
                <Form-item label='菜单URL:' required>
                    <Input v-model.trim="menuData.resPage" placeholder="请输入菜单URL"></Input>
                </Form-item>
                <Form-item label='排序号:' required>
                    <Input v-model.trim="menuData.orderIndex" placeholder="请输入序号"></Input>
                </Form-item>
                <Form-item label='菜单说明:'>
                    <Input v-model.trim="menuData.summary" placeholder="请输入功能说明"></Input>
                </Form-item>
            </Form>
            <div slot="footer" style="text-align:center;">
                <Button type="text" @click="cancel">取消</Button>
                <Button type="text" @click="twoLevelMenuSure">保存</Button>
            </div>
        </Modal>
    </div>
</template>
    
<script>
export default {
  name: "menu-management-keepAlive",
  data() {
    return {
      treeData: [],
      modularList: [],
      oneLevelMenuList: [],
      buttonProps: {
        type: "text",
        size: "small",
        value: true
      },
      showSettingRole: false,
      type: "", //类型 add 新建  modify 修改
      oneMenuShow: false,
      twoMenuShow: false,
      menuData: {
        type: "", //add modify
        menuName: "",
        summary: "", //功能说明
        orderIndex: null,
        resIcon: "",
        resName: "",
        resPage: ""
      },
      selectData: {
        resType: ""
      }
    };
  },
  watch: {
    oneMenuShow(val) {
      if (!val) {
        this.menuData = {};
      }
    },
    twoMenuShow(val) {
      if (!val) {
        this.menuData = {};
      }
    }
  },
  created() {
    this.getTreeData();
  },
  methods: {
    getTreeData() {
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
              parentId: item.parentId,
              isHidden: parseInt(item.isShow, 10),
              resType: item.target,
              summary: item.memo,
              resIcon: item.resIcon,
              status: item.isShow,
              resPage: item.href,
              level,
              orderIndex: item.sort
            };
            item.children = implode(arr, item.id, level + 1);
            newArr.push(item);
          }
        });

        return newArr;
      };
      this.Global.doPost("menu/doQueryAll.json", {}, res => {
        this.treeData = [];
        let arr = implode(res, 0, 1);
        arr.sort((a, b) => a.orderIndex - b.orderIndex);
        arr.forEach(item => {
          if (item.children && item.children.length) {
            item.children.sort((a, b) => a.orderIndex - b.orderIndex);
          }
        });
        this.treeData = arr;
      });
    },

    renderContent(h, { root, node, data }) {
      return h(
        "span",
        {
          style: {
            display: "inline-block",
            width: "80%"
          }
        },
        [
          h("span", [
            h("Icon", {
              props: {
                type: "ios-paper-outline"
              },
              style: {
                marginRight: "8px"
              }
            }),
            h("span", data.title)
          ]),
          h(
            "span",
            {
              style: {
                display: "inline-block",
                marginLeft: "20px"
              }
            },
            [
              h(
                "Button",
                {
                  props: Object.assign({}, this.buttonProps),
                  style: {
                    marginRight: "8px",
                    display: data.resType == "menu" ? "inline-block" : "none"
                  },
                  on: {
                    click: () => {
                      this.append(data, 2);
                    }
                  }
                },
                "添加子菜单"
              ),
              h(
                "Button",
                {
                  props: Object.assign({}, this.buttonProps),
                  style: {
                    marginRight: "8px",
                    display: data.resType == "menu" ? "inline-block" : "none"
                  },
                  on: {
                    click: () => {
                      this.append(data, 1);
                    }
                  }
                },
                "添加同级菜单"
              ),
              h(
                "Button",
                {
                  props: Object.assign({}, this.buttonProps),
                  // style: {
                  //   display: data.level != 1 ? "inline-block" : "none"
                  // },
                  on: {
                    click: () => {
                      this.changeStatus(data);
                    }
                  }
                },
                data.status == 1 ? "停用" : "启用"
              ),
              h(
                "Button",
                {
                  props: Object.assign({}, this.buttonProps),
                  // style: {
                  //   display: data.level != 1 ? "inline-block" : "none"
                  // },
                  on: {
                    click: () => {
                      this.change(root, node, data);
                    }
                  }
                },
                "修改"
              )
            ]
          )
        ]
      );
    },
    //获取一级菜单List
    getOneLevelMenuList(id) {
      this.oneLevelMenuList = [];
      this.menuData.module = "";
      if (!id) {
        return;
      }
      this.Global.doPost("resource/queryMenuByTemplate.json", id, res => {
        this.oneLevelMenuList = res;
      });
    },
    //获取所属模块
    getBelonedModule(id) {
      let str = null;
      this.treeData.forEach(item => {
        item.children.forEach(val => {
          if (val.id == id) {
            str = item.id;
            return str;
          }
          if (val.children && val.children.length) {
            val.children.forEach(pro => {
              if (pro.id == id) {
                str = item.id;
                return str;
              }
            });
          }
        });
      });
      return str;
    },
    //获取所属一级菜单
    getBelonedOneMenu(id) {
      let str = null;
      this.treeData.forEach(item => {
        item.children.forEach(val => {
          if (val.children && val.children.length) {
            val.children.forEach(pro => {
              if (pro.id == id) {
                str = val.id;
                return str;
              }
            });
          }
        });
      });
      return str;
    },
    append(data, level) {
      if (level == 1) {
        this.oneMenuShow = true;
        this.menuData.menuName = data.id;
      } else {
        // debugger;
        // let parentId = data.id;
        this.menuData.menuName = data.id;
        // if (data.level == 2) {
        //   setTimeout(() => {
        //     this.menuData.module = data.id;
        //     this.$set(this.menuData, "module", data.id);
        //   }, 0);
        // }
        this.twoMenuShow = true;
      }
      this.menuData.level = data.level;
      this.menuData.type = "add";
      this.selectData = data;
    },
    //停用正常
    changeStatus(data) {
      this.Global.doPost(
        "menu/doUpdate.json",
        // { id: data.id, status: data.status == 1 ? 0 : 1 },
        {
          isShow: data.status == 1 ? 0 : 1,
          id: data.id
        },
        res => {
          let str = data.status == 1 ? 0 : 1;
          this.$set(data, "status", str);
        }
      );
    },
    // 修改
    change(root, node, data) {
      let parentId = this.getBelonedModule(data.id);
      this.menuData.menuName = parentId;

      if (data.level == 1) {
        this.oneMenuShow = true;
      } else {
        this.twoMenuShow = true;
      }

      this.menuData.type = "edit";
      this.menuData.id = data.id;
      this.selectData = data;
      this.menuData.resPage = data.resPage;
      this.menuData.summary = data.summary;
      this.menuData.resIcon = data.resIcon;
      this.menuData.resName = data.title;
      this.menuData.orderIndex = data.orderIndex;
    },
    //保存
    save() {
      let treeData = this.$refs.tree.getCheckedNodes();
      const [a, ...b] = treeData;
      let data = [];
      for (let i = 0; i < treeData.length; i++) {}
      return;
    },
    //新建一级菜单
    partitionSave() {
      if (!this.menuData.resName) {
        this.$Message.error("菜单名称不能为空");
        return false;
      }
      if (!this.menuData.orderIndex) {
        this.$Message.error("排序号不能为空");
        return false;
      }
      // if (!this.menuData.resIcon) {
      //   this.$Message.error("菜单ICON不能为空");
      //   return false;
      // }
      this.addNode(this.selectData);
    },
    //新建/修改二级菜单
    twoLevelMenuSure() {
      if (!this.menuData.resName) {
        this.$Message.error("菜单名称不能为空");
        return false;
      }
      if (!this.menuData.resPage) {
        this.$Message.error("菜单URL不能为空");
        return false;
      }
      if (!this.menuData.orderIndex) {
        this.$Message.error("排序号不能为空");
        return false;
      }
      const {
        resPage,
        orderIndex,
        summary,
        resIcon,
        resName,
        menuName
      } = this.menuData;
      const resType = "page";
      let parmas = {
        sort: parseInt(orderIndex, 10),
        // summary,
        parentId: this.menuData.menuName,
        name: resName,
        target: "page",
        href: resPage,
        icon: resIcon
      };
      if (this.menuData.type == "edit") {
        parmas["id"] = this.menuData.id;
      }
      this.Global.deleteEmptyProperty(parmas);

      this.Global.doPost("menu/doSave.json", parmas, res => {
        this.$Message.success(
          this.menuData.type == "edit" ? "修改成功" : "新建成功"
        );
        this.getTreeData();
        this.cancel();
      });
    },
    cancel() {
      this.oneMenuShow = false;
      this.twoMenuShow = false;
    },
    addNode(data) {
      const { resPage, orderIndex, summary, resIcon, resName } = this.menuData;
      const resType = "menu";
      let parmas = {
        sort: parseInt(orderIndex, 10),
        // summary,
        isShow: "1",
        // parentId: this.menuData.menuName,
        parentId: 0,
        name: resName,
        target: "menu"
        // icon:resIcon
      };
      if (this.menuData.type == "edit") {
        parmas["id"] = this.menuData.id;
      }
      this.Global.deleteEmptyProperty(parmas);
      this.Global.doPost("menu/doSave.json", parmas, res => {
        this.$Message.success(
          this.menuData.type == "edit" ? "修改成功" : "新建成功"
        );
        this.getTreeData();
        this.cancel();
      });
    }
  }
};
</script>
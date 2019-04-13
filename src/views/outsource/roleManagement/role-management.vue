<style lang="less" scoped>
@import "../../../config/index.less";
#Main {
  height: 100%;
}

.main-container {
  position: relative;
  min-height: 100%;
  padding-top: 10px;
  background: #ffffff;
  padding-bottom: 60px;
  .form {
    display: flex;
    position: relative;
    .container {
      width: 17.5%;
      // margin: auto;
      .w18 {
        width: 100%;
      }
    }
    .w10 {
      position: absolute;
      top: 0;
      right: 0;
    }
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
        color: #ff8a34;
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
  .page-box {
    overflow: hidden;
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
}
.box {
  padding: 0 10px;
}

.ivu-radio-wrapper {
  margin-right: 30px;
}
.buttonBox {
  padding: 10px 0;
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
.numColor {
  color: #ff8a34;
}
</style>

<template>
    <div id="Main">
        <!-- <h2 class="Title">后台角色管理</h2> -->
        <div class="main-container">
          <div class="box">
              <Form ref="form" class="form" :model="formData" :label-width="10">
                  <div class="container">
                    <div class="btn-left w18">
                      <Form-item prop='workerName'>
                        <Input v-model.trim='formData.name' placeholder="请输入角色"></Input>
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
          <div class="box" style='margin-top: 15px;overflow: hidden;text-align:center;'>
            <div class='contentTop'>
              <span class="btn-left">共查询到 <span class='numColor'>{{pageNum}}</span> 条数据</span>
              <addNewBtn class="btn-right" @click.native="createNewAccount" title="新建角色"/>
            </div>
            <Table :columns="columns1" :data="pageData" disabled-hover></Table>
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
import addNewBtn from "@/components/Button/addNew-btn.vue";
export default {
  name: "out-role-management",
  components: { addNewBtn },
  data() {
    return {
      type: "", //类型 add 新建  modify 修改
      formData: {
        brandId: "",
        userName: ""
      },
      formItem: {
        userName: "",
        password: "",
        phone: ""
      },
      page: 1,
      pageSize: 10,
      pageNum: 0,
      rules: {},
      columns1: [
        {
          title: "角色",
          key: "name",
          align: "center",
          minWidth: 50
        },
        {
          title: "角色ID",
          key: "id",
          align: "center",
          minWidth: 50
        },
        {
          title: "角色说明",
          key: "description",
          align: "center",
          minWidth: 50
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 300,
          render: (h, params) => {
            var tag = [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$router.push(
                        `/outCreateNewRole?type=edit&id=${params.row.id}`
                      );
                    }
                  }
                },
                "修改"
              )
            ];

            tag.push(
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  style: {
                    marginLeft: "5px",
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: "警告",
                        content: "确定删除该角色？",
                        onOk: () => {
                          this.remove(params.row.id);
                        }
                      });
                    }
                  }
                },
                "删除"
              )
            );
            // tag.push(
            //   h(
            //     "Button",
            //     {
            //       props: {
            //         type: "success",
            //         size: "small"
            //       },
            //       style: {
            //         marginLeft: "5px"
            //       },
            //       on: {
            //         click: () => {
            //           this.$Modal.info({
            //             title: "警告",
            //             content: "确定复制该账户？",
            //             onOk: () => {
            //               this.copy(params.row);
            //             }
            //           });
            //         }
            //       }
            //     },
            //     "复制"
            //   )
            // );
            return h("div", tag);
          }
        }
      ],
      pageData: [],
      page: 1,
      pageNum: 0
    };
  },
  created() {
    this.init();
  },
  watch: {},
  methods: {
    createNewAccount() {
      this.$router.push("/outCreateNewRole?type=add");
    },
    submit(name) {
      this.page = 1;
      this.init();
    },
    changePage(size) {
      this.page = size;
      this.init();
    },
    copy(data) {
      let { id, brandId, roleName, description } = data;
      let datas = { id, brandId, roleName, description };
      this.Global.doPost("role/copyRole.json", datas, res => {
        this.init();
      });
    },
    remove(id) {
      this.Global.doPost(
        "role/doUpdate.json",
        {
          id,
          status: 0
        },
        res => {
          this.init();
        }
      );
    },
    init() {
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      data["status"] = 1;
      this.Global.doPost("outRole/doQueryWithPage.json", data, res => {
        this.pageNum = res.items;
        this.page = res.page;
        this.pageData = res.datalist;
      });
    }
  }
};
</script>
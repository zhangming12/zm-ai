
<style lang="less" scoped>
@import "../../../config/index.less";
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
    width: 70%;

    .w18 {
      width: 25%;
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
.item-s {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
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
              <Form-item prop="brandId">
                <Select v-model="formData.brandId" placeholder="请选择品牌归属" clearable>
                  <Option
                    :value="item.id"
                    v-for="(item,index) in brandList"
                    :key="index"
                  >{{ item.name }}</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item prop="phone">
                <Input placeholder="标签名称" v-model="formData.labelName" clearable></Input>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item prop="phone">
                <Input placeholder="物体名称" v-model="formData.articleName" clearable></Input>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item prop="phone">
                <Select v-model="formData.categoryTypeId" placeholder="产品类别" clearable>
                  <Option
                    :value="item.id"
                    v-for="(item,index) in allCategoryList"
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
          <span class="btn-left">
            此表共包含
            <span class="numColor">{{pageNum}}</span>条数据
          </span>
          <addNewBtn class="btn-right" title="添加标签" @btnClick="showModel"/>
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
    <!-- 添加标签 -->
    <myModal class="myModal" @close="addShow = false" width="1000" :modal="addShow">
      <div slot="main" class="modal-main">
        <div class="header">添加标签</div>
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
                <div class="btn-left w18">
                  <Form-item prop="brandId">
                    <Select v-model="addData.brandId" placeholder="请选择品牌归属" clearable>
                      <Option
                        :value="item.id"
                        v-for="(item,index) in brandList"
                        :key="index"
                      >{{ item.name }}</Option>
                    </Select>
                  </Form-item>
                </div>
                <div class="btn-left w18">
                  <Form-item prop="phone">
                    <Input placeholder="标签名称" v-model="addData.labelName" clearable></Input>
                  </Form-item>
                </div>
                <div class="btn-left w18">
                  <Form-item prop="phone">
                    <Input placeholder="物体名称" v-model="addData.articleName" clearable></Input>
                  </Form-item>
                </div>
                <div class="btn-left w18">
                  <Form-item prop="phone">
                    <Select v-model="addData.categoryTypeId" placeholder="产品类别" clearable>
                      <Option
                        :value="item.id"
                        v-for="(item,index) in allCategoryList"
                        :key="index"
                      >{{ item.name }}</Option>
                    </Select>
                  </Form-item>
                </div>
              </div>
              <div class="btn-right w10" style="margin-right:10px;">
                <div class="searchBox">
                  <div class="btn-right search-right" @click="filterCategory">
                    <Button shape="circle" icon="ios-search" type="primary">搜索</Button>
                  </div>
                </div>
              </div>
            </Form>
          </div>
          <div class="select-box">
            <div class="header-title">
              <Row>
                <Col span="5" offset="4">品牌归属</Col>
                <Col span="5">标签名称</Col>
                <Col span="5">物体名称</Col>
                <Col span="5">产品类别</Col>
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
                      <Col span="5">
                        <div class="item-s" :title="item.brandName">{{ item.brandName }}</div>
                      </Col>
                      <Col span="5">
                        <div class="item-s" :title="item.labelName">{{ item.labelName }}</div>
                      </Col>
                      <Col span="5">
                        <div class="item-s" :title="item.articleName">{{ item.articleName }}</div>
                      </Col>
                      <Col span="5">
                        <div
                          class="item-s"
                          :title="item.categoryTypeName"
                        >{{ item.categoryTypeName }}</div>
                      </Col>
                    </Row>
                  </div>
                </template>
              </CheckboxGroup>
            </div>
          </div>
        </div>
        <div class="footer" style="margin-top:10px;">
          <Checkbox
            class="btn-left"
            style="padding:2px 20px;"
            @on-change="selectAllMethod"
            v-model="selectAll"
          >全选{{ filterCategoryList.length }}个标签</Checkbox>
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
  name: "label-manage",

  components: {
    hhTable,
    myModal,
    fieldNameDes,
    addNewBtn
  },
  data() {
    return {
      selectAll: false,
      brandList: [],
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
          title: "标签ID",
          key: "labelId",
          align: "center",
          tooltip: true
        },
        {
          title: "标签名称",
          key: "labelName",
          align: "center",
          tooltip: true
        },
        {
          title: "物体名称",
          key: "articleName",
          align: "center",
          tooltip: true
        },
        {
          title: "品牌归属",
          key: "brandName",
          align: "center",
          tooltip: true
        },
        {
          title: "产品类别",
          key: "categoryTypeName",
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
                          id: params.row.id
                        };
                        this.Global.doPost(
                          "dataLabel/doDelete.json",
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
      dataId: ""
    };
  },
  created() {
    let query = this.$route.query;
    if (Object.keys(query).length) {
      let { id } = query;
      this.dataId = id;
    }
    this.Global.doPost("brand/doQueryAll.json", { status: 1 }, res => {
      if (res && res.length) {
        this.brandList = res;
      }
    });
    this.init();
    this.queryAllCategoryList();
  },
  watch: {
    addShow(val) {
      if (!val) {
        this.addData = {};
        this.selectedCategory = [];
        this.filterCategoryList = [];
        this.selectAll = false;
      }
    }
  },
  methods: {
    selectAllMethod(val) {
      if (val) {
        this.filterCategoryList.forEach(item => {
          this.selectedCategory.push(item.id);
        });
        this.selectedCategory = this.unitArr(this.selectedCategory);
      } else {
        this.filterCategoryList.forEach(item => {
          let i = this.selectedCategory.indexOf(item.id);
          if (i != -1) {
            this.selectedCategory.splice(i, 1);
          }
        });
      }
    },
    //数组去重
    unitArr(arr) {
      return [...new Set(arr)];
    },
    //查询所有的产品类别
    queryAllCategoryList() {
      this.Global.doPost("categoryType/doQueryAll.json", { status: 1 }, res => {
        this.allCategoryList = res;
      });
    },
    saveCategory() {
      let data = {
        dataId: this.dataId
      };
      let arr = [];
      this.selectedCategory.forEach(item => {
        arr.push({ id: item });
      });
      data["labelFormList"] = [...arr];
      this.Global.doPost("dataLabel/doSave.json", data, res => {
        this.$Message.success("操作成功");
        this.addShow = false;
        this.init();
      });
    },
    showModel() {
      this.type = "add";
      this.addShow = true;
      // this.filterCategory()
      // this.Global.doPost(
      //   "dataLabel/doQueryDataLabeledList.json",
      //   { dataId: this.dataId },
      //   res => {
      //     console.log(res)
      //     if (res && res.length) {
      //       let arr = [];
      //       res.forEach(item => {
      //         arr.push(item.labelId);
      //       });
      //       this.selectedCategory = [...arr];
      //       this.addShow = true;
      //       this.selectAll = false;
      //     }
      //   }
      // );
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
    filterCategory() {
      var data = this.Global.JsonChange(this.addData);
      data["needCount"] = false;
      data["dataId"] = this.dataId;
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost(
        "label/doQueryNotReleteDataLabelList.json",
        data,
        res => {
          this.filterCategoryList = res.datalist;
          this.addShow = true;
          this.selectAll = false;
        }
      );
    },
    init() {
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      data["dataId"] = this.dataId;
      this.Global.doPost(
        "dataLabel/doQueryDataLabelWithPage.json",
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
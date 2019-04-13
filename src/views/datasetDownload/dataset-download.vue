
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
  //   justify-content: center;
  align-items: center;
  .container {
    width: 17.5%;

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
      // max-height: 500px;
      margin-top: 10px;
      padding: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .model-form {
        width: 400px;
        margin-left: 100px;
      }
      .select-box {
        padding-left: 20px;
        margin-top: 10px;
        .main-box {
          min-height: 30px;
          border: 1px solid #e5e5e5;
          padding: 10px;
          max-height: 200px;
          overflow-y: scroll;
        }
      }
    }
    .footer {
      text-align: right;
      padding: 10px 20px 10px 0;
    }
  }
}
.search-box {
  margin-top: 10px;
  .s-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .s-left {
      width: 70px;
    }
    .s-right {
      flex: 1;
    }
  }
}
</style>

<template>
  <div id="Main">
    <!-- <h2 class="Title">数据集下载</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" class="form" :model="formData" :label-width="10">
          <div class="container">
            <div class="btn-left w18">
              <Form-item prop="labelName">
                <Select v-model="formData.dataId" placeholder="请选择数据集名称" clearable>
                  <Option
                    :value="item.id"
                    v-for="(item,index) in dataNameList"
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
    <myModal class="myModal" @close="closeModel" width="700" :modal="addShow">
      <div slot="main" class="modal-main">
        <div class="header">下载数据集</div>
        <div class="modal-table" style="padding-top:0;">
          <div class="contentTop">
            <refreshBtn class="btn-right" @click.native="queryDownloadData(downloadData.id)"/>
          </div>
          <Table ref="table" :columns="columns1" :data="downloadList" disabled-hover></Table>
          <div class="search-box">
            <Row>
              <Col span="9">
                <div class="s-item">
                  <div class="s-left">物体名称:</div>
                  <div class="s-right">
                    <Input v-model.trim="downData.articleName" clearable placeholder="请输入物体名称"/>
                  </div>
                </div>
              </Col>
              <Col span="9" offset="1">
                <div class="s-item">
                  <div class="s-left">品牌筛选:</div>
                  <div class="s-right">
                    <Select v-model="downData.brandId" placeholder="请选择品牌归属" clearable>
                      <Option
                        :value="item.id"
                        v-for="(item,index) in brandList"
                        :key="index"
                      >{{ item.name }}</Option>
                    </Select>
                  </div>
                </div>
              </Col>
              <Col span="3" offset="1">
                <div class="s-item">
                  <div class="searchBox">
                    <div class="btn-right search-right" @click="filterLabel">
                      <Button shape="circle" icon="ios-search" type="primary">搜索</Button>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <h3 style="margin-top:10px;">请选择本次下载的对应标签</h3>
          <div class="select-box">
            <Checkbox @on-change="selectedAll" style="margin-bottom:10px;" v-model="selectAll">全选</Checkbox>
            <CheckboxGroup v-model="selectedData">
              <div class="main-box">
                <template v-for="(item,index) in filterLabelList">
                  <div class="item" :key="item.labelId" v-if="index < 50">
                    <Checkbox :label="item.labelId">
                      <span>{{ item.articleName }}</span>
                    </Checkbox>
                  </div>
                </template>
              </div>
            </CheckboxGroup>
          </div>
        </div>
        <div class="footer">
          <Button @click="submitTask" type="primary">提交任务</Button>
        </div>
      </div>
    </myModal>

    <!-- 查看关联标签数 -->
    <myModal
      class="myModal"
      @close="showRelationLabel = false"
      width="600"
      :modal="showRelationLabel"
    >
      <div slot="main" class="modal-main">
        <div class="modal-table" style="margin:0;padding:0;">
          <Table
            :columns="lableColumns"
            :height="relationLabelData.length > 8 ? '520' : ''"
            :data="relationLabelData"
          ></Table>
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
import refreshBtn from "@/components/Button/refresh-btn.vue";
import { dataSetStatus, downloadStatus } from "@/util/ENUMS.js";
export default {
  name: "dataset-download",

  components: {
    exportBtn,
    hhTable,
    myModal,
    refreshBtn,
    fieldNameDes
  },
  data() {
    return {
      dataId: "",
      brandList: [],
      lableColumns: [
        // {
        //   title: "序号",
        //   type: "index"
        // },
        {
          title: "标签名称",
          key: "labelName",
          tooltip: true,
          align: "center"
        },
        {
          title: "物体名称",
          key: "articleName",
          tooltip: true,
          align: "center"
        }
      ],
      relationLabelData: [],
      showRelationLabel: false,
      downloadData: {},
      selectedData: [],
      downloadList: [],
      selectAll: false,
      addShow: false, //新建/修改莫太快
      type: "", //add--新建  modify--修改
      noneStatus: false,
      formData: {
        labelName: ""
      },
      downData: {
        articleName: ""
      },
      labelList: [],
      filterLabelList: [],
      page: 1,
      pageNum: 0,
      columns: [
        {
          title: "序号",
          type: "index"
        },
        {
          title: "数据集ID",
          key: "id",
          align: "center",
          tooltip: true
        },
        {
          title: "数据集名称",
          key: "name",
          align: "center",
          tooltip: true
        },
        {
          title: "关联标签数",
          key: "labelCount",
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
                      params.row.labelCount != 0 && !params.row.labelCount
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
                          "dataSet/doDataLabelCount.json",
                          data,
                          res => {
                            this.$set(params.row, "labelCount", res);
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
                      params.row.labelCount == 0 || params.row.labelCount
                        ? "inline"
                        : "none"
                  }
                },
                params.row.labelCount
              )
            );
            tag.push(
              h(
                "a",
                {
                  style: {
                    textDecoration: "underline",
                    display:
                      params.row.labelCount == 0 || params.row.labelCount
                        ? "inline"
                        : "none"
                  },
                  on: {
                    click: () => {
                      this.Global.doPost(
                        "dataLabel/doQueryDataLabeledList.json",
                        {
                          dataId: params.row.id
                        },
                        res => {
                          this.relationLabelData = res;
                          this.showRelationLabel = true;
                        }
                      );
                    }
                  }
                },
                "[查看]"
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
          title: "标注图片数",
          key: "statusCount",
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
                      params.row.statusCount != 0 && !params.row.statusCount
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
                          "dataPictureRef/doLabelPictureCount.json",
                          params.row.id,
                          res => {
                            this.$set(params.row, "statusCount", res);
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
                      params.row.statusCount == 0 || params.row.statusCount
                        ? "inline"
                        : "none"
                  }
                },
                params.row.statusCount
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
          title: "操作",
          width: 150,
          align: "center",
          render: (h, params) => {
            let tag = [
              h(
                "Tooltip",
                {
                  attrs: {
                    content: "下载",
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
                      icon: "ios-cloud-download-outline",
                      // size: 30,
                      type: "default"
                    },
                    on: {
                      click: () => {
                        this.downloadData.id = params.row.id;
                        this.queryDownloadData(params.row.id);
                        this.Global.doPost(
                          "dataLabel/doQueryDataLabelWithPage.json",
                          {
                            dataId: params.row.id,
                            needCount: false
                          },
                          res => {
                            let arr = [];
                            this.dataId = params.row.id;
                            this.filterLabelList = res.datalist;
                            this.queryBrandList();
                            this.addShow = true;
                            // this.filterLabel();
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
      columns1: [
        {
          title: "任务名",
          key: "name",
          align: "center",
          tooltip: true
        },
        {
          title: "提交时间",
          key: "submitTime",
          align: "center",
          tooltip: true,
          minWidth: 150,
          render: (h, params) => {
            return h("div", this.Global.createTime(params.row.submitTime));
          }
        },
        {
          title: "状态",
          key: "status",
          align: "center",
          tooltip: true,
          render: (h, params) => {
            return h("div", downloadStatus[params.row.status]);
          }
        },
        {
          title: "操作",
          width: 150,
          align: "center",
          render: (h, params) => {
            let tag = [
              h("Button", {
                style: {
                  fontSize: "24px",
                  border: "none",
                  padding: "0 4px",
                  background: "white"
                },
                attrs: {
                  icon: "ios-cloud-download-outline",
                  type: "default",
                  disabled: params.row.status == 0 ? true : false
                },
                on: {
                  click: () => {
                    window.open(params.row.path);
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
      dataNameList: []
    };
  },
  created() {
    //数据集列表查询
    this.Global.doPost("dataSet/doQueryAll.json", { status: 1 }, res => {
      this.dataNameList = res;
    });
    this.init();
  },
  watch: {
    addShow(val) {
      if (!val) {
        this.downloadList = [];
        this.downloadData = {};
        this.selectedData = [];
        this.selectAll = false;
        this.downData = {};
      }
    },
    selectedData(val) {
      if (val.length == this.filterLabelList.length) {
        this.selectAll = true;
      } else {
        this.selectAll = false;
      }
    }
  },
  methods: {
    filterLabel() {
      // let val = this.downData.articleName;
      // if (!val) {
      //   this.filterLabelList = [...this.labelList];
      // } else {
      //   this.filterLabelList = this.labelList.filter(
      //     item => item.articleName.indexOf(val) != -1
      //   );
      // }
      let data = this.Global.JsonChange(this.downData);
      data["needCount"] = false;
      data["dataId"] = this.dataId;
      this.Global.doPost(
        "dataLabel/doQueryDataLabelWithPage.json",
        data,
        res => {
          this.filterLabelList = res.datalist;
        }
      );
    },
    submitTask() {
      // if (!this.selectedData.length) {
      //   this.$Message.info("请选择标签");
      //   return false;
      // }
      let data = {};
      if (this.selectedData.length) {
        data["ids"] = this.selectedData;
      }
      data["dataId"] = this.downloadData.id;

      this.Global.doPost("downloadTask/doSave.json", data, res => {
        this.$Message.success("提交成功");
        this.selectedData = [];
        this.queryDownloadData(data["dataId"]);
      });
    },
    queryDownloadData(id) {
      this.downloadList = [];
      this.Global.doPost(
        "downloadTask/doQueryWithPage.json",
        {
          pageSize: 5,
          dataId: id
        },
        res => {
          this.downloadList = res.datalist;
        }
      );
    },
    // 全选
    selectedAll(val) {
      this.selectedData = [];
      if (val) {
        this.filterLabelList.forEach(item => {
          this.selectedData.push(item.labelId);
        });
        this.selectedData = this.unitArr(this.selectedData);
      } else {
        // this.selectedData = [];
        this.filterLabelList.forEach(item => {
          // this.selectedData.push(item.labelId);
          let i = this.selectedData.indexOf(item.labelId);
          if (i != -1) {
            this.selectedData.splice(i, 1);
          }
        });
      }
    },
    unitArr(arr) {
      return [...new Set(arr)];
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
    queryBrandList() {
      if (!this.brandList.length)
        this.Global.doPost("brand/doQueryAll.json", { status: 1 }, res => {
          if (res && res.length) {
            this.brandList = res;
            // this.addShow
          }
        });
    },
    init() {
      let name = "";
      this.dataNameList.forEach(item => {
        if (item.id == this.formData.dataId) {
          name = item.name;
        }
      });
      var data = { name, status: 1 };
      data["groupStatus"] = 5;
      this.Global.deleteEmptyProperty(data);
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      this.Global.doPost("dataSet/queryDataSetList.json", data, res => {
        this.pageData = res.datalist;

        this.pageNum = res.items;
        this.page = res.page;
        this.noneStatus = true;
      });
    }
  }
};
</script>

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
    width: 35%;
    .w18 {
      width: 50%;
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
  // max-height: 300px;
  top: 0;
  left: 0;
  .modal-main {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    // max-height: 300px;
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
      .model-form {
        width: 500px;
        margin-left: 50px;
        .item-box {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          .left {
            width: 70px;
            // margin-right: 8px;
            p {
              line-height: 20px;
            }
            p.tool {
              cursor: pointer;
              position: relative;
              padding-left: 20px;
              &::before {
                content: "";
                display: block;
                position: absolute;
                width: 16px;
                height: 16px;
                top: 3px;
                left: 0;
                background: url("../../assets/image/label.png");
                background-size: 100%;
              }
              &:hover {
                color: @primary-color;
                &::before {
                  background: url("../../assets/image/label-color.png");
                  background-size: 100%;
                }
              }
            }
          }
          .right {
            flex: 1;
          }
        }
      }
      .boxs {
        padding: 0 10px;
      }
      .select-box {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        margin-top: 10px;
        .left,
        .right {
          width: 49%;
          .title {
            margin-left: 30px;
            position: relative;
            &::before {
              content: "";
              display: block;
              position: absolute;
              width: 10px;
              height: 10px;
              border-radius: 50%;
              left: -15px;
              top: 4px;
              background-color: #e5e5e5;
            }
          }
          .select-box-main {
            max-height: 150px;
            min-height: 30px;
            overflow-y: auto;
            border-right: 1px solid #e5e5e5;
            .selected-box {
              // overflow: hidden;
              .item {
                width: 100%;
                margin-top: 8px;
                float: left;
              }
            }
          }
        }
        .right {
          .title {
            &::before {
              background-color: @primary-color;
            }
          }
          .select-box-main {
            border: none;
          }
        }
      }
      .upload-list {
        display: inline-block;
        width: 100px;
        height: 130px;
        margin-left: 10px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        // box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
        margin-right: 4px;
        img {
          width: 100px;
          height: 100px;
        }
        .progress-box {
          border: 1px solid #e5e5e5;
          width: 98px;
          height: 98px;
          box-sizing: border-box;
          border-radius: 4px;
          p {
            position: absolute;
            top: 40px;
            left: 0;
            text-align: center;
            font-size: 12px;
            width: 100px;
            height: 30px;
            line-height: 30px;
          }
        }
        .name-box {
          line-height: 30px;
          height: 30px;
          width: 100px;
          position: absolute;
          left: 0;
          bottom: 0;
          text-align: center;
        }
      }
      .upload-list-cover {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 100px;
        height: 100px;
        background: rgba(0, 0, 0, 0.6);
      }
      .upload-list:hover .upload-list-cover {
        display: block;
      }
      .upload-list-cover i {
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        line-height: 100px;
      }
    }
    .footer {
      text-align: right;
      padding: 10px 20px 10px 0;
    }
    .info-box {
      padding: 10px 40px;
      padding-left: 150px;
      line-height: 24px;
    }
  }
}
</style>

<template>
	<div id="Main">
		<!-- <h2 class="Title">接口信息</h2> -->
        <div class="main-container">
            <div class="box">
                <Form ref="form" class="form" :model="formData" :label-width="10">
                    <div class="container">
                        <div class="btn-left w18">
                            <Form-item prop="name">
                                <Input placeholder="请输入接口名称" v-model="formData.name" clearable></Input>
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
        <!-- 新建/修改接口 -->
        <myModal class="myModal"
                    @close="closeModel"
                    width='600'
                    :modal="addShow">
                    <div slot="main" class="modal-main">
                        <div class="header">
                            {{ type == 'add' ? '新建接口' : '修改接口'}}
                        </div>
                        <div class="modal-table">
                            <Form ref="form" class="model-form" :label-width="10">
                                <Form-item required>
                                  <div class="item-box">
                                    <div class="left">
                                      接口名称:
                                    </div>
                                    <div class="right">
                                      <Input clearable v-model.trim="addData.name"  placeholder="限20个字符以内"></Input>
                                    </div>
                                  </div>
                                    
                                </Form-item>
                                <Form-item required>
                                  <div class="item-box">
                                    <div class="left">
                                      接口地址:
                                    </div>
                                    <div class="right">
                                      <Input clearable v-model.trim="addData.service"  placeholder="限20个字符以内"></Input>
                                    </div>
                                  </div>
                                    
                                </Form-item>
                                <Form-item required>
                                  <div class="item-box">
                                    <div class="left">
                                      <p>关联模型:</p>
                                    </div>
                                    <div class="right" style="display:flex;flex-direction:row;">
                                      <Input style="width:85%;" clearable v-model.trim="addData.models" readonly></Input>
                                      <p style="flex:1;margin-left:10px;" class="tool" @click="showRelation">
                                        编辑
                                      </p>
                                    </div>
                                  </div>
                                    
                                </Form-item>
                                <Form-item required>
                                  <div class="item-box">
                                    <div class="left">
                                      调用量:
                                    </div>
                                    <div class="right">
                                      <Input clearable v-model.number="addData.speed"  placeholder="限100个字符以内"></Input>
                                    </div>
                                  </div>
                                    
                                </Form-item>
                                <Form-item required>
                                  <div class="item-box">
                                    <div class="left">
                                      备注信息:
                                    </div>
                                    <div class="right">
                                      <Input clearable v-model.trim="addData.memo"  placeholder="限100个字符以内"></Input>
                                    </div>
                                  </div>
                                    
                                </Form-item>
                                
                            </Form>
                        </div>
                        <div class="footer">
                            <Button @click="save" type="primary">保存</Button>
                        </div>
                    </div>
        </myModal>

        <!-- 协作人 -->
        <myModal class="myModal"
                    @close="closeModel"
                    width='600'
                    :modal="peopleShow">
                    <div slot="main" class="modal-main">
                        <div class="header">
                          协作人
                        </div>
                        <div class="modal-table">
                            <div class="boxs">
                                <Form ref="form" class="form" :model="formData" :label-width="10">
                                    <div class="container" style="width:60%;">
                                        <div class="btn-left w18">
                                            <Form-item prop="userName">
                                                <Input clearable placeholder="请输入用户名称" v-model.trim="peopleData.userName"></Input>
                                            </Form-item>
                                        </div>
                                        <div class="btn-left w18">
                                            <Form-item prop="userId">
                                                <Input clearable placeholder="请输入工号" v-model.trim="peopleData.userId"></Input>
                                            </Form-item>
                                        </div>
                                        
                                    </div>
                                    <div class="btn-right w10">
                                        <div class="searchBox">
                                            <div class="btn-right search-right" @click="submit('form')">
                                                <Button shape="circle" @click="filterPeople" icon="ios-search" type="primary">搜索</Button>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                            <div class="select-box">
                              <div class="left">
                                <div class="title">
                                  待选人员
                                </div>
                                <div class="select-box-main">
                                  <CheckboxGroup v-model="selectPeopleList" @on-change="peopleChange" style="margin-left:30px;">
                                    <div class="selected-box">
                                      <div class="item" v-for="(item,index) in filterPeopleList" :key="index + item.userId">
                                        <Checkbox :disabled="type == 'look'" :label="item.userId">
                                          <span>{{ item.userName }}</span>
                                        </Checkbox>
                                      </div>
                                    </div>
                                  </CheckboxGroup>
                                </div>
                              </div>
                              <div class="right">
                                <div class="title">
                                  已选人员
                                </div>
                                <div class="select-box-main">
                                  <CheckboxGroup v-model="selectedPeopleList" style="margin-left:30px;">
                                    <div class="selected-box">
                                      <div class="item" v-for="(item,index) in selectedPeopleList" :key="index">
                                        <Checkbox disabled :label="item">
                                          <span>{{ item }}</span>
                                        </Checkbox>
                                      </div>
                                    </div>
                                  </CheckboxGroup>
                                </div>
                              </div>
                            </div>
                        </div>
                        <div class="footer">
                            <Button v-if="type != 'look'" @click="savePeople" type="primary" style="padding:2px 20px;">确定</Button>
                        </div>
                    </div>
        </myModal>

        <!-- 关联模型 -->
        <myModal class="myModal"
                    @close="relationlabelShow = false"
                    width='740'
                    :modal="relationlabelShow">
                    <div slot="main" class="modal-main">
                        <div class="header">
                          关联模型
                        </div>
                        <div class="modal-table">
                            <div class="boxs">
  
                                <Form ref="form" class="form" style="justify-content: space-between;" :model="formData" :label-width="10">
                                    <div class="container" style="width:85%;">
                                        <div class="btn-left w18" style="width:50%;">
                                            <Form-item prop="name">
                                                <Input placeholder="接口名称" disabled readonly v-model="labelData.name"></Input>
                                            </Form-item>
                                        </div>
                                        <div class="btn-left w18" style="width:50%;">
                                            <Form-item prop="labelName">
                                                <Input placeholder="请输入模型名称" v-model="labelData.labelName" clearable></Input>
                                            </Form-item>
                                        </div>
                                    </div>
                                    <div class="btn-right w10">
                                        <div class="searchBox">
                                            <div class="btn-right search-right" @click="submit('form')">
                                                <Button shape="circle" @click="filterLabel" icon="ios-search" type="primary">搜索</Button>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                            <div class="select-box">
                              <div class="left">
                                <div class="title">
                                  待选模型
                                  <Checkbox v-model="labelSelectAll" @on-change="labelSelectAllMethod">全选</Checkbox>
                                </div>
                                <div class="select-box-main">
                                  <CheckboxGroup v-model="selectedLableList" @on-change="labelChange" style="margin-left:30px;">
                                    <div class="selected-box">
                                      <div class="item" v-for="(item,index) in filterLabelList" :key="index">
                                        <Checkbox :label="item.id">
                                          <span>{{ item.name }}</span>
                                        </Checkbox>
                                      </div>
                                      
                                    </div>
                                  </CheckboxGroup>
                                </div>
                              </div>
                              <div class="right">
                                <div class="title">
                                  已选模型
                                </div>
                                <div class="select-box-main">
                                  <CheckboxGroup v-model="selectLabelList" style="margin-left:30px;">
                                    <div class="selected-box">
                                      <div class="item" v-for="(item,index) in selectLabelList" :key="index">
                                        <Checkbox disabled :label="item">
                                          <span>{{ item }}</span>
                                        </Checkbox>
                                      </div>
                                    </div>
                                  </CheckboxGroup>
                                </div>
                              </div>
                            </div>
                        </div>
                        <div class="footer" style="margin-top:10px;">
                            <Button @click="saveSelectedLabel" type="primary" style="padding:2px 20px;">确定</Button>
                        </div>
                    </div>
        </myModal>

         <!-- 查看关联模型数 -->
        <myModal class="myModal"
                    @close="showRelationLabel = false"
                    width='600'
                    :modal="showRelationLabel">
                    <div slot="main" class="modal-main">
                        
                        <div class="modal-table" style="margin:0;">
                            <Table :columns="modalColumns" :height="relationLabelData.length > 8 ? '520' : ''"  :data="relationLabelData"></Table>
                        </div>
                    </div>
        </myModal>

         <!-- 查看协助人数 -->
        <myModal class="myModal"
                    @close="showPeople = false"
                    width='500'
                    :modal="showPeople">
                    <div slot="main" class="modal-main">
                        
                        <div class="modal-table" style="margin:0;">
                            <Table :columns="peopleColumns" :height="peopleDataList.length > 8 ? '520' : ''"  :data="peopleDataList"></Table>
                        </div>
                    </div>
        </myModal>
	</div>
</template>

<script>
import myModal from "@/components/Modal/my-modal.vue";
import upData from "@/assets/js/upload.js";
import fieldNameDes from "@/components/field-name-description.vue";
import hhTable from "@/components/table/table.vue";
import exportBtn from "@/components/Button/export-btn.vue";
import addNewBtn from "@/components/Button/addNew-btn.vue";
import PROJECT_CONFIG from "@/util/config.js";
import { dataSetStatus } from "@/util/ENUMS.js";
export default {
  name: "dataset-management",
  components: {
    exportBtn,
    hhTable,
    myModal,
    fieldNameDes,
    addNewBtn
  },
  data() {
    return {
      labelSelectAll: false,
      showPeople: false,
      peopleDataList: [],
      peopleColumns: [
        // {
        //   title: "序号",
        //   type: "index",
        //   align: "center",
        //   width: 60
        // },
        {
          title: "协助人",
          key: "userName",
          tooltip: true,
          align: "center"
        }
      ],
      uploadFilePath: PROJECT_CONFIG.uploadFile,
      showRelationLabel: false,
      relationLabelData: [], //关联标签数数据
      modalColumns: [
        {
          title: "模型名称",
          key: "apiModelName",
          tooltip: true,
          align: "center"
        }
      ],
      collaboratorList: [], //协作者
      upData: {
        context: JSON.stringify(this.Global.getContext())
      },
      defaultList: [],
      uploadList: [],
      uploadShow: false, //上传图片弹窗
      addShow: false, //新建/修改莫太快
      type: "", //add--新建  modify--修改 look--查看
      noneStatus: false,
      formData: {
        brandId: "",
        labelName: ""
      },
      brandList: [],
      page: 1,
      pageNum: 0,
      columns: [
        {
          title: "序号",
          type: "index"
        },
        {
          title: "接口名称",
          key: "name",
          align: "center",
          tooltip: true
        },
        {
          title: "接口地址",
          key: "service",
          align: "center",
          tooltip: true
        },
        {
          title: "关联模型",
          key: "labelCount",
          align: "center",
          tooltip: true,
          render: (h, params) => {
            let tag = [];
            tag.push(
              h(
                "a",
                {
                  style: {
                    textDecoration: "underline"
                  },
                  on: {
                    click: () => {
                      let data = {
                        serviceId: params.row.id
                      };
                      this.Global.doPost(
                        "serviceModel/doQueryAll.json",
                        data,
                        res => {
                          this.showRelationLabel = true;
                          this.relationLabelData = res;
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
          title: "调用量",
          key: "speed",
          align: "center",
          tooltip: true
        },
        {
          title: "备注信息",
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
                        this.Global.doPost(
                          "serviceModel/doQueryAll.json",
                          {
                            id: params.row.id
                          },
                          res => {
                            this.addData.name = params.row.name;
                            this.addData.memo = params.row.memo;
                            this.addData.id = params.row.id;
                            this.addData.service = params.row.service;
                            this.selectedLableList = [];
                            this.selectLabelList = [];
                            
                            res.forEach(item => {
                              this.selectedLableList.push(item.modelId);
                              this.selectLabelList.push(item.apiModelName);
                            });
                            this.addData.models = this.selectLabelList.join();
                            this.addShow = true;
                          }
                        );
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
                          content: `确定${
                            params.row.status == 1 ? "弃用" : "正常"
                          }该数据集？`,
                          onOk: () => {
                            this.Global.doPost(
                              "apiService/doDelete.json",
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
      pageSize: 10,
      //新建/修改数据集数据
      addData: {},
      // 协作人
      peopleShow: false,
      peopleData: {},
      filterPeopleList: [],
      selectPeopleList: [],
      selectedPeopleList: [],
      //关联标签
      labelData: {},
      relationlabelShow: false,
      allModalList: [], //所有的标签列表
      filterLabelList: [], //筛选过的标签
      selectedLableList: [], //已选择的标签列表
      selectLabelList: [],
      //上传文件
      uploadData: []
    };
  },
  created() {
    //查询协作者数据
    // user/doCompanyUsers
    // dataUser/doQueryAll.json
    this.Global.doPost("user/doCompanyUsers.json", {}, res => {
      this.collaboratorList = res;
    });
    this.init();
  },
  watch: {
    addShow(val) {
      if (!val) {
        this.addData = {};
        this.selectedLableList = [];
        this.selectLabelList = [];
      }
    },
    peopleShow(val) {
      if (!val) {
        this.peopleData = {};
        this.selectPeopleList = [];
        this.selectedPeopleList = [];
      } else {
        this.filterPeopleList = JSON.parse(
          JSON.stringify(this.collaboratorList)
        );
      }
    },
    uploadShow(val) {
      if (!val) {
        this.uploadList = [];
        this.uploadData = {};
        this.$refs.upload.fileList = [];
      } else {
        this.uploadList = this.$refs.upload.fileList;
      }
    }
  },
  mounted() {
    // this.uploadList = this.$refs.upload.fileList;
    this.filterLabel();
    this.queryAllModalList();
  },
  methods: {
    labelSelectAllMethod(val) {
      if (val) {
        this.selectedLableList = [];
        this.selectLabelList = [];
        this.filterLabelList.forEach(item => {
          this.selectedLableList.push(item.id);
          this.selectLabelList.push(item.name);
        });
      } else {
        this.selectedLableList = [];
        this.selectLabelList = [];
      }
    },
    savePeople() {
      let data = {};
      if (!this.selectPeopleList.length) {
        this.$Message.info("请选择协作人");
        return false;
      }
      data["id"] = this.peopleData.id;
      data["name"] = this.peopleData.name;
      let list = [];
      this.selectPeopleList.forEach(item => {
        this.collaboratorList.forEach(val => {
          if (item == val.userId) {
            list.push({
              userId: item,
              userName: val.userName
            });
          }
        });
      });
      data["userForms"] = list;
      this.Global.doPost("dataSet/doSaveCollaborator.json", data, res => {
        this.$Message.success("保存成功");
        this.init();
        this.peopleShow = false;
      });
    },
    filterPeople() {
      let data = this.Global.JsonChange(this.peopleData);
      this.Global.deleteEmptyProperty(data);
      delete data["id"];
      delete data["name"];
      this.Global.doPost("user/doCompanyUsers.json", data, res => {
        this.filterPeopleList = res;
      });
    },
    peopleChange(val) {
      this.selectedPeopleList = [];
      if (val && val.length) {
        val.forEach(item => {
          this.collaboratorList.forEach(v => {
            if (item == v.userId) {
              this.selectedPeopleList.push(v.userName);
            }
          });
        });
      }
    },
    //保存所选的标签
    saveSelectedLabel() {
      if (!this.selectLabelList.length) {
        this.$Message.info("请选择所需的模型");
        return false;
      }
      this.addData.models = this.selectLabelList.join();
      this.relationlabelShow = false;
    },
    labelChange(val) {
      this.selectLabelList = [];
      if (val && val.length) {
        val.forEach(item => {
          this.allModalList.forEach(val => {
            if (item == val.id) {
              this.selectLabelList.push(val.name);
            }
          });
        });
      }
    },
    // 筛选标签
    filterLabel() {
      let data = {
        // labelName: this.labelData.labelName,
        // articleName: this.labelData.articleName,
        status: 1
      };
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost("apiModel/doQueryAll.json", data, res => {
        this.filterLabelList = res;
      });
    },
    // 保存
    save() {
      if (!this.addData.name) {
        this.$Message.info("请填写模型名称");
        return false;
      }
      if (this.addData.name.length > 20) {
        this.$Message.info("模型名称在20个字符以内");
        return false;
      }
      if (!this.addData.service) {
        this.$Message.info("请填写接口地址");
        return false;
      }
      if (!this.addData.models) {
        this.$Message.info("请选择关联模型");
        return false;
      }
      if (!this.addData.speed) {
        this.$Message.info("请填写调用量");
        return false;
      }
      let data = {
        name: this.addData.name,
        service: this.addData.service,
        speed: this.addData.speed,
        memo: this.addData.memo
      };
      this.Global.deleteEmptyProperty(data);
      data["models"] = this.selectedLableList;
      let api = "";
      if (this.type == "modify") {
        data["id"] = this.addData.id;
        api = "apiService/doUpdate.json";
      } else {
        api = "apiService/doSave.json";
      }
      this.Global.doPost(api, data, res => {
        this.init();
        this.$Message.success(this.type == "add" ? "新建成功" : "修改成功");
        this.addShow = false;
      });
    },
    // 查询所有标签列表
    queryAllModalList() {
      this.Global.doPost("apiModel/doQueryAll.json", { status: 1 }, res => {
        this.allModalList = res;
      });
    },
    showRelation() {
      if (!this.addData.name) {
        this.$Message.info("请填写接口名称");
        return false;
      }
      this.labelData.name = this.addData.name;
      this.relationlabelShow = true;
    },
    handleRemove(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleSuccess(res, file, fileList) {
      if (res.status == 1) {
        file.data = res.data;
      } else {
        this.$Message.info(res.errorMsg);
      }
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "上传文件的格式不对",
        desc: "请选择zip格式的文件上传"
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "文件太大",
        desc: "上传的文件大小不能超过200M."
      });
    },
    // 上传文件
    uploadFile() {
      if (!this.uploadList.length) {
        this.$Message.info("请选择文件上传");
        return false;
      }
      let arr = [];
      let flag = false;
      this.uploadList.forEach(item => {
        if (item.status != "finished") {
          flag = true;
        }
        arr.push({
          dataId: this.uploadData.dataId,
          filePath: item.data
        });
      });
      if (flag) {
        this.$Message.info("等文件上传完毕后再操作");
        return false;
      }
      this.Global.doPost("dataSet/doUploadPic.file", arr, res => {
        this.$Message.success("上传成功");
        this.uploadShow = false;
      });
    },
    showModel() {
      this.type = "add";
      this.addShow = true;
    },
    closeModel() {
      this.addShow = false;
      this.uploadShow = false;
      this.peopleShow = false;
      this.relationlabelShow = false;
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
      this.Global.doPost("apiService/doQueryWithPage.json", data, res => {
        this.pageData = res.datalist;

        this.pageNum = res.items;
        this.page = res.page;
        this.noneStatus = true;
      });
    }
  },
  filters: {
    sizeFilter(val) {
      return `${(val / 1024 / 1024).toFixed(1)}M`;
    }
  }
};
</script>
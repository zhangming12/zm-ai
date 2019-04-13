
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
		<!-- <h2 class="Title">客户信息</h2> -->
        <div class="main-container">
            <div class="box">
                <Form ref="form" class="form" :model="formData" :label-width="10">
                    <div class="container">
                        <div class="btn-left w18">
                            <Form-item prop="name">
                                <Input placeholder="请输入账号" v-model="formData.loginAccount" clearable></Input>
                            </Form-item>
                        </div>
                        <div class="btn-left w18">
                            <Form-item prop="brandId">
                                <Input placeholder="请输入手机号" v-model="formData.phone" clearable></Input>
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
        <!-- 新建/修改数据集 -->
        <myModal class="myModal"
                    @close="closeModel"
                    width='600'
                    :modal="addShow">
                    <div slot="main" class="modal-main">
                        <div class="header">
                            {{ type == 'add' ? '新建数据集' : '修改数据集'}}
                        </div>
                        <div class="modal-table">
                            <Form ref="form" class="model-form" :label-width="10">
                                <Form-item required>
                                  <div class="item-box">
                                    <div class="left">
                                      企业组织:
                                    </div>
                                    <div class="right">
                                      <Select v-model="addData.companyId" placeholder="请选择企业组织">
                                            <Option v-for="item in companyList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                                      </Select>
                                    </div>
                                  </div>
                                    
                                </Form-item>
                                <Form-item required>
                                  <div class="item-box">
                                    <div class="left">
                                      姓名:
                                    </div>
                                    <div class="right">
                                      <Input clearable v-model.trim="addData.name"  placeholder="限20个字符以内"></Input>
                                    </div>
                                  </div>
                                    
                                </Form-item>
                                <Form-item required>
                                  <div class="item-box">
                                    <div class="left">
                                      账号:
                                    </div>
                                    <div class="right">
                                      <Input :disabled="type == 'modify'" v-model.trim="addData.loginAccount"  placeholder="限20个字符以内"></Input>
                                    </div>
                                  </div>
                                    
                                </Form-item>
                                <Form-item required>
                                  <div class="item-box">
                                    <div class="left">
                                      手机号码:
                                    </div>
                                    <div class="right">
                                      <Input clearable v-model.trim="addData.phone"  placeholder="请输入手机号"></Input>
                                    </div>
                                  </div>
                                    
                                </Form-item>
                                <Form-item required>
                                  <div class="item-box">
                                    <div class="left">
                                      坐标类型:
                                    </div>
                                    <div class="right">
                                      <Select v-model="addData.labelType" placeholder="请选择坐标类型">
                                            <Option :value="1">[{x1,y1},{x2,y2}]</Option>
                                            <Option :value="2">[left,top,width,height]</Option>
                                      </Select>
                                    </div>
                                  </div>
                                    
                                </Form-item>
                                <Form-item required>
                                  <div class="item-box">
                                    <div class="left">
                                      <p>关联接口:</p>
                                      <p>(共 {{ allApiList.length }} 个)</p>
                                      <p class="tool" @click="showRelation">
                                        编辑
                                      </p>
                                    </div>
                                    <div class="right">
                                      <Input clearable v-model.trim="addData.labelData" type="textarea" readonly :rows="4"></Input>
                                    </div>
                                  </div>
                                    
                                </Form-item>
                                <!-- <Form-item required>
                                  <div class="item-box">
                                    <div class="left">
                                      <p>关联数据集:</p>
                                      <p>(共 {{ allApiList.length }} 个)</p>
                                      <p class="tool" @click="showRelation">
                                        编辑
                                      </p>
                                    </div>
                                    <div class="right">
                                      <Input clearable v-model.trim="addData.labelData" type="textarea" readonly :rows="4"></Input>
                                    </div>
                                  </div>
                                    
                                </Form-item> -->
                                <Form-item required>
                                  <div class="item-box">
                                    <div class="left">
                                      关联数据集:
                                    </div>
                                    <div class="right">
                                      <Select v-model="addData.dataId" placeholder="请选择企业组织">
                                            <Option v-for="item in allDataList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                                      </Select>
                                    </div>
                                  </div>
                                    
                                </Form-item>
                                <Form-item required>
                                  <div class="item-box">
                                    <div class="left">
                                      备注信息:
                                    </div>
                                    <div class="right">
                                      <Input clearable v-model.trim="addData.memo" type="textarea" :rows="4" placeholder="限100个字符以内"></Input>
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

        <!-- 关联接口 -->
        <myModal class="myModal"
                    @close="relationlabelShow = false"
                    width='740'
                    :modal="relationlabelShow">
                    <div slot="main" class="modal-main">
                        <div class="header">
                          关联标签
                        </div>
                        <div class="modal-table">
                            <div class="boxs">
  
                                <Form ref="form" class="form" style="justify-content: space-between;" :model="formData" :label-width="10">
                                    <div class="container" style="width:85%;">
                                        <div class="btn-left w18" style="width:33.3333%;">
                                            <Form-item prop="name">
                                                <Input  placeholder="账户" disabled readonly v-model="labelData.name"></Input>
                                            </Form-item>
                                        </div>
                                        <div class="btn-left w18" style="width:33.3333%;">
                                            <Form-item prop="labelName">
                                                <Input placeholder="请输入接口" v-model="labelData.labelName" clearable></Input>
                                            </Form-item>
                                        </div>
                                    </div>
                                    <div class="btn-right w10">
                                        <div class="searchBox">
                                            <div class="btn-right search-right" @click="submit('form')">
                                                <Button shape="circle" @click="filterApi" icon="ios-search" type="primary">搜索</Button>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                            <div class="select-box">
                              <div class="left">
                                <div class="title">
                                  待选接口
                                  <Checkbox v-model="labelSelectAll" @on-change="labelSelectAllMethod">全选</Checkbox>
                                </div>
                                <div class="select-box-main">
                                  <CheckboxGroup v-model="selectedLableList" @on-change="labelChange" style="margin-left:30px;">
                                    <div class="selected-box">
                                      <div class="item" v-for="(item,index) in filterApiList" :key="index">
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
                                  已选接口
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

         <!-- 查看关联标签数 -->
        <myModal class="myModal"
                    @close="showRelationLabel = false"
                    width='600'
                    :modal="showRelationLabel">
                    <div slot="main" class="modal-main">
                        
                        <div class="modal-table" style="margin:0;">
                            <Table :columns="lableColumns" :height="relationLabelData.length > 8 ? '520' : ''"  :data="relationLabelData"></Table>
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
  name: "user-information",
  components: {
    exportBtn,
    hhTable,
    myModal,
    fieldNameDes,
    addNewBtn
  },
  data() {
    return {
      companyList: [],
      labelSelectAll: false,
      showPeople: false,
      peopleDataList: [],
      peopleColumns: [
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
      lableColumns: [
        {
          title: "标签名称",
          key: "labelName",
          tooltip: true,
          width: 300,
          align: "center"
        },
        {
          title: "物体名称",
          key: "articleName",
          tooltip: true,
          width: 300,
          align: "center"
        }
      ],
      collaboratorList: [], //协作者
      upData: {
        context: JSON.stringify(this.Global.getContext())
      },
      defaultList: [],
      uploadList: [],
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
          title: "用户ID",
          key: "userId",
          align: "center",
          tooltip: true
        },
        {
          title: "企业组织",
          key: "companyName",
          align: "center",
          tooltip: true
        },
        {
          title: "姓名",
          key: "name",
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
          title: "手机号码",
          key: "phone",
          align: "center",
          tooltip: true
        },
        {
          title: "接口信息",
          key: "apiInfo",
          align: "center",
          tooltip: true
        },
        {
          title: "配置信息",
          key: "apiConfig",
          align: "center",
          tooltip: true
        },
        {
          title: "关联数据集",
          key: "dataName",
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
          title: "操作",
          width: 180,
          align: "center",
          render: (h, params) => {
            let tag = [
              h(
                "Tooltip",
                {
                  attrs: {
                    content: "个人中心",
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
                      icon: "ios-contacts-outline",
                      type: "default"
                    },
                    on: {
                      click: () => {
                        this.$router.push({
                          path: "/personalCenter",
                          query: {
                            userId: params.row.userId
                          }
                        });
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
                      // size: 30,
                      type: "default"
                    },
                    on: {
                      click: () => {
                        this.type = "modify";
                        this.Global.doPost(
                          "merchantApi/doQueryAll.json",
                          {
                            merchantId: params.row.userId
                          },
                          res => {
                            this.addData.name = params.row.name;
                            this.addData.memo = params.row.memo;
                            this.addData.id = params.row.userId;
                            this.addData.dataId = params.row.dataId;
                            this.addData.labelType = params.row.labelType;
                            this.addData.loginAccount = params.row.loginAccount;
                            this.addData.companyId = params.row.companyId;
                            this.addData.phone = params.row.phone;
                            let arr = [];
                            this.selectedLableList = [];
                            this.selectLabelList = [];
                            res.forEach(item => {
                              this.selectedLableList.push(item.apiServiceId);
                              this.selectLabelList.push(item.serviceName);
                            });
                            this.addData.labelData = this.selectLabelList.join();
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
                    content: "重置API_key",
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
                      icon: "ios-lock-outline",
                      type: "default"
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: "警告",
                          content: `确定重置API_key？`,
                          onOk: () => {
                            this.Global.doPost(
                              "merchant/doResetApiKey.json",
                              params.row.userId,
                              res => {
                                this.$Message.success("重置成功");
                                this.init();
                              }
                            );
                          }
                        });
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
                          content: `确定删除用户？`,
                          onOk: () => {
                            this.Global.doPost(
                              "merchant/doDelete.json",
                              params.row.userId,
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
      pageData: [{}],
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
      allApiList: [], //所有的标签列表
      filterApiList: [], //筛选过的标签
      selectedLableList: [], //已选择的标签列表
      selectLabelList: [],
      //上传文件
      uploadData: [],
      allDataList: []
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
    }
  },
  mounted() {
    // this.uploadList = this.$refs.upload.fileList;
    this.filterApi();
    this.queryAllApiList();
    this.queryCompanyList();
    this.queryAllDataList();
  },
  methods: {
    queryAllDataList() {
      if (this.allDataList.length) return;
      this.Global.doPost("dataSet/doQueryAll.json", { status: 1 }, res => {
        this.allDataList = res;
      });
    },
    queryCompanyList() {
      if (this.companyList.length) return;
      this.Global.doPost("company/doQueryAll.json", { status: 1 }, res => {
        this.companyList = res;
      });
    },
    labelSelectAllMethod(val) {
      if (val) {
        this.selectedLableList = [];
        this.selectLabelList = [];
        this.filterApiList.forEach(item => {
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
        this.$Message.info("请选择所需的标签");
        return false;
      }
      this.addData.labelData = this.selectLabelList.join();
      this.relationlabelShow = false;
    },
    labelChange(val) {
      this.selectLabelList = [];
      if (val && val.length) {
        val.forEach(item => {
          this.allApiList.forEach(val => {
            if (item == val.id) {
              this.selectLabelList.push(val.name);
            }
          });
        });
      }
    },
    // 筛选标签
    filterApi() {
      let data = {
        // labelName: this.labelData.labelName,
        // articleName: this.labelData.articleName,
        status: 1
      };
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost("apiService/doQueryAll.json", data, res => {
        this.filterApiList = res;
      });
    },
    // 保存
    save() {
      if (!this.addData.companyId) {
        this.$Message.info("请选择企业组织");
        return false;
      }
      //   if (this.addData.name.length > 20) {
      //     this.$Message.info("数据集名称在20个字符以内");
      //     return false;
      //   }
      if (!this.addData.loginAccount) {
        this.$Message.info("请输入账号");
        return false;
      }
      if (!this.addData.name) {
        this.$Message.info("请输入姓名");
        return false;
      }
      if (!this.addData.phone) {
        this.$Message.info("请输入手机号");
        return false;
      }
      if (!this.addData.dataId) {
        this.$Message.info("请选择关联数据集");
        return false;
      }
      let data = {
        name: this.addData.name,
        companyId: this.addData.companyId,
        loginAccount: this.addData.loginAccount,
        phone: this.addData.phone,
        dataId: this.addData.dataId,
        memo: this.addData.memo
      };
      this.Global.deleteEmptyProperty(data);
      let api = "";
      if (this.type == "modify") {
        data["userId"] = this.addData.id;
        api = "merchant/doUpdate.json";
      } else {
        api = "merchant/doSave.json";
      }
      data["apiServices"] = this.selectedLableList;
      this.Global.doPost(api, data, res => {
        this.init();
        this.$Message.success(this.type == "add" ? "新建成功" : "修改成功");
        this.addShow = false;
      });
    },
    // 查询所有标签列表
    queryAllApiList() {
      this.Global.doPost("apiService/doQueryAll.json", { status: 1 }, res => {
        this.allApiList = res;
      });
    },
    showRelation() {
      if (!this.addData.loginAccount) {
        this.$Message.info("请填写账户");
        return false;
      }
      this.labelData.name = this.addData.loginAccount;
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
    // handleBeforeUpload(res) {
    //   console.log(
    //     `上传文件名${res.name},大小${(res.size / 1024 / 1024).toFixed(2)}M`
    //   );
    //   const check = this.uploadList.length < 5;
    //   this.upData["key"] = "ecuda/image/" + res.name;
    //   if (!check) {
    //     this.$Notice.warning({
    //       title: "Up to five pictures can be uploaded."
    //     });
    //   }
    //   return check;
    // },
    showModel() {
      this.type = "add";
      this.addShow = true;
    },
    closeModel() {
      this.addShow = false;
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
      this.Global.doPost("merchant/doQueryMerchantList.json", data, res => {
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
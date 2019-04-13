
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
.upDate {
  cursor: pointer;
  text-align: center;
  border: 1px solid #aeaeae;
  padding: 2px 12px;
  margin-right: 10px;
  width: 150px;
}
.myModal {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  .modal-main {
    box-sizing: border-box;
    // padding: 10px;
    width: 100%;
    height: 100%;
    h3 {
      text-align: center;
      font-size: 14px;
    }
    .modal-table {
      max-height: 500px;
      margin-top: 10px;
      .modal-table-top {
        overflow: hidden;
        height: 30px;
        line-height: 30px;
      }
    }
  }
}
.fotter {
  margin-top: 20px;
  button {
    margin-right: 30px;
  }
}
</style>

<template>
  <div id="Main">
    <!-- <h2 class="Title">数据集管理</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" class="form" :model="formData" :label-width="10">
          <div class="container">
            <div class="btn-left w18">
              <Form-item prop="name">
                <Input placeholder="请输入品牌名称" v-model="formData.name" clearable></Input>
              </Form-item>
            </div>
            <!-- <div class="btn-left w18">
                            <Form-item prop="brandId">
                                <Select v-model="formData.authorId" placeholder="请选择协作者" clearable>
                                    <Option :value="item.userId" v-for="(item,index) in collaboratorList" :key="index">{{ item.userName }}</Option>
                                </Select>
                            </Form-item>
            </div>-->
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
          <addNewBtn class="btn-right" title="新建" @btnClick="showModel"/>
          <exportBtn class="btn-right" title="导出品牌信息" @btnClick="exportBrand"/>
          <exportBtn class="btn-right" title="导出产品类别" @btnClick="exportProductShow = true"/>
          <importBtn class="btn-right" title="导入" @btnClick="showImportBrand = true"/>
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
    <!-- 新建/修改品牌 -->
    <myModal class="myModal" @close="closeModel" width="600" :modal="addShow">
      <div slot="main" class="modal-main">
        <div class="header">{{ type == 'add' ? '新建品牌' : '修改品牌'}}</div>
        <div class="modal-table">
          <Form ref="form" class="model-form" :label-width="10">
            <Form-item required>
              <div class="item-box">
                <div class="left">品牌编号:</div>
                <div class="right">
                  <Input
                    clearable
                    v-model.trim="addData.code"
                    style="width:200px;"
                    placeholder="限20个字符以内"
                  ></Input>
                </div>
              </div>
            </Form-item>
            <Form-item required>
              <div class="item-box">
                <div class="left">品牌名称:</div>
                <div class="right">
                  <Input
                    clearable
                    v-model.trim="addData.name"
                    style="width:200px;"
                    placeholder="限20个字符以内"
                  />
                </div>
              </div>
            </Form-item>
            <!-- <Form-item required>
              <div class="item-box">
                <div class="left">
                  <p>关联类别:</p>
                  <p>(共 {{ allLabelList.length }} 个)</p>
                  <p class="tool" @click="showRelation">编辑</p>
                </div>
                <div class="right">
                  <Input
                    clearable
                    v-model.trim="addData.labelData"
                    type="textarea"
                    readonly
                    :rows="4"
                  ></Input>
                </div>
              </div>
            </Form-item>-->
            <Form-item required>
              <div class="item-box">
                <div class="left">备注信息:</div>
                <div class="right">
                  <Input
                    clearable
                    v-model.trim="addData.memo"
                    type="textarea"
                    :rows="4"
                    placeholder="限100个字符以内"
                  />
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

    <!-- 导出产品类别 -->
    <myModal class="myModal" @close="closeModel" width="600" :modal="exportProductShow">
      <div slot="main" class="modal-main">
        <div class="header">导出产品类别</div>
        <div class="modal-table">
          <div class="boxs">
            <Form ref="form" class="form" :model="formData" :label-width="10">
              <div class="container" style="width:60%;">
                <div class="btn-left w18">
                  <Form-item prop="userName">
                    <Input clearable placeholder="请输入品牌名称" v-model.trim="peopleData.name"/>
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
                待选品牌
                <Checkbox v-model="exportSelectAll" @on-change="exportSelectAllMethod">全选</Checkbox>
              </div>
              <div class="select-box-main">
                <CheckboxGroup
                  v-model="selectPeopleList"
                  @on-change="peopleChange"
                  style="margin-left:30px;"
                >
                  <div class="selected-box">
                    <div
                      class="item"
                      v-for="(item,index) in filterPeopleList"
                      :key="index + item.id"
                    >
                      <Checkbox :disabled="type == 'look'" :label="item.id">
                        <span>{{ item.name }}</span>
                      </Checkbox>
                    </div>
                  </div>
                </CheckboxGroup>
              </div>
            </div>
            <div class="right">
              <div class="title">已选品牌</div>
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
          <Button
            v-if="type != 'look'"
            @click="savePeople"
            type="primary"
            style="padding:2px 20px;"
          >导出</Button>
        </div>
      </div>
    </myModal>

    <!-- 关联标签 -->
    <myModal
      class="myModal"
      @close="relationlabelShow = false"
      width="740"
      :modal="relationlabelShow"
    >
      <div slot="main" class="modal-main">
        <div class="header">关联标签</div>
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
                <div class="btn-left w18" style="width:33.3333%;">
                  <Form-item prop="name">
                    <Input placeholder="品牌名称" disabled readonly v-model="labelData.brandName"/>
                  </Form-item>
                </div>
                <div class="btn-left w18" style="width:33.3333%;">
                  <Form-item prop="labelName">
                    <Input placeholder="请输入产品类别" v-model="labelData.name" clearable/>
                  </Form-item>
                </div>
                <!-- <div class="btn-left w18" style="width:33.3333%;">
                                            <Form-item prop="articleName">
                                                <Input placeholder="请输入物体名称" v-model="labelData.articleName" clearable></Input>
                                            </Form-item>
                </div>-->
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
                待选类别
                <Checkbox v-model="labelSelectAll" @on-change="labelSelectAllMethod">全选</Checkbox>
              </div>
              <div class="select-box-main">
                <CheckboxGroup
                  v-model="selectedLableList"
                  @on-change="labelChange"
                  style="margin-left:30px;"
                >
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
              <div class="title">已选类别</div>
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
    <myModal
      class="myModal"
      @close="showRelationLabel = false"
      width="600"
      :modal="showRelationLabel"
    >
      <div slot="main" class="modal-main">
        <div class="modal-table" style="margin:0;">
          <Table
            :columns="lableColumns"
            :height="relationLabelData.length > 8 ? '520' : ''"
            :data="relationLabelData"
          ></Table>
        </div>
      </div>
    </myModal>

    <!-- 查看协助人数 -->
    <myModal class="myModal" @close="showPeople = false" width="500" :modal="showPeople">
      <div slot="main" class="modal-main">
        <div class="modal-table" style="margin:0;">
          <Table
            :columns="peopleColumns"
            :height="peopleDataList.length > 8 ? '520' : ''"
            :data="peopleDataList"
          ></Table>
        </div>
      </div>
    </myModal>

    <!--品牌导入 -->
    <myModal class="myModal" @close="closeModal" :modal="showImportBrand">
      <div slot="main" class="modal-main" style="padding:10px;">
        <h3>品牌导入</h3>
        <div class="modal-table">
          <Form ref="form" :label-width="88">
            <div style="overflow:hidden;">
              <div class="upDate">
                <Upload
                  :action="importUrl"
                  :show-upload-list="false"
                  :on-success="brandHandleSuccess"
                  :on-error="handleError"
                >
                  <Icon type="ios-folder" size="14" color="#53a3f4"></Icon>
                  <span>{{ importBrandData.uploadText }}</span>
                </Upload>
              </div>
            </div>
            <div class="fotter" style="text-align:center;">
              <Button @click="closeModal" type="primary">取消</Button>
              <Button @click="importExcel" type="success">导入</Button>
            </div>
          </Form>
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
import importBtn from "@/components/Button/import-btn.vue";
import addNewBtn from "@/components/Button/addNew-btn.vue";
import PROJECT_CONFIG from "@/util/config.js";
import { dataSetStatus } from "@/util/ENUMS.js";
import config from "@/util/config.js";
export default {
  name: "brand-manage",
  components: {
    exportBtn,
    hhTable,
    myModal,
    fieldNameDes,
    addNewBtn,
    importBtn
  },
  data() {
    return {
      importUrl: config.uploadFile,
      showImportBrand: false,
      importBrandData: {
        loadFilePath: "",
        uploadText: "请选择上传文件"
      },
      exportSelectAll: false,
      allBrandList: [],
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
      lableColumns: [
        {
          title: "类别编号",
          key: "categoryTypeCode",
          tooltip: true,
          width: 300,
          align: "center"
        },
        {
          title: "类别名称",
          key: "categoryTypeName",
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
          title: "品牌编号",
          key: "code",
          align: "center",
          tooltip: true
        },
        {
          title: "品牌名称",
          key: "name",
          align: "center",
          tooltip: true
        },
        {
          title: "关联类别",
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
                          brandId: params.row.id
                          // brandName: params.row.name
                        };
                        this.Global.doPost(
                          "brandCategory/doCategoryCount.json",
                          data,
                          res => {
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
            tag.push(
              h(
                "a",
                {
                  style: {
                    textDecoration: "underline",
                    display:
                      params.row.imageNum == 0 || params.row.imageNum
                        ? "inline"
                        : "none"
                  },
                  on: {
                    click: () => {
                      this.Global.doPost(
                        "brandCategory/doQueryAll.json",
                        {
                          brandId: params.row.id
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
            tag.push(
              h(
                "a",
                {
                  style: {
                    textDecoration: "underline",
                    display:
                      params.row.imageNum == 0 || params.row.imageNum
                        ? "inline"
                        : "none"
                  },
                  on: {
                    click: () => {
                      let query = {
                        brandId: params.row.id
                      };
                      this.$router.push({
                        path: "/categoryManagement",
                        query
                      });
                    }
                  }
                },
                "[管理]"
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
            return h("div", dataSetStatus[params.row.status]);
          }
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
                          "brandCategory/doQueryAll.json",
                          {
                            brandId: params.row.id
                          },
                          res => {
                            this.addData.name = params.row.name;
                            this.addData.code = params.row.code;
                            this.addData.memo = params.row.memo;
                            this.addData.id = params.row.id;
                            let arr = [];
                            this.selectedLableList = [];
                            this.selectLabelList = [];
                            res.forEach(item => {
                              arr.push(item.categoryTypeName);
                              this.selectedLableList.push(item.categoryTypeId);
                              this.selectLabelList.push(item.categoryTypeName);
                            });
                            this.addData.labelData = arr.join();
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
                          }该数据集？`,
                          onOk: () => {
                            let data = {
                              status: params.row.status == 1 ? 0 : 1,
                              id: params.row.id
                            };
                            this.Global.doPost(
                              "brand/doDelete.json",
                              params.row.id,
                              res => {
                                this.$Message.success("弃用成功");
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
      exportProductShow: false,
      peopleData: {},
      filterPeopleList: [],
      selectPeopleList: [],
      selectedPeopleList: [],
      //关联标签
      labelData: {},
      relationlabelShow: false,
      allLabelList: [], //所有的标签列表
      filterLabelList: [], //筛选过的标签
      selectedLableList: [], //已选择的标签列表
      selectLabelList: [],
      //上传文件
      uploadData: []
    };
  },
  created() {
    //查询协作者数据
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

    showImportBrand(val) {
      if (!val) {
        this.importBrandData.uploadText = "请选择上传文件";
        this.importBrandData.loadFilePath = "";
      }
    },
    exportProductShow(val) {
      if (!val) {
        this.peopleData = {};
        this.selectPeopleList = [];
        this.selectedPeopleList = [];
      } else {
        this.Global.doPost("brand/doQueryAll.json", { status: 1 }, res => {
          console.log(res);
          this.allBrandList = res;
          this.filterPeopleList = JSON.parse(JSON.stringify(this.allBrandList));
        });
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
    this.queryAllLabelList();
  },
  methods: {
    handleError() {},
    brandHandleSuccess(response, file, fileList) {
      this.importBrandData.uploadText = file.name;
      var url = response.data;
      if (url) {
        this.importBrandData.loadFilePath = url;
      }
    },
    importExcel() {
      if (!this.importBrandData.loadFilePath) {
        this.$Message.info("请选择上传文件");
        return false;
      }
      this.Global.doPost(
        "brand/brandInfoImport.json",
        {
          loadFilePath: this.importBrandData.loadFilePath
        },
        res => {
          this.$Message.success("导入成功");
          this.showImportBrand = false;
          this.init();
        }
      );
    },
    closeModal() {
      this.showImportBrand = false;
    },
    exportSelectAllMethod(val) {
      this.selectPeopleList = [];
      this.selectedPeopleList = [];
      if (val) {
        this.allBrandList.forEach(item => {
          this.selectPeopleList.push(item.id);
          this.selectedPeopleList.push(item.name);
        });
      }
    },
    queryAllBrandList() {
      this.Global.doPost("brand/doQueryAll.json", { status: 1 }, res => {
        console.log(res);
        this.allBrandList = res;
      });
    },
    exportBrand() {
      let data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      data["status"] = 1;
      let url = this.Global.getExportUrl("brand/doBrandExport.json", data);
      window.open(url);
    },
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
        this.$Message.info("请选择导出的品牌");
        return false;
      }
      //   data["id"] = this.peopleData.id;
      //   data["name"] = this.peopleData.name;
      let list = [];
      this.selectPeopleList.forEach(item => {
        this.allBrandList.forEach(val => {
          if (item == val.id) {
            list.push(item);
          }
        });
      });
      data["brandIds"] = list;
      let url = this.Global.getExportUrl(
        "brandCategory/doBrandCategoryExport.json",
        data
      );
      window.open(url);
    },
    filterPeople() {
      let data = this.Global.JsonChange(this.peopleData);
      this.Global.deleteEmptyProperty(data);
      delete data["id"];
      data["status"] = 1;
      this.Global.doPost("brand/doQueryAll.json", data, res => {
        this.filterPeopleList = res;
      });
    },
    peopleChange(val) {
      this.selectedPeopleList = [];
      if (val && val.length) {
        val.forEach(item => {
          this.allBrandList.forEach(v => {
            if (item == v.id) {
              this.selectedPeopleList.push(v.name);
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
          this.allLabelList.forEach(val => {
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
        name: this.labelData.name,
        status: 1
      };
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost("categoryType/doQueryAll.json", data, res => {
        this.filterLabelList = res;
      });
    },
    // 保存
    save() {
      if (!this.addData.name) {
        this.$Message.info("请填写品牌名称");
        return false;
      }
      if (this.addData.name.length > 20) {
        this.$Message.info("品牌名称在20个字符以内");
        return false;
      }
      if (!this.addData.code) {
        this.$Message.info("请填写品牌编号");
        return false;
      }
      let data = {
        name: this.addData.name,
        code: this.addData.code,
        memo: this.addData.memo
      };
      this.Global.deleteEmptyProperty(data);
      let api = "";
      if (this.type == "modify") {
        data["id"] = this.addData.id;
        api = "brand/doUpdate.json";
      } else {
        api = "brand/doSave.json";
      }
      let list = [];
      this.selectedLableList.forEach(item => {
        list.push(item);
      });
      data["categoryTypeIds"] = list;
      this.Global.doPost(api, data, res => {
        this.init();
        this.$Message.success(this.type == "add" ? "新建成功" : "修改成功");
        this.addShow = false;
      });
    },
    // 查询所有类别
    queryAllLabelList() {
      this.Global.doPost("categoryType/doQueryAll.json", { status: 1 }, res => {
        this.allLabelList = res;
      });
    },
    showRelation() {
      if (!this.addData.name) {
        this.$Message.info("请填写数品牌名称");
        return false;
      }
      this.labelData.brandName = this.addData.name;
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
      this.uploadShow = false;
      this.exportProductShow = false;
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
      this.Global.doPost("brand/doQueryWithPage.json", data, res => {
        this.pageData = res.datalist;
        this.pageNum = res.items;
        this.page = res.page;
        this.noneStatus = true;
      });
    }
  }
};
</script>
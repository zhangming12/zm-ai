
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
    <!-- <h2 class="Title">数据集管理</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" class="form" :model="formData" :label-width="10">
          <div class="container">
            <div class="btn-left w18">
              <Form-item prop="name">
                <Input placeholder="请输入数据集名称" v-model="formData.name" clearable></Input>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item prop="brandId">
                <Select v-model="formData.authorId" placeholder="请选择协作者" clearable>
                  <Option
                    :value="item.userId"
                    v-for="(item,index) in collaboratorList"
                    :key="index"
                  >{{ item.userName }}</Option>
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
    <!-- 新建/修改数据集 -->
    <myModal class="myModal" @close="closeModel" width="600" :modal="addShow">
      <div slot="main" class="modal-main">
        <div class="header">{{ type == 'add' ? '新建数据集' : '修改数据集'}}</div>
        <div class="modal-table">
          <Form ref="form" class="model-form" :label-width="10">
            <Form-item required>
              <div class="item-box">
                <div class="left">数据集名称:</div>
                <div class="right">
                  <Input
                    clearable
                    v-model.trim="addData.name"
                    style="width:200px;"
                    placeholder="限20个字符以内"
                  ></Input>
                </div>
              </div>
            </Form-item>
            <!-- <Form-item required>
              <div class="item-box">
                <div class="left">
                  <p>关联标签:</p>
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
                  ></Input>
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
    <!-- 上传文件 -->
    <myModal class="myModal" @close="closeModel" width="580" :modal="uploadShow">
      <div slot="main" class="modal-main">
        <div class="header">上传文件</div>
        <div class="modal-table" style="flex-direction:row;justify-content:flex-start;">
          <div class="upload-list" v-for="(item,index) in uploadList" :key="index">
            <template v-if="item.status === 'finished'">
              <img src="@/assets/image/zip.png">
              <div class="upload-list-cover">
                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
              </div>
            </template>
            <template v-else>
              <div class="progress-box">
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                <p
                  style="position:absolute;top:40px;text-align:center;width:100px;"
                >{{ item.size * item.percentage/100 | sizeFilter }}/{{ item.size | sizeFilter }}</p>
              </div>
            </template>
            <div class="name-box">{{ item.name }}</div>
          </div>
          <Upload
            v-show="uploadList.length < 5"
            ref="upload"
            :data="upData"
            :show-upload-list="false"
            :default-file-list="defaultList"
            :on-success="handleSuccess"
            :format="['zip']"
            :max-size="204800"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            multiple
            type="drag"
            :action="uploadFilePath"
            style="display: inline-block;width:100px; margin-left:10px;"
          >
            <div style="width: 100px;height:100px;line-height: 100px;">
              <Icon type="md-add" size="20"/>
            </div>
          </Upload>
        </div>
        <div class="footer">
          <Button
            :disabled="uploadList.length < 1"
            style="padding:4px 20px;"
            @click="uploadFile"
            type="primary"
          >上传</Button>
        </div>
        <div class="info-box">
          <p>1.支持文件格式：zip压缩包，大小限制在200M以内；</p>
          <p>2.单次上传限制5个；</p>
          <p>3.支持图片格式：jpg</p>
          <p>4.若上传失败，请稍候重试</p>
        </div>
      </div>
    </myModal>

    <!-- 协作人 -->
    <myModal class="myModal" @close="closeModel" width="600" :modal="peopleShow">
      <div slot="main" class="modal-main">
        <div class="header">协作人</div>
        <div class="modal-table">
          <div class="boxs">
            <Form ref="form" class="form" :model="peopleData" :label-width="10">
              <div class="container" style="width:80%;">
                <div class="btn-left w18" style="width:33.33%;">
                  <Form-item prop="userId">
                    <Select v-model="peopleData.companyId" placeholder="请选择公司" clearable>
                      <Option
                        :value="item.id"
                        v-for="item in companyList"
                        :key="item.id"
                      >{{ item.name }}</Option>
                    </Select>
                  </Form-item>
                </div>
                <div class="btn-left w18" style="width:33.33%;">
                  <Form-item prop="userId">
                    <Input clearable placeholder="请输入用户名称" v-model.trim="peopleData.userName"></Input>
                  </Form-item>
                </div>
                <div class="btn-left w18" style="width:33.33%;">
                  <Form-item prop="userId">
                    <Input clearable placeholder="请输入手机号" v-model.trim="peopleData.phone"></Input>
                  </Form-item>
                </div>
              </div>
              <div class="btn-right w10">
                <div class="searchBox">
                  <div class="btn-right search-right">
                    <Button shape="circle" @click="filterPeople" icon="ios-search" type="primary">搜索</Button>
                  </div>
                </div>
              </div>
            </Form>
          </div>
          <div class="select-box">
            <div class="left">
              <div class="title">待选人员</div>
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
                      :key="index + item.userId"
                    >
                      <Checkbox :disabled="type == 'look'" :label="item.userId">
                        <span>{{ item.userName }}</span>
                      </Checkbox>
                    </div>
                  </div>
                </CheckboxGroup>
              </div>
            </div>
            <div class="right">
              <div class="title">已选人员</div>
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
          >确定</Button>
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
                    <Input placeholder="数据集名称" disabled readonly v-model="labelData.name"></Input>
                  </Form-item>
                </div>
                <div class="btn-left w18" style="width:33.3333%;">
                  <Form-item prop="labelName">
                    <Input placeholder="请输入标签名称" v-model="labelData.labelName" clearable></Input>
                  </Form-item>
                </div>
                <div class="btn-left w18" style="width:33.3333%;">
                  <Form-item prop="articleName">
                    <Input placeholder="请输入物体名称" v-model="labelData.articleName" clearable></Input>
                  </Form-item>
                </div>
              </div>
              <div class="btn-right w10">
                <div class="searchBox">
                  <div class="btn-right search-right">
                    <Button shape="circle" @click="filterLabel" icon="ios-search" type="primary">搜索</Button>
                  </div>
                </div>
              </div>
            </Form>
          </div>
          <div class="select-box">
            <div class="left">
              <div class="title">
                待选标签
                <Checkbox v-model="labelSelectAll" @on-change="labelSelectAllMethod">全选</Checkbox>
              </div>
              <div class="select-box-main">
                <CheckboxGroup
                  v-model="selectedLableList"
                  @on-change="labelChange"
                  style="margin-left:30px;"
                >
                  <div class="selected-box">
                    <div
                      class="item"
                      v-for="(item,index) in filterLabelList"
                      :key="index"
                      v-if="index < 10"
                    >
                      <Checkbox :label="item.id">
                        <span>{{ item.articleName }}</span>
                      </Checkbox>
                    </div>
                  </div>
                </CheckboxGroup>
              </div>
            </div>
            <div class="right">
              <div class="title">已选标签 ({{selectLabelList.length }}个)</div>
              <div class="select-box-main">
                <CheckboxGroup v-model="selectLabelList" style="margin-left:30px;">
                  <div class="selected-box">
                    <div
                      class="item"
                      v-for="(item,index) in selectLabelList"
                      :key="index"
                      v-if="index < 10"
                    >
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
      companyList: [], //公司列表
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
                      let query = {
                        id: params.row.id
                      };
                      this.$router.push({
                        path: "/labelManage",
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
          title: "图片数",
          key: "pictureCount",
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
                      params.row.pictureCount != 0 && !params.row.pictureCount
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
                          "dataSet/doDataPictureCount.json",
                          data,
                          res => {
                            this.$set(params.row, "pictureCount", res);
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
                      params.row.pictureCount == 0 || params.row.pictureCount
                        ? "inline"
                        : "none"
                  }
                },
                params.row.pictureCount
              )
            );
            tag.push(
              h(
                "a",
                {
                  style: {
                    textDecoration: "underline",
                    display:
                      params.row.pictureCount == 0 || params.row.pictureCount
                        ? "inline"
                        : "none"
                  },
                  on: {
                    click: () => {
                      let query = {
                        id: params.row.id,
                        name: params.row.name
                      };
                      this.$router.push({
                        path: "imageOverlays",
                        query
                      });
                    }
                  }
                },
                "[跳转标注]"
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
          title: "协助人数",
          key: "userCount",
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
                      params.row.userCount != 0 && !params.row.userCount
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
                          "dataSet/doDataUserCount.json",
                          data,
                          res => {
                            this.$set(params.row, "userCount", res);
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
                      params.row.userCount == 0 || params.row.userCount
                        ? "inline"
                        : "none"
                  }
                },
                params.row.userCount
              )
            );
            tag.push(
              h(
                "a",
                {
                  style: {
                    textDecoration: "underline",
                    display:
                      params.row.userCount == 0 || params.row.userCount
                        ? "inline"
                        : "none"
                  },
                  on: {
                    click: () => {
                      this.peopleDataList = [];
                      this.Global.doPost(
                        "dataUser/doQueryAll.json",
                        {
                          dataId: params.row.id,
                          type: 1
                        },
                        res => {
                          console.log(res);

                          this.peopleDataList = res;

                          this.showPeople = true;
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
                    content: "协作人",
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
                        this.type = "modify";
                        this.Global.doPost(
                          "dataUser/doQueryAll.json",
                          {
                            dataId: params.row.id,
                            type: 1
                          },
                          res => {
                            this.peopleData.id = params.row.id;
                            this.peopleData.name = params.row.name;
                            this.selectPeopleList = [];
                            this.selectedPeopleList = [];
                            if (res && res.length) {
                              res.forEach(item => {
                                this.selectPeopleList.push(item.userId + "");
                                this.selectedPeopleList.push(item.userName);
                              });
                            }
                            this.peopleShow = true;
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
                    content: "上传文件",
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
                      icon: "ios-folder-outline",
                      type: "default"
                    },
                    on: {
                      click: () => {
                        this.uploadData.dataId = params.row.id;
                        this.uploadShow = true;
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
                      type: "default"
                    },
                    on: {
                      click: () => {
                        this.type = "modify";
                        this.addData.name = params.row.name;
                        this.addData.memo = params.row.memo;
                        this.addData.id = params.row.id;
                        this.addShow = true;
                        return;
                        this.Global.doPost(
                          "dataLabel/doQueryDataLabeledList.json",
                          {
                            dataId: params.row.id
                          },
                          res => {
                            this.addData.name = params.row.name;
                            this.addData.memo = params.row.memo;
                            this.addData.id = params.row.id;
                            // let arr = [];
                            // let arr1 = [];
                            // let arr2 = [];
                            // this.selectedLableList = [];
                            // this.selectLabelList = [];
                            // res.forEach(item => {
                            //   arr.push(item.articleName);
                            //   arr1.push(item.labelId);
                            //   arr2.push(item.articleName);
                            // });
                            // this.selectedLableList.push(...arr1);
                            // this.selectLabelList.push(...arr2);
                            // this.addData.labelData = arr.join();
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
                              "dataSet/doDelete.json",
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
              ),
              h(
                "Tooltip",
                {
                  attrs: {
                    content: "导出数据集标签",
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
                      icon: "ios-log-out",
                      type: "default"
                    },
                    on: {
                      click: () => {
                        let data = {
                          dataId: params.row.id
                        };
                        let url = this.Global.getExportUrl(
                          "dataLabel/doDataLabeledExport.json",
                          data
                        );
                        window.open(url);
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
    this.queryAllLabelList();
    this.queryCompanyList();
  },
  methods: {
    //查询所有公司
    queryCompanyList() {
      let data = {
        status: 1,
        needCount: false
      };
      this.Global.doPost("company/doQueryWithPage.json", data, res => {
        console.log(res.datalist);
        this.companyList = res.datalist;
      });
    },
    labelSelectAllMethod(val) {
      if (val) {
        this.selectedLableList = [];
        this.selectLabelList = [];
        this.filterLabelList.forEach(item => {
          this.selectedLableList.push(item.id);
          this.selectLabelList.push(item.articleName);
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
      let arr = [];
      if (val && val.length) {
        val.forEach(item => {
          this.allLabelList.forEach(val => {
            if (item == val.id) {
              arr.push(val.articleName);
              // this.selectLabelList.push(val.articleName);
            }
          });
        });
      }
      this.selectLabelList = arr;
    },
    // 筛选标签
    filterLabel() {
      let data = {
        labelName: this.labelData.labelName,
        articleName: this.labelData.articleName,
        status: 1
      };
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost("label/doQueryAll.json", data, res => {
        this.filterLabelList = res;
      });
    },
    // 保存
    save() {
      if (!this.addData.name) {
        this.$Message.info("请填写数据集名称");
        return false;
      }
      if (this.addData.name.length > 20) {
        this.$Message.info("数据集名称在20个字符以内");
        return false;
      }
      // if (!this.addData.labelData) {
      //   this.$Message.info("请选择标签");
      //   return false;
      // }
      let data = {
        name: this.addData.name,
        memo: this.addData.memo
      };
      this.Global.deleteEmptyProperty(data);
      let api = "";
      if (this.type == "modify") {
        data["id"] = this.addData.id;
        api = "dataSet/doUpdate.json";
      } else {
        api = "dataSet/doSave.json";
      }
      // let list = [];
      // this.selectedLableList.forEach(item => {
      //   list.push({
      //     id: item
      //   });
      // });
      // data["labelFormList"] = list;
      this.Global.doPost(api, data, res => {
        this.init();
        this.$Message.success(this.type == "add" ? "新建成功" : "修改成功");
        this.addShow = false;
      });
    },
    // 查询所有标签列表
    queryAllLabelList() {
      this.Global.doPost("label/doQueryAll.json", { status: 1 }, res => {
        this.allLabelList = res;
      });
    },
    showRelation() {
      if (!this.addData.name) {
        this.$Message.info("请填写数据集名称");
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
      this.Global.doPost("dataSet/queryDataSetList.json", data, res => {
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
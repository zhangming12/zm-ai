<style lang="less" scoped>
@import "../../config/index.less";
#Main {
  min-height: 100%;
  background-color: white;
  margin-left: 10px;
  .form {
    position: relative;
    display: flex;
    align-items: center;
    .container {
      width: 70%;
      .w18 {
        width: 50%;
      }
    }
    .w10 {
      width: 20%;
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
.btn-box {
  overflow: hidden;
}
.imageListBox {
  display: flex;
  justify-content: center;
}
.name-box {
  height: 20px;
  line-height: 20px;
  text-align: center;
}
.canvas-box {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  .left-box {
    min-width: 600px;
    width: 100%;
    display: flex;
    flex-direction: row;
    // margin-right: 30px;
    padding-right: 30px;
    .worker-box {
      width: calc(~"100% - 80px");
      height: 100%;
      #canvas-container {
        // height: 400px;
        height: 100%;
        // min-height:650px;
        display: block;
        overflow: auto;
        position: relative;
        outline: 1px solid #e5e5e5;
        #work-canvas {
          position: absolute;
          z-index: 1;
          .tooltip {
            position: absolute;
            width: 250px;
            min-height: 100px;
            border: 1px solid #e5e5e5;
            background-color: white;
            border-radius: 4px;
            padding: 10px;
            .btn-box {
              margin-top: 15px;
              text-align: right;
            }
            .select-box {
              border: 1px solid #e5e5e5;
              min-height: 30px;
              max-height: 90px;
              overflow-y: auto;
              margin-top: 15px;
              ul {
                li {
                  line-height: 30px;
                  margin-left: 20px;
                  cursor: pointer;
                }
              }
            }
          }
        }
      }
    }
    .left,
    .right {
      position: relative;
      width: 40px;
      .icon-box {
        display: inline-block;
        position: absolute;
        cursor: pointer;
        top: 280px;
        margin-left: 5px;
      }
      .fun-box {
        cursor: pointer;
        width: 40px;
        height: 30px;
        margin-bottom: 15px;
        position: relative;
        img {
          display: block;
          width: 30px;
          height: 30px;
          margin-left: 5px;
        }
        .light-box {
          position: absolute;
          z-index: 100;
          width: 200px;
          height: 40px;
          top: -30%;
          left: 100%;
          padding: 0 10px;
          // border: 1px solid #e5e5e5;
          border-radius: 4px;
          background-color: #e5e5e5;
        }
      }
    }
  }
  .right-box {
    padding-right: 10px;
  }
}
.main-container {
  display: flex;
  flex-direction: column;
  padding-bottom: 0 !important;
}
.main-containers {
  padding-bottom: 0 !important;
  display: flex;
  flex-direction: row;
  position: relative;
  flex: auto;
  .main-left,
  .main-right {
    height: 100%;
    .box {
      width: 100%;
      min-width: 200px;
    }
  }
  .main-right {
    padding-left: 30px;
    width: 500px !important;
  }
  .main-left {
    flex: 1;
    .btn-boxs {
      position: absolute;
      bottom: 10px;
      right: 500px;
    }
  }
}
.info {
  line-height: 32px;
}
.box {
  height: 43px;
}
</style>

<template>
  <div id="Main" @keydown="keyChange">
    <div class="main-container">
      <div class="box">
        <Form ref="form" :model="formData" :label-width="10">
          <div class="container">
            <div class="btn-left w18">
              <Form-item prop="startTime" required>
                <data-range
                  placeholder="开始时间"
                  @dataChange="startTimeChange"
                  hour="00:00"
                  :time="formData.startTime"
                  start
                ></data-range>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item prop="endTime" required>
                <data-range
                  hour="24:00"
                  placeholder="结束时间"
                  @dataChange="endTimeChange"
                  :time="formData.endTime"
                ></data-range>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item required>
                <Select v-model="formData.companyId" placeholder="公司" @on-change="changeValue">
                  <Option
                    :value="item.id"
                    v-for="(item,index) in companyList"
                    :key="index"
                  >{{ item.name }}</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item prop="dataId" required>
                <Select
                  v-model="formData.dataId"
                  placeholder="请选择数据集名称"
                  @on-change="queryLabelList"
                >
                  <Option
                    :value="item.id"
                    v-for="(item,index) in dataNameList"
                    :key="index"
                  >{{ item.name }}</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item required>
                <Select v-model="formData.userId" placeholder="人员" clearable>
                  <Option
                    :value="item.userId"
                    v-for="(item,index) in peopleList"
                    :key="index"
                  >{{ item.userName }}</Option>
                </Select>
              </Form-item>
            </div>

            <div class="btn-left w10">
              <div class="searchBox">
                <div class="btn-right search-right" @click="submit('search')">
                  <Button shape="circle" icon="ios-search" type="primary">搜索</Button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </div>
      <div class="main-containers">
        <div class="main-left">
          <div class="box canvas-box">
            <div class="left-box">
              <div class="left">
                <div class="icon-box" @click="beforeImage(false)">
                  <Tooltip content="上一张">
                    <Icon class="icon" type="ios-arrow-dropleft" size="30"/>
                  </Tooltip>
                </div>
              </div>
              <div class="worker-box">
                <div id="canvas-container">
                  <img id="img" :src="imgSelected.src">
                  <div id="work-canvas">
                    <div class="tooltip" v-if="showTooltip">
                      <Input placeholder="请输入标签名称" v-model="label" clearable/>
                      <div class="btn-box">
                        <Button type="info" @click="cancel">取消</Button>
                        <Button type="primary" @click="sureClick">确定</Button>
                      </div>
                      <div class="select-box">
                        <ul>
                          <li
                            v-for="(item,index) in filterList"
                            :key="index"
                            @click="lableClick(item)"
                          >{{ item.articleName }}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="name-box">
                  {{ imgSelected.name }}(当前第
                  <span class="numColor">{{ imgSelected.index + 1 }}</span>张)
                </div>
              </div>
              <div class="right">
                <div class="fun-box">
                  <Tooltip content="放大">
                    <Button style="padding:0; margin-left:5px;" @click="zoom('add')" type="default">
                      <Icon type="ios-add-circle-outline" size="28"/>
                    </Button>
                  </Tooltip>
                </div>
                <div class="fun-box">
                  <Tooltip content="缩小">
                    <Button
                      style="padding:0; margin-left:5px;"
                      type="default"
                      @click="zoom('reduce')"
                    >
                      <Icon type="ios-remove-circle-outline" size="28"/>
                    </Button>
                  </Tooltip>
                </div>
                <div class="fun-box" @click="startLabel('label')">
                  <Tooltip content="标注">
                    <img v-if="selectedTool" src="@/assets/image/clip-color.png">
                    <img v-else src="@/assets/image/clip.png">
                  </Tooltip>
                </div>
                <div class="fun-box" @click="startLabel('delete')">
                  <Tooltip content="删除">
                    <img src="@/assets/image/delete.png">
                  </Tooltip>
                </div>
                <div class="fun-box">
                  <Tooltip content="亮度">
                    <img
                      @click="startLabel('light')"
                      v-if="showLight"
                      src="@/assets/image/light-color.png"
                    >
                    <img @click="startLabel('light')" v-else src="@/assets/image/light.png">
                  </Tooltip>
                  <div class="light-box" v-if="showLight">
                    <Slider
                      v-model="appConfig.imageOpacity"
                      :step="0.1"
                      :min="0"
                      :max="2.0"
                      @on-change.self="changeFillOpacity"
                    ></Slider>
                  </div>
                </div>
                <div class="fun-box">
                  <Tooltip content="全屏">
                    <Button
                      v-if="!isfull"
                      style="padding:0; margin-left:5px;"
                      @click="launchFullscreen"
                      type="default"
                    >
                      <Icon type="ios-expand" size="28"/>
                    </Button>
                    <Button
                      v-else
                      style="padding:0; margin-left:5px;"
                      @click="exitFullscreen"
                      type="default"
                    >
                      <Icon type="ios-contract" size="28"/>
                    </Button>
                  </Tooltip>
                </div>
                <div class="icon-box" @click="nextImage(false)">
                  <Tooltip content="下一张">
                    <Icon class="icon" type="ios-arrow-dropright" size="30"/>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
          <div class="btn-boxs">
            <Button type="primary" class="btn-right" @click="saveImageLable('next')">保存</Button>
          </div>
        </div>
        <div class="main-right">
          <div class="imageListBox" style="margin-bottom:20px;" v-if="imageList.length">
            <imageTagsPages
              v-if="childData"
              @moveImageRight="nextImage(false)"
              @moveImageLeft="beforeImage(false)"
              @imageClick="changeImage"
              class="imageTagsPages"
              :imageList="imageList"
            />
          </div>
          <div class="right-box" v-if="imageList.length">
            <Table
              ref="table"
              @on-row-click="rowClick"
              :data="pageData"
              disabled-hover
              :height="pageData.length >= 8 ? '400' : ''"
              :columns="columns"
              @on-filter-change="filterChange"
            ></Table>
            <p style="margin:10px 0 0 10px;">
              共
              <span class="numColor">{{ pageData.length }}</span>
              个标签
            </p>
            <p style="margin:10px 0 0 10px;">
              审核人:
              <span class="numColor">{{ auditorName }}</span>
            </p>
          </div>
          <div class="box" v-else style="text-align:center;line-height:200px;">暂无数据</div>
        </div>
      </div>
      <div class="box info">
        <Row>
          <Col span="3" offset="1">{{ comOrUserName }}</Col>
          <Col span="2" offset="1">复审：</Col>
          <Col span="2">{{ reviewNum }}/{{ totalNum }}张</Col>
          <Col span="2">{{totalNum == 0 ? 0 : (reviewNum * 100 / totalNum).toFixed(2) }}%</Col>
          <Col span="2" offset="1">通过/退回</Col>
          <Col span="2">{{ successNum }}/{{ backNum }}张</Col>
          <Col span="2">{{backNum == 0 ? 0 : (successNum * 100 / backNum).toFixed(2) }}%</Col>
          <Col span="2" offset="2">
            <Button type="info" @click="passOrFailMethod(1)">通过</Button>
          </Col>
          <Col span="2">
            <Button type="primary" @click="passOrFailMethod(0)">退回</Button>
          </Col>
        </Row>
      </div>
    </div>
  </div>
</template>


<script>
import { TODAY_END, TODAY_START } from "@/util/index.js";
import dataRange from "@/components/data-rang.vue";
import { tools } from "@/tagUtil/tool.js";
import { imgNameOpt } from "@/tagUtil/util.js";
import {
  updateShapeDetailInStore,
  updateFeaturePointInStore,
  scaleFeaturePoints,
  getPointToDraw,
  attachPointToShape,
  attachShapeToImg,
  detachPoint,
  scaleShapePoints,
  indexOf
} from "@/tagUtil/util.js";
import imageTagsPages from "@/components/image-tags-pages.vue";

export default {
  name: "image-audit-out",
  data() {
    return {
      comOrUserName: "",
      start: {
        time: "",
        hour: "00:00"
      },
      end: {
        time: TODAY_END,
        hour: "24:00"
      },
      companyList: [],
      peopleList: [],
      formData: {
        startTime: TODAY_START,
        endTime: TODAY_END,
        brandId: "",
        groupId: "",
        activityId: "",
        userId: ""
      },
      childData: true,
      dataNameList: [], //数据集列表
      //表格数据开始
      pageData: [],
      //表格数据结束
      flag: false,
      id: "",
      label: "", //标签数据
      showLight: false, //显示改变亮度的
      showZoom: false, //显示放大缩小
      selectedTool: null,
      showTooltip: false,
      imageList: [],
      myCanvas: null,
      tools,
      appConfig: {
        zoomStepSize: 0.1,
        imageOpacity: 1,
        featurePointColor: "#ee0000"
      },
      highLightId: null,
      copiedElements: [],
      labellingData: {},
      alreadyDrawing: false,
      selectedElements: [],
      selectedElement: null,
      imgSelected: {},
      filterFlag: null,
      isfull: false,
      dataId: "", //数据集ID
      labelList: [], //标签列表
      imageLabelList: new Set(),
      auditorName: "",
      backNum: 0,
      reviewNum: 0,
      successNum: 0,
      totalNum: 0
    };
  },
  created() {
    //查询公司
    this.queryAllCompanylist();
  },
  components: {
    dataRange,
    imageTagsPages
  },
  computed: {
    columns() {
      let arr = [];
      let obj = {
        title: "物体名称",
        key: "articleName",
        align: "center",
        render: (h, params) => {
          return h(
            "div",
            {
              style: {
                color:
                  this.highLightId == params.row.id
                    ? "purple"
                    : params.row.warning
                    ? "red"
                    : ""
              }
            },
            params.row.articleName
          );
        },
        filterMultiple: true,
        filterMethod(value, row) {
          return value == row.articleName;
        }
      };
      let filter = [];
      // let imageLabelList = [...this.imageLabelList];
      this.imageLabelList.forEach(item => {
        filter.push({
          label: item,
          value: item
        });
      });
      obj.filters = filter;
      arr.push(obj);
      arr.push({
        title: "操作",
        width: 100,
        align: "center",
        render: (h, params) => {
          params.row.flag = false;
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
                    content: "确定删除该标签？",
                    onOk: () => {
                      this.detachShape(params.row.id);
                      this.alreadyDrawing = false;
                      this.flag = false;
                      this.id = "";
                      this.selectedElement = null;
                    }
                  });
                }
              }
            }),
            h("Button", {
              style: {
                fontSize: "24px",
                border: "none",
                padding: "0 4px",
                color: params.row.warning ? "red" : ""
              },
              attrs: {
                icon: "md-alert",
                type: "default"
              },
              on: {
                click: e => {
                  e.stopPropagation();
                  let id = params.row.id;
                  let index = null;
                  this.labellingData[this.imgSelected.name].shapes.forEach(
                    (item, i) => {
                      if (item.id == id) {
                        index = i;
                      }
                    }
                  );
                  let warning = params.row.warning;
                  this.labellingData[this.imgSelected.name].shapes[
                    index
                  ].warning = warning ? false : true;
                  this.mount();
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
      });
      return arr;
    },
    filterList() {
      if (!this.label) {
        return this.labelList;
      }
      return this.labelList.filter(item => {
        return item.articleName.indexOf(this.label) != -1;
      });
    }
  },
  mounted() {
    $(document).on("click", e => {
      if (this.selectedElement) {
        let id = this.selectedElement.node.id;
        this.id = id;
        let val = this.getPositions();
        if (val) {
          let { x, y } = val;
          this.flag = true;
          this.showTooltip = true;
          this.alreadyDrawing = false;
          this.deselectAll();
          this.selectedElements = [];
          this.selectedElement = null;
          this.$nextTick(() => {
            $(".tooltip").css({
              left: x + "px",
              top: y + "px"
            });
          });
        }
      }
      this.alreadyDrawing = false;
      // this.deselectAll();
      // this.selectedElements = [];
      // this.selectedElement = null;
    });
    let height = $(".main-containers").height();
    $("#canvas-container").css({ height: height - 80 + "px" });
    this.isfull = this.isFullScreen();
  },
  beforeDestory() {
    $(document).off("keyup");
    $(document).off("click");
  },

  filters: {
    nameFilter(val) {
      return imgNameOpt(val);
    }
  },
  watch: {},
  methods: {
    passOrFailMethod(type) {
      this.$Modal.confirm({
        title: "警告",
        content: `是否确定${type == 0 ? "退回" : "通过"}？`,
        onOk: () => {
          let data = {
            companyId: this.formData.companyId,
            userId: this.formData.userId,
            dataId: this.formData.dataId,
            type
          };
          data["startTime"] = this.Global.createTime(this.formData.startTime);
          if (this.start.hour == "24:00") {
            data["startTime"] = this.Global.setHoursData(
              this.start.time,
              this.start.hour
            );
          }

          data["endTime"] = this.Global.createTime(this.formData.endTime);
          if (this.end.hour == "24:00") {
            data["endTime"] = this.Global.setHoursData(
              this.end.time,
              this.end.hour
            );
          }
          this.Global.deleteEmptyProperty(data);
          this.Global.doPost("dataPictureRef/doCheckBack.json", data, res => {
            this.$Message.success("操作成功");
            this.init();
          });
        }
      });
    },
    //筛选公司名称
    queryCompanyName(companyId) {
      let companyName = "";
      this.companyList.forEach(item => {
        if (companyId == item.id) {
          companyName = item.name;
        }
      });
      return companyName;
    },
    //筛选用户名
    queryUserName(userId) {
      let userName = "";
      this.peopleList.forEach(item => {
        if (userId == item.userId) {
          userName = item.userName;
        }
      });
      return userName;
    },

    //查询通过率
    queryAccess() {
      let data = {
        companyId: this.formData.companyId,
        userId: this.formData.userId,
        dataId: this.formData.dataId
      };
      data["startTime"] = this.Global.createTime(this.formData.startTime);
      if (this.start.hour == "24:00") {
        data["startTime"] = this.Global.setHoursData(
          this.start.time,
          this.start.hour
        );
      }

      data["endTime"] = this.Global.createTime(this.formData.endTime);
      if (this.end.hour == "24:00") {
        data["endTime"] = this.Global.setHoursData(
          this.end.time,
          this.end.hour
        );
      }
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost("dataPictureRef/doReviewData.json", data, res => {
        this.backNum = res.backNum;
        this.reviewNum = res.reviewNum;
        this.successNum = res.successNum;
        this.totalNum = res.totalNum;
        if (this.formData.userId) {
          this.comOrUserName = this.queryUserName(this.formData.userId);
        } else {
          this.comOrUserName = this.queryCompanyName(this.formData.companyId);
        }
      });
    },
    queryAllCompanylist() {
      this.Global.doPost("company/doQueryAll.json", { status: 1 }, res => {
        this.companyList = res;
        if (res && res.length) {
          this.formData.companyId = res[0].id;
          this.changeValue(res[0].id);
        }
      });
    },
    startTimeChange(value) {
      this.start.hour = value.hour;
      this.start.time = value.time;
      if (value.hour == "24:00") {
        return;
      }
      this.formData.startTime = this.Global.setHoursData(
        value.time,
        value.hour
      );
    },
    endTimeChange(value) {
      this.end.hour = value.hour;
      this.end.time = value.time;
      if (value.hour == "24:00") {
        this.formData.endTime = value.time;
        return;
      }
      this.formData.endTime = this.Global.setHoursData(value.time, value.hour);
    },
    changeValue(val) {
      if (!val) return;
      //根据公司查询数据集
      let data = { companyId: val, status: 1 };
      this.Global.doPost(
        "dataUser/doQueryDataSetByCompanyId.json",
        data,
        res => {
          this.dataNameList = res;
          if (res && res.length) {
            this.formData.dataId = res[0].id;
            this.queryLabelList(this.formData.dataId);
            this.init();
          }
        }
      );
      //根据公司查询员工
      this.Global.doPost("user/doQueryUserByCompanyId.json", data, res => {
        this.peopleList = res;
      });
    },
    getIdIsWarning(id) {
      let data = this.pageData;
      let len = data.length;
      let flag = false;
      for (let i = 0; i < len; i++) {
        if (data[i].id == id) {
          if (data[i].warning) {
            flag = true;
            return flag;
          }
        }
      }
      return flag;
    },
    getImageScale(width, height) {
      let h = $("#canvas-container").height();
      let w = $("#canvas-container").width();
      return Math.min(w / width, h / height);
    },
    isFullScreen() {
      return (
        document.isFullScreen ||
        document.mozIsFullScreen ||
        document.webkitIsFullScreen
      );
    },
    exitFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
      this.isfull = false;
      setTimeout(() => {
        let height = $(".main-containers").height();
        $("#canvas-container").css({ height: height - 80 + "px" });
      }, 100);
    },
    launchFullscreen() {
      let element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
      this.isfull = true;
      setTimeout(() => {
        let height = $(".main-containers").height();
        $("#canvas-container").css({ height: height - 80 + "px" });
      }, 100);
    },
    rowClick(row) {
      let { id } = row;
      this.highLightId = id;
      // this.$nextTick(() => {
      if (this.selecteLabelId) {
        if (this.getIdIsWarning(this.selecteLabelId)) {
          $(`#${this.selecteLabelId}`).css({
            fill: "blue",
            stroke: "red"
          });
        } else {
          $(`#${this.selecteLabelId}`).css({
            stroke: "green"
          });
        }
      }
      this.selecteLabelId = id;
      // });
      $(`#${id}`).css({
        stroke: "yellow"
      });
      this.alreadyDrawing = false;
    },
    refreshChild() {
      this.childData = false;
      this.$nextTick(() => {
        this.childData = true;
      });
    },
    keyChange(e) {
      console.log("ceshi");
    },
    filterChange(val) {
      this.filterFlag = val._filterChecked;
      this.mount();
    },
    queryLabelList(val) {
      this.labelList = [];
      if (!val) return;
      this.Global.doPost(
        "dataLabel/doQueryDataLabeledList.json",
        { dataId: val },
        res => {
          this.labelList = res;
        }
      );
    },
    // 上一张
    beforeImage(status) {
      let index = this.getImageIndex();
      if (status) {
        if (status == 4) {
          this.imageList[index].fail = true;
          this.imageList[index].success = false;
        } else {
          this.imageList[index].fail = false;
          this.imageList[index].success = true;
        }
      }
      index--;
      if (index >= 0) {
        this.imageClick(this.imageList[index], index);
        this.checkedStatus(index);
      } else {
        this.$Message.info("没有上一张了");
      }
      this.refreshChild();
    },
    // 下一张
    nextImage(status) {
      let index = this.getImageIndex();
      if (status) {
        if (status == 4) {
          this.imageList[index].fail = true;
          this.imageList[index].success = false;
        } else {
          this.imageList[index].fail = false;
          this.imageList[index].success = true;
        }
      }
      this.imageList;
      index++;
      if (index < this.imageList.length) {
        this.imageClick(this.imageList[index], index);
        this.checkedStatus(index);
      } else {
        this.$Message.info("没有下一张了");
        this.init();
      }
      this.refreshChild();
    },
    //获取图片的下标
    getImageIndex() {
      let src = this.imgSelected.src;
      let index = null;
      this.imageList.forEach((item, i) => {
        if (item.src == src) {
          index = i;
        }
      });
      return index;
    },
    // 选中状态
    checkedStatus(index) {
      for (let i = 0; i < this.imageList.length; i++) {
        this.$set(this.imageList[i], "selected", false);
      }
      this.$set(this.imageList[index], "selected", true);
    },
    changeImage(val) {
      let { item, index } = val;
      this.imageList.forEach(item => {
        this.$set(item, "selected", false);
      });
      this.$set(this.imageList[index], "selected", true);
      this.imageClick(this.imageList[index], index);
      this.refreshChild();
    },
    getPointsData() {
      let data = [];
      let warning = false;
      let arr = this.labellingData[this.imgSelected.name].shapes;
      arr.forEach(item => {
        let obj = {};
        let flag = false;
        this.labelList.forEach(val => {
          if (item.label == val.articleName) {
            obj.labelId = val.labelId;
            flag = true;
          }
        });
        // obj.labelId = item.labelId;
        if (flag) {
          if (item.warning) {
            warning = true;
            obj["status"] = 0;
          } else {
            obj["status"] = 2;
          }
          obj["id"] = item.tagId;
          obj.points = `${item.points[0]},${item.points[1]},${parseInt(
            item.points[0],
            10
          ) + parseInt(item.points[2], 10)},${parseInt(item.points[1], 10) +
            parseInt(item.points[3], 10)}`;
          data.push(obj);
          console.log(obj.points);
        }
      });
      return {
        data,
        warning
      };
    },
    imageClick(item, index) {
      this.imageLabelList = [];
      let { src, name, id } = item;
      let img = new Image();
      img.src = src;
      img.onload = () => {
        let { height, width } = img;
        let imageScale = this.getImageScale(width, height) || 1;
        this.imgSelected = {
          name,
          src,
          id,
          imageScale,
          width,
          height,
          index,
          change: false,
          dataPictureId: item.id,
          scaledHeight: height * imageScale,
          scaledWidth: width * imageScale
        };
        if (!this.labellingData[this.imgSelected.name]) {
          this.labellingData[this.imgSelected.name] = {
            imagename: this.imgSelected.name,
            attributes: [],
            tags: [],
            size: {
              width: this.imgSelected.width,
              height: this.imgSelected.height
            },
            shapes: [],
            shapeIndex: 0, // Used to generate new ids for copy pasted shapes
            pointIndex: 0, // Used to generate new ids for feature points
            featurePointSize: 3 // Stores featurePointSize per image
          };
        } else {
          let arr = this.labellingData[this.imgSelected.name].shapes;
          let imageLabelList = [];
          if (arr.length) {
            arr.forEach(item => {
              imageLabelList.push(item.label);
            });
          }
          this.imageLabelList = [...new Set(imageLabelList)];
        }
        this.mount();
        this.$refs["table"].handleFilterReset(0);
        this.auditorName = item.auditorName;
        this.queryAccess();
      };
    },
    //获取tooltip的位置
    getPositions() {
      let shape = null;
      this.labellingData[this.imgSelected.name].shapes.forEach(item => {
        if (item.id == this.id) {
          shape = item;
        }
      });
      if (shape) {
        let zoomScale = this.imgSelected.imageScale;
        let { points } = shape;
        return {
          x: (parseInt(points[0], 10) + parseInt(points[2], 10)) * zoomScale,
          y: (parseInt(points[1], 10) + parseInt(points[3], 10)) * zoomScale
        };
      }
      return null;
    },
    //取消
    cancel() {
      this.detachShape(this.id);
      this.alreadyDrawing = false;
      this.showTooltip = false;
      // this.label = "";
      this.selectedElement = null;
      this.flag = false;
    },
    //保存
    saveImageLable(type) {
      if (this.labellingData[this.imgSelected.name].shapes.length) {
        let data = {};
        let pointData = this.getPointsData();
        data["tagForms"] = pointData.data;
        let flag = pointData.warning;
        data["id"] = this.imgSelected.dataPictureId;
        data["dataId"] = this.dataId;
        data["checkStatus"] = flag ? 4 : 5;
        // 4 不通过  5 通过
        if (data["checkStatus"] == 5) {
          if (this.imgSelected.checkStatus > 5) {
            data["checkStatus"] == 7;
          }
        }
        this.Global.doPost("dataPictureRef/doReviewSave.json", data, res => {
          this.$Message.success("保存成功");
          if (type == "next") {
            this.nextImage(data["status"]);
          } else if (type == "before") {
            this.beforeImage();
          } else {
            let { item, index } = type;
            this.imageList.forEach(item => {
              this.$set(item, "selected", false);
            });
            this.$set(this.imageList[index], "selected", true);
            this.imageClick(this.imageList[index], index);
          }
        });
      } else {
        // if (type == "next") {
        //   this.nextImage();
        // } else if (type == "before") {
        //   this.beforeImage();
        // }
        this.$Message.info("没有标注的标签");
      }
    },
    //确定
    sureClick() {
      if (!this.label) {
        this.$Message.info("请输入标签");
        return false;
      }
      let flag = false;
      this.labelList.forEach(item => {
        if (item.articleName == this.label) {
          flag = true;
        }
      });
      if (!flag) {
        this.$Message.info("标签名不合法");
        return false;
      }
      this.pageData.unshift({
        articleName: this.label,
        id: this.id,
        warning: false
      });
      let arr = this.imageLabelList;
      arr.push(this.label);
      this.imageLabelList = [...new Set(arr)];
      this.labellingData[this.imgSelected.name].shapes.forEach(item => {
        if (item.id == this.id) {
          this.$set(item, "label", this.label);
        }
      });
      this.alreadyDrawing = false;
      this.showTooltip = false;
      this.flag = false;
      this.selectedElement = null;
    },
    lableClick(val) {
      this.label = val.articleName;
    },
    detachShape(shapeId) {
      var shapes = this.labellingData[this.imgSelected.name].shapes;
      var index = indexOf(shapes, "id", shapeId);
      shapes.splice(index, 1);
      this.mount();
    },
    mount(value) {
      $("#canvas-container img")
        .css({
          width: this.imgSelected.scaledWidth,
          height: this.imgSelected.scaledHeight
        })
        .css({ filter: "brightness(1)", "-webkit-filter": "brightness(1)" });
      $("#work-canvas").css({
        width: this.imgSelected.scaledWidth,
        height: this.imgSelected.scaledHeight
      });
      if (!this.myCanvas) {
        this.myCanvas = new SVG("work-canvas").size(
          this.imgSelected.scaledWidth,
          this.imgSelected.scaledHeight
        );
      }
      this.myCanvas.size(
        this.imgSelected.scaledWidth,
        this.imgSelected.scaledHeight
      );
      this.drawOnCanvas(value);

      this.myCanvas.on("mousedown", event => {
        this.deselectAll();
        if (
          this.selectedTool &&
          !this.alreadyDrawing &&
          !this.flag &&
          this.selectedTool.drawable
        ) {
          var currentTool = this.selectedTool.create(
            this.myCanvas,
            this.imgSelected.scaledWidth,
            this.imgSelected.scaledHeight
          );
          this.moveOnlyOnMoveTool(currentTool);
          this.attachShapeListener(currentTool);

          if (currentTool.type !== "polygon") currentTool.draw(event);
          this.selectedElement = currentTool;
        }
      });
      this.myCanvas.on("mouseup", event => {
        if (this.selectedTool && this.selectedElement) {
          this.selectedElement.draw(event);
        }
      });
    },
    getPageData() {
      let shapes = this.labellingData[this.imgSelected.name].shapes;
      this.pageData = [];
      shapes.forEach(item => {
        this.pageData.push({
          id: item.id,
          label: item.label,
          type: item.type
        });
      });
    },
    selectAll() {
      this.labellingData[this.imgSelected.name].shapes.forEach(shape => {
        let el = SVG.get(shape.id);
        el.selectize({
          rotationPoint: false
        });
        this.selectedElements.push(el);
      });
    },
    zoom(type) {
      if (!this.imgSelected) return;
      let step = this.appConfig.zoomStepSize;
      let scale = this.imgSelected.imageScale;
      if (type == "add") {
        if (scale >= 5) return;
        scale += step;
      } else if (type == "reduce") {
        if (scale <= 0.2) return;
        scale -= step;
      }
      const preImgSelectedScale = this.imgSelected.imageScale;
      this.imgSelected.imageScale = scale;
      const img = this.labellingData[this.imgSelected.name];

      // return;
      if (img) {
        //if there are labels
        img.shapes.forEach(shape => {
          //each shape should zoom in relation to the image's scale
          shape.zoomScale =
            (shape.zoomScale * this.imgSelected.imageScale) /
            preImgSelectedScale;
        });
      }
      this.rescaleImage();
    },
    rescaleImage() {
      this.imgSelected.scaledWidth = Math.floor(
        this.imgSelected.width * this.imgSelected.imageScale
      );
      this.imgSelected.scaledHeight = Math.floor(
        this.imgSelected.height * this.imgSelected.imageScale
      );
      this.mount();
    },
    changeFillOpacity(val) {
      $("#canvas-container img").css({
        filter: `brightness(${val})`,
        "-webkit-filter": `brightness(${val})`
      });
      return false;
    },
    //开始标注
    startLabel(label) {
      if (label == "label") {
        if (this.selectedTool) {
          this.selectedTool = null;
        } else {
          this.selectedTool = tools["labelling"]["tool-rectangle"];
        }
      } else if (label == "light") {
        this.showLight = !this.showLight;
      } else if (label == "zoom") {
        this.showZoom = !this.showZoom;
      } else if (label == "delete") {
        this.$Modal.confirm({
          title: "警告",
          content: "确定删除该图片？",
          onOk: () => {
            let data = this.imgSelected.id;
            this.Global.doPost("dataPictureRef/doDelete.json", data, res => {
              this.$Message.info("删除成功");
              this.init();
            });
          }
        });
      }
    },
    deselectAll() {
      this.selectedElements.forEach(el => {
        el.selectize(false, {
          deepSelect: true
        });
        el.selectize(false);
      });
      this.selectedElements = [];
    },
    drawOnCanvas(value) {
      this.myCanvas.clear();
      this.pageData = [];
      if (this.labellingData && Object.keys(this.imgSelected).length) {
        for (var shapeIndex in this.labellingData[this.imgSelected.name]
          .shapes) {
          var shape = this.labellingData[this.imgSelected.name].shapes[
            shapeIndex
          ];
          this.pageData.unshift({
            id: shape.id,
            articleName: shape.label,
            labelId: shape.labelId,
            dataId: "",
            pictureId: "",
            warning: shape.warning,
            type: shape.type
          });
          this.drawShape(shape, value);
        }
      }
    },
    drawShape(shape, value) {
      if (!shape) return;
      if (this.filterFlag && this.filterFlag.length) {
        if (this.filterFlag.indexOf(shape.label) == -1) {
          return false;
        }
      }
      var scale = this.imgSelected.imageScale;
      var currentShape;
      switch (shape.type) {
        case "rect":
          var rect = this.myCanvas
            .nested()
            .rect(shape.points[2] * scale, shape.points[3] * scale)
            .move(shape.points[0] * scale, shape.points[1] * scale)
            .addClass("labelbox shape")
            .id(shape.id)
            .resize()
            .draggable({
              minX: 0,
              minY: 0,
              maxX: this.imgSelected.scaledWidth,
              maxY: this.imgSelected.scaledHeight
            });
          if (shape.warning) {
            $(`#${shape.id}`).css({
              fill: "blue",
              stroke: "red"
            });
          }
          //Add feature points
          currentShape = rect;
          break;
        case "circle":
          var circle = this.myCanvas
            .nested()
            .circle()
            .radius(shape.points[2] * scale)
            .attr("cx", shape.points[0] * scale)
            .attr("cy", shape.points[1] * scale)
            .addClass("labelcircle shape")
            .id(shape.id)
            .resize();
          // circle.parent().draggable();
          circle.draggable();
          //Add feature points
          currentShape = circle;
          break;
        case "polygon":
          var poly = this.myCanvas
            .nested()
            .polygon(scaleShapePoints(shape.points, scale, shape.type))
            //.move(shape.points[0],shape.points[1])
            .addClass("labelpolygon shape")
            .id(shape.id)
            .resize();
          // poly.parent().draggable();
          poly.draggable();
          //Add feature points
          currentShape = poly;
          break;
        default:
          console.error("shape " + shape.type + " does not exist");
          break;
      }
      // Sanity check, in case currentShape is empty
      if (currentShape) {
        this.moveOnlyOnMoveTool(currentShape);
        this.attachEvents(currentShape);
        this.attachShapeListener(currentShape);
        this.drawAllFeaturePoints(shape.featurePoints, currentShape);
      }
    },
    drawAllFeaturePoints(fPoints, parent) {
      let scaledFPoints = scaleFeaturePoints(
        fPoints,
        this.imgSelected.imageScale
      );
      for (var fPointIndex in scaledFPoints) {
        var fPoint = getPointToDraw(
          this.appConfig,
          scaledFPoints[fPointIndex],
          parent,
          {
            x: 0,
            y: 0
          }
        );
        fPoint.id(scaledFPoints[fPointIndex].id);
        this.attachEventsToFeaturePoint(fPoint, parent);
      }
    },
    attachEventsToFeaturePoint(f_point, parent) {
      f_point.type = "point";
      f_point.attr({
        for: parent.node.id
      });

      this.onMouse(f_point, e => {
        //drag callback: doesn't fire on click
        this.updateFeaturePointPosition(f_point);
      });

      f_point.on("click", e => {
        if (!e.ctrlKey) {
          //deselect rest selected elements
          this.deselectAll();
        }
        f_point.selectize({
          rotationPoint: false,
          points: []
        });
        this.selectedElements.push(f_point);
        e.stopPropagation();
      });
    },
    attachShapeListener(shape) {
      shape.on("drawstart", () => {
        this.alreadyDrawing = true;
      });

      shape.on("drawcancel", () => {
        this.alreadyDrawing = false;
      });

      shape.on("resizedone", () => {
        updateShapeDetailInStore(
          this.imgSelected.imageScale,
          shape.node.id,
          shape.rbox(this.myCanvas),
          this.getPoints(shape),
          this.labellingData[this.imgSelected.name]
        );
        this.alreadyDrawing = false;
      });

      shape.on("drawstop", () => {
        // this.alreadyDrawing = false;
        if (!this.selectedTool.validate(shape)) {
          //Don't draw an element on accidentle click
          shape.parent().remove();
          shape.remove();
        } else {
          console.log(shape);
          this.attachShapeData(shape);
          this.attachEvents(shape);
        }
      });

      shape.on("dragend", () => {
        let dom = $(`#${shape.node.id}`);
        let x = parseInt(dom.attr("x"));
        let y = parseInt(dom.attr("y"));
        let width = parseInt(dom.attr("width"));
        let height = parseInt(dom.attr("height"));
        let scale = 1 / this.imgSelected.imageScale;
        let points = [x * scale, y * scale, width * scale, height * scale];
        let shapes = this.labellingData[this.imgSelected.name].shapes;
        for (let i = 0, len = shapes.length; i < len; i++) {
          if (shapes[i].id == shape.node.id) {
            shapes[i].points = points;
            return;
          }
        }

        // updateShapeDetailInStore(
        //   this.imgSelected.imageScale,
        //   shape.node.id,
        //   shape.rbox(this.myCanvas),
        //   points,
        //   this.labellingData[this.imgSelected.name]
        // );
        this.alreadyDrawing = false;
      });
    },
    moveOnlyOnMoveTool(el) {
      el.on("mousedown", e => {
        if (!this.selectedTool || this.selectedTool.type !== "move") {
          e.preventDefault();
          e.stopPropagation();
        }
      });
    },
    onMouse(shape, dragCB) {
      var mousestate = 0;
      shape.on("mousedown", e => {
        mousestate = 1;
        // TODO: Remove
        shape.on("mousemove", e => {
          mousestate = 2;
        });
        shape.on("mouseup", e => {
          if (mousestate === 2) {
            dragCB && dragCB(e);
          }
          mousestate = 0;
        });
        e.stopPropagation();
      });
    },
    getPoints(shape) {
      var points;

      switch (shape.type) {
        case "rect":
          console.log("change");
          var box = shape.rbox(this.myCanvas);
          return [box.x, box.y, box.w, box.h];
        case "circle":
          var box = shape.rbox(this.myCanvas);
          return [box.cx, box.cy, shape.attr("r")];
        case "polygon":
          var parentSvg = $("#" + shape.node.id).closest("svg");
          var calculatedPoints = [];
          var vector = {
            x: parseInt(parentSvg.attr("x"), 10) || 0,
            y: parseInt(parentSvg.attr("y"), 10) || 0
          };
          shape.array().value.forEach(ponitArr => {
            calculatedPoints.push([
              ponitArr[0] + vector.x,
              ponitArr[1] + vector.y
            ]);
          });
          return calculatedPoints;
      }
    },
    attachShapeData(shape) {
      // update data with shape detail'
      var points = this.getPoints(shape);
      attachShapeToImg(
        this.imgSelected.imageScale,
        shape.node.id,
        shape.type,
        shape.rbox(this.myCanvas),
        points,
        this.labellingData[this.imgSelected.name]
      );
    },
    updateFeaturePoints(shape) {
      $("[for=" + shape.node.id + "]").each((i, pointEl) => {
        this.updateFeaturePointPosition(SVG.get($(pointEl).attr("id")));
      });
    },
    updateFeaturePointPosition(pointEl) {
      updateFeaturePointInStore(
        this.imgSelected.imageScale,
        this.labellingData[this.imgSelected.name],
        pointEl.attr("for"),
        pointEl.id(),
        pointEl.rbox(this.myCanvas)
      );
    },
    attachEvents(currentTool) {
      this.moveOnlyOnMoveTool(currentTool);
      this.onMouse(currentTool, e => {
        //drag callback : doesn't fire on click
        if (currentTool.node.id === e.target.id) {
          updateShapeDetailInStore(
            this.imgSelected.imageScale,
            currentTool.node.id,
            currentTool.rbox(this.myCanvas),
            this.getPoints(currentTool),
            this.labellingData[this.imgSelected.name]
          );
          this.updateFeaturePoints(currentTool);
          this.mount();
        }
      });
      currentTool.parent().on(
        "click",
        e => {
          if (this.selectedTool && this.selectedTool.type === "point") {
            var point = getPointToDraw(
              this.appConfig,
              e,
              currentTool,
              this.myCanvas.node.getBoundingClientRect()
            );
            attachPointToShape(
              this.imgSelected.imageScale,
              currentTool.node.id,
              point.node.id,
              point.rbox(this.myCanvas)
            ); //ina store
            this.attachEventsToFeaturePoint(point, currentTool);
          } else if (e.altKey) {
            //deep select. Helpful in case of polygon
            this.deselectAll();
            currentTool.selectize({
              rotationPoint: false,
              deepSelect: true
            });
            this.selectedElements.push(currentTool);
          } else {
            if (!e.ctrlKey) {
              //deselect rest selected elements
              this.deselectAll();
            }
            //select currnt element
            currentTool.selectize({
              rotationPoint: false
            });
            this.selectedElements.push(currentTool);
          }
          e.stopPropagation();
        } //click call back
      );
    },
    submit() {
      this.init();
    },
    init() {
      if (!this.formData.dataId || !this.formData.companyId) {
        this.$Message.info("请选择查询条件");
        return false;
      }
      this.labellingData = {};
      let data = {
        dataId: this.formData.dataId,
        // dataId:53,
        companyId: this.formData.companyId,
        userId: this.formData.userId,
        pageSize: 5
      };
      data["startTime"] = this.Global.createTime(this.formData.startTime);
      if (this.start.hour == "24:00") {
        data["startTime"] = this.Global.setHoursData(
          this.start.time,
          this.start.hour
        );
      }

      data["endTime"] = this.Global.createTime(this.formData.endTime);
      if (this.end.hour == "24:00") {
        data["endTime"] = this.Global.setHoursData(
          this.end.time,
          this.end.hour
        );
      }
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost(
        "dataPictureRef/doRandomPictureForCheck.json",
        data,
        res => {
          this.dataId = this.formData.dataId;
          let datalist = res;
          this.imageList = datalist;
          if (datalist && datalist.length) {
            datalist.forEach(item => {
              item.selected = false;
              item.src = item.imageUrl;
              item.success = false;
              item.fail = false;
              item.name = item.originalPicName;
              let shapes = [];
              if (item.tagVOS) {
                item.tagVOS.forEach(val => {
                  let points = val.points.split(",");
                  points[2] = parseInt(points[2], 10) - parseInt(points[0], 10);
                  points[3] = parseInt(points[3], 10) - parseInt(points[1], 10);
                  shapes.push({
                    id: `svgs${val.id}`,
                    zoomScale: 1,
                    label: val.articleName,
                    tagId: val.id,
                    labelId: val.labelId,
                    bbox: [],
                    warning: false,
                    defaultZoomScale: 1,
                    type: "rect",
                    points
                  });
                });
                this.labellingData[item.originalPicName] = {
                  imagename: item.originalPicName,
                  size: {},
                  shapes,
                  shapeIndex: 0, // Used to generate new ids for copy pasted shapes
                  pointIndex: 0, // Used to generate new ids for feature points
                  featurePointSize: 3 // Stores featurePointSize per image
                };
              }
            });
            this.imageList[0].selected = true;
            this.imageClick(this.imageList[0], 0);
          } else {
            this.pageData = [];
            this.imgSelected = {};
          }
        }
      );
      this.queryAccess();
    }
  }
};
</script>
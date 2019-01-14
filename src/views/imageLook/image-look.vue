<style lang="less" scoped>
@import "../../config/index.less";
#Main {
  min-height: 100%;
  background-color: white;
  margin-left: 10px;
  .form {
    position: relative;
    display: flex;
    // justify-content: center;
    align-items: center;
    .container {
      width: 52.5%;
      .w18 {
        width: 33.3333%;
      }
    }
    .w10 {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}

.tool-button {
  text-align: center;
  margin: 14px 0px;
  font-size: 0.9em;
}
.tool-icon {
  width: 40%;
  margin: 3px 0px;
  font-size: 1.5em;
}
.tool-selected {
  background: coral;
}
.tool-button:not(.tool-selected):hover {
  background: grey;
}
.btn-box {
  overflow: hidden;
  .tool-button {
    float: left;
    width: 100px;
    text-align: center;
    box-sizing: border-box;
    line-height: 32px;
    border: 1px solid;
    border-radius: 3px;
    margin-right: 20px;
  }
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
  padding: 20px 15px;
  .left-box {
    // width: calc(~'100% - 110px');
    width: 65%;
    min-width: 600px;
    display: flex;
    flex-direction: row;
    margin-right: 30px;
    .worker-box {
      width: calc(~"100% - 80px");
      #canvas-container {
        height: 400px;
        display: block;
        overflow: auto;
        position: relative;
        #work-canvas {
          position: absolute;
          z-index: 1;
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
        top: 180px;
        margin-left: 5px;
      }
      .fun-box {
        cursor: pointer;
        width: 30px;
        height: 30px;
        margin-bottom: 5px;
        margin-left: 2px;
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
    width: 35%;
    // box-sizing: border-box;
    padding-right: 10px;
  }
}
.imageBox {
  overflow: hidden;
  width: 100%;
  .img {
    margin-left: 20px;
    margin-bottom: 30px;
    width: calc(~"20% - 24px");
    float: left;
    img {
      width: 100%;
      height: 250px;
      display: block;
      cursor: pointer;
    }
    .name {
      text-align: center;
      margin-top: 5px;
    }
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
      .model-form {
        width: 400px;
        margin-left: 100px;
        .item-box {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          .left {
            width: 70px;
          }
          .right {
            flex: 1;
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
</style>

<template>
    <!-- 图片查看 -->
    <div id="Main">
      <div class="main-container">
        <div class="box" style="margin-bottom:20px;">
          <Form ref="form" class="form" :model="formData" :label-width="10">
              <div class="container">
                  <div class="btn-left w18">
                      <Form-item prop="labelName">
                          <Select v-model="formData.dataId" placeholder="请选择数据集名称" @on-change="queryLabelList" clearable>
                              <Option :value="item.id" v-for="(item,index) in dataNameList" :key="index">{{ item.name }}</Option>
                          </Select>
                      </Form-item>
                  </div>
                  <div class="btn-left w18">
                      <Form-item prop="brandId">
                          <!-- <Input placeholder="请输入标签名称" v-model="formData.labelName"></Input> -->
                          <!-- <Select v-model="formData.labelId" placeholder="请选择标签名称" clearable>
                              <Option :value="item.labelId" v-for="(item,index) in labelList" :key="index">{{ item.labelName }}</Option>
                          </Select> -->
                          <Input v-model.trim="formData.labelName" placeholder="请输入标签名称" clearable></Input>
                      </Form-item>
                  </div>
                  <div class="btn-left w18">
                      <Form-item prop="brandId">
                          <!-- <Input placeholder="请输入图片状态" v-model="formData.labelName"></Input> -->
                          <Select v-model="formData.status" placeholder="请选择图片状态" clearable>
                              <Option :value="item.id" v-for="(item,index) in imageStatusList" :key="index"> {{ item.name }} </Option>
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
          <p>
            共 <span class="numColor"> {{ pageNum }} </span>张图片,使用了<span class="numColor">{{ labelCount }}</span>个标签
          </p>
        </div>
        <div class="imageBox box">
            <div class="img" v-for="(item,index) in imageList" :key="index">
                <img :src="item.src" @click="showImage(item,index)">
                <div class="name">
                  {{ item.name | nameFilter}}
                </div>
            </div>

        </div>
        <div class="page-box">
            <div>
                <Page :total="pageNum" :current="1" @on-change="changePage"></Page>
            </div>
        </div>
      </div>
      <myModal class="myModal"
            @close="closeModel"
            width='1000'
            :modal="imageShow">
            <div slot="main" class="modal-main">
                <div class="canvas-box">
                    <div class="left-box">
                        <div class="worker-box">
                        <div id="canvas-container">
                            <img id="img" :src="imgSelected.src" />
                            <div id="work-canvas">
                            </div>
                        </div>
                        <div class="name-box">
                            {{ imgSelected.name }}(当前第<span class="numColor">{{ imgSelected.index }}</span>张)
                        </div>
                        </div>
                        <div class="right">
                            <div class="fun-box" >
                                <Button style="padding:0;" @click="zoom('add')" type="default">
                                    <Icon type="ios-add-circle-outline" size="28"/>
                                </Button>
                            </div>
                            <div class="fun-box" >
                                <Button style="padding:0;" type="default" @click="zoom('reduce')">
                                    <Icon type="ios-remove-circle-outline" size="28"/>
                                </Button>
                            </div>
                        
                        </div>
                    </div>
                    <div class="right-box">
                        <Table :data="pageData" disabled-hover :height="pageData.length >= 8 ? '400' : ''" :columns="columns"></Table>
                        <p style="margin:10px 0 0 10px;">
                        共
                        <span class="numColor">{{ pageData.length }}</span>
                        个标签
                        </p>
                    </div>
                </div>
            </div>
      </myModal>
    </div>
    
</template>


<script>
import { tools } from "@/tagUtil/tool.js";
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
import myModal from "@/components/Modal/my-modal.vue";
import { imageStatusList } from "@/util/status.js";
import { imgNameOpt } from "@/tagUtil/util.js";
export default {
  name: "imageLook",
  data() {
    return {
      labelCount: 0,
      labelList: [],
      imageStatusList: imageStatusList,
      dataNameList: [],
      imageShow: false,
      // 表格数据开始
      pageNum: 0,
      page: 1,
      pageData: [],
      columns: [
        {
          title: "物体名称",
          key: "label",
          align: "center"
        }
      ],
      // 表格数据结束
      id: "",
      label: "", //标签数据
      imageNum: 0,
      pageSize: 10,
      showLight: false, //显示改变亮度的
      showZoom: false, //显示放大缩小
      formData: {},
      // selectedTool: tools["labelling"]["tool-rectangle"],
      selectedTool: null,
      imageList: [],
      // selectedTool: null,
      myCanvas: null,
      tools,
      appConfig: {
        autosave: {
          syncingInterval: 10 * 1000, //10 seconds
          enable: true,
          deleteIfExported: true //Mark the data as saved when exported as nimn format, and delte the copy from browser cache.
        },
        zoomStepSize: 0.1,
        imageOpacity: 1,
        featurePointColor: "#ee0000"
      },
      copiedElements: [],
      labellingData: {},
      alreadyDrawing: false,
      selectedElements: [],
      selectedElement: null,
      imgSelected: {
        src: null
      }
    };
  },
  created() {
    //数据集列表查询
    this.Global.doPost("dataSet/doQueryAll.json", { status: 1 }, res => {
      this.dataNameList = res;
    });
    if (Object.keys(this.$route.query).length) {
      let { labelName } = this.$route.query;
      this.formData.labelName = labelName
      this.init(labelName);
    }
  },
  components: { myModal },

  watch: {},
  methods: {
    // 根据数据集ID查询该数据集下的标签
    queryLabelList(val) {
      this.labelList = [];
      this.$set(this.formData, "labelId", "");
      if (!val) return;
      this.Global.doPost(
        "dataLabel/doQueryDataLabeledList.json",
        {
          dataId: val
        },
        res => {
          this.labelList = res;
        }
      );
    },
    imgClick(item, index) {
      console.log(item);
      let { src, name } = item;
      let img = new Image();
      img.src = src;
      let n = index + 1 + (this.page - 1) * this.pageSize;
      img.onload = () => {
        let { width, height } = img;
        this.imgSelected = {
          name,
          src,
          imageScale: 1,
          width,
          height,
          index: n,
          scaledHeight: height,
          scaledWidth: width
        };
        this.mount();
      };
    },
    closeModel() {
      this.imageShow = false;
    },
    showImage(item, index) {
      this.imageShow = true;
      this.imgClick(item, index);
    },
    changePage(size) {
      this.page = size;
      this.init();
    },
    mount() {
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
      this.drawOnCanvas();
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
            shape.zoomScale * this.imgSelected.imageScale / preImgSelectedScale;
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
    deselectAll() {
      this.selectedElements.forEach(el => {
        el.selectize(false, {
          deepSelect: true
        });
        el.selectize(false);
      });
      this.selectedElements = [];
    },
    drawOnCanvas() {
      this.myCanvas.clear();
      this.pageData = [];
      for (var shapeIndex in this.labellingData[this.imgSelected.name].shapes) {
        var shape = this.labellingData[this.imgSelected.name].shapes[
          shapeIndex
        ];

        this.drawShape(shape);
        this.pageData.push({
          label: shape.label
        });
      }
    },
    drawShape(shape) {
      if (!shape) return;
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
            .fill("red");
          // .resize();
          // rect.parent().draggable();
          // rect.draggable();
          //Add feature points
          currentShape = rect;
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
    },
    submit() {
      this.page = 1;
      this.init();
    },
    init(name) {
      this.labellingData = {};
      this.imgSelected = {};
      let data = {};
      
      data["dataId"] = this.formData.dataId;
      data["labelName"] = this.formData.labelName;
      data["status"] = this.formData.status;
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost("dataPictureRef/doViewPicture.json", data, res => {
        this.imageList = res.pageList.datalist;
        this.pageNum = res.pageList.items;
        // this.page = res.page;
        this.labelCount = res.labelCount ? res.labelCount : 0;
        let datalist = res.pageList.datalist;
        if (datalist && datalist.length) {
          datalist.forEach(item => {
            item.src = item.imageUrl;
            item.name = item.originalPicName;
            let shapes = [];
            if (item.tagVOS) {
              item.tagVOS.forEach(val => {
                let points = val.points.split(",");
                points[2] = points[2] - points[0];
                points[3] = points[3] - points[1];
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
                shapes
              };
            }
          });
        }
      });
    }
  },
  filters: {
    nameFilter(val) {
      return imgNameOpt(val);
    }
  }
};
</script>

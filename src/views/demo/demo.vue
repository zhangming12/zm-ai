
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
    width: 52.5%;

    .w18 {
      width: 33.33333%;
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
      .model-form {
        width: 400px;
        margin-left: 100px;
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
	<div id="Main">
		<!-- <h2 class="Title">标签管理</h2> -->
        <div class="main-container">
            <div class="box">
                <Form ref="form" class="form" :label-width="10">
                    <div class="container">
                        <div class="btn-left w18">
                            <Form-item >
                                <input-select @on-input-change="changeValue" v-model="brandName" :valueList="brandList" placeholder="请填写品牌名称" />
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
            <div class="box">
                <img crossOrigin="anonymous" :src="src" alt="">
            </div>
        </div>
	</div>
</template>

<script>
import inputSelect from "@/components/inputSelect/input-select.vue";
export default {
  name: "label-management",
  components: {
    inputSelect
  },
  data() {
    return {
      src: null,
      brandList: [],
      brandName: ""
    };
  },
  created() {
    this.Global.doPost("brand/doQueryAll.json", {}, res => {
      if (res && res.length) {
        this.brandList = res;
      }
    });
  },
  mounted() {
    setTimeout(() => {
      let str =
        "http://112.124.18.48:8090//resources/hzai/dataSet/pic/20181229/20181229/1546052910931617.jpg";
      this.src = this.getImageData(str, 30);
    }, 2000);
  },
  methods: {
    changeValue(val) {
      this.brandName = val.name;
    },
    getImageData(src, angle) {
      let deg = angle || 0;
      deg = deg * Math.PI / 180;
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      let img = new Image();
      img.src = src || null;
      let newH = null;
      let newW = null;
      let imageData = null;
      img.onload = function() {
        let { width, height } = img;
        newW =
          Math.abs(width * Math.cos(deg)) + Math.abs(height * Math.sin(deg));
        newH =
          Math.abs(height * Math.cos(deg)) + Math.abs(width * Math.sin(deg));
        canvas.style.width = newW + "px";
        canvas.style.height = newH + "px";
        canvas.width = newW;
        canvas.height = newH;
        ctx.translate(newW / 2, newH / 2);
        ctx.rotate(deg);
        ctx.translate(-newW / 2, -newH / 2);
        ctx.drawImage(img, (newW - width) / 2, (newH - height) / 2);
        imageData = canvas.toDataURL("image/jpg");
        return imageData;
      };
    },
    rotateImage() {
      this.getImageData();
      
    }
  }
};
</script>
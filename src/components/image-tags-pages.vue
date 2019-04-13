<style lang="less" scoped>
.tags-outer-scroll-cons {
  position: relative;
  box-sizing: border-box;
  margin-right: 20px;
  overflow: hidden;
  width: 100%;
  height: 130px;
  display: flex;
  flex-direction: row;
  
  .tags-inner-scroll-body {
    //   width: 98%;
    position: absolute;
    padding: 2px 30px;
    flex: 1;
    // overflow: visible;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    white-space: nowrap;
    transition: left 0.3s ease;
    
  }
}

.btn-con {
  position: absolute;
  top: 0;
  height: 110px;
  width: 30px;
  background: #fff;
  padding-top: 3px;
  z-index: 11;
  
  box-sizing: border-box;
  padding-top: 40px;
  cursor: pointer;
  &.left-btn {
    left: 0px;
  }
  &.right-btn {
    right: 0px;
    border: none;
  }
}
.imgBox {
  position: relative;
  width: 10%;
  min-width: 80px;
  height: 100px;
  box-sizing: border-box;
  display: inline-block;
  padding: 0 5px;
  cursor: pointer;
  img {
    display: block;
    width: 100%;
    height: 100px;
    &.active {
      border: 1px solid red;
    }
  }
  .name-box {
    text-align: center;
    line-height: 20px;
    height: 20px;
  }

  .tags {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>

<template>
<!-- @DOMMouseScroll="handlescroll" @mousewheel="handlescroll" -->
    <div ref="scrollCon"  class="tags-outer-scroll-cons">
        <div class="btn-con left-btn">
             <Icon class="icon"  type="ios-arrow-dropleft" size='30' @click="imgClickLeft"/>
        </div>
        <div class="btn-con right-btn">
           <Icon  class="icon" type="ios-arrow-dropright" size='30' @click="imgClickRight"/>
        </div>
        <div ref="scrollBody" class="tags-inner-scroll-body">
            <!-- <transition-group name="taglist-moving-animation"> -->
                <div class="imgBox" :class="{ 'active' : item.selected}" v-for="( item ,index) in imageList" @click="imageClick(index,item)" :key="index">
                  <img :src="item.src" :class="{ 'active' : item.selected}">
                  <div class="name-box">
                      {{ item.name | nameFilter}}
                  </div>
                  <div class="tags">
                    <Icon type="md-checkmark-circle" color="green" size="20" v-if="item.success" />
                    <Icon type="md-alert" color="red" size="20" v-if="item.fail" />
                  </div>
                </div>
                
            <!-- </transition-group> -->
        </div>
    </div>
</template>

<script>
import { imgNameOpt } from "@/tagUtil/util.js";
export default {
  name: "imageTagsPages",
  data() {
    return {
      currentPageName: this.$route.path,
      tagBodyLeft: 0,
      tagsCount: 1
    };
  },
  filters:{
    nameFilter(val){
      return imgNameOpt(val)
    }
  },
  props: {
    imageList: Array
  },
  computed: {
  },
  methods: {
    imageClick(index, item) {
      this.imageList.forEach((item, i) => {
        if (i == index) {
          this.$set(this.imageList[i], "selected", true);
        } else {
          this.$set(this.imageList[i], "selected", false);
        }
      });
      this.$emit("imageClick", { item, index });
    },
    imgClickLeft(){
      this.$emit('moveImageLeft')
    },
    imgClickRight(){
      this.$emit('moveImageRight')
    },
    handlescroll(e) {
      var type = e.type;
      let delta = 0;
      if (type === "DOMMouseScroll" || type === "mousewheel") {
        delta = e.wheelDelta ? e.wheelDelta : -(e.detail || 0) * 40;
      }
      this.handleScroll(delta);
    },
    handleScroll(delta) {
      let left = 0;
      if (delta > 0) {
        left = Math.min(0, this.tagBodyLeft + delta);
      } else {
        if (
          this.$refs.scrollCon.offsetWidth - 100 <
          this.$refs.scrollBody.offsetWidth
        ) {
          if (
            this.tagBodyLeft <
            -(
              this.$refs.scrollBody.offsetWidth -
              this.$refs.scrollCon.offsetWidth +
              100
            )
          ) {
            left = this.tagBodyLeft;
          } else {
            left = Math.max(
              this.tagBodyLeft + delta,
              this.$refs.scrollCon.offsetWidth -
                this.$refs.scrollBody.offsetWidth -
                100
            );
          }
        } else {
          this.tagBodyLeft = 0;
        }
      }
      this.tagBodyLeft = left;
    },
    moveToView(tag) {
      if (tag.offsetLeft < -this.tagBodyLeft) {
        // 标签在可视区域左侧
        this.tagBodyLeft = -tag.offsetLeft + 10;
      } else if (
        tag.offsetLeft + 10 > -this.tagBodyLeft &&
        tag.offsetLeft + tag.offsetWidth <
          -this.tagBodyLeft + this.$refs.scrollCon.offsetWidth - 100
      ) {
        // 标签在可视区域
        this.tagBodyLeft = Math.min(
          0,
          this.$refs.scrollCon.offsetWidth -
            100 -
            tag.offsetWidth -
            tag.offsetLeft -
            20
        );
      } else {
        // 标签在可视区域右侧
        this.tagBodyLeft = -(
          tag.offsetLeft -
          (this.$refs.scrollCon.offsetWidth - 100 - tag.offsetWidth) +
          20
        );
      }
    }
  },
  mounted() {
  },
  watch: {
  }
};
</script>

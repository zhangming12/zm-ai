/**
import func from './vue-temp/vue-editor-bridge';
import func from './vue-temp/vue-editor-bridge';
    选择框组件,从父组件中接受datalist,placeholder内容
 */

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
  list-style: none;
  box-sizing: border-box;
}
.select-box {
  border: 2px solid #082883;
  width: 160px;
  height: 28px;
  margin: 0 auto;
  border-radius: 4px;
  position: relative;
  .select-top-box {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 0 8px;
    text-align: center;
    line-height: 26px;
    font-size: 12px;
    color: #ccc;
    font-family: "微软雅黑";
    cursor: pointer;
    position: relative;
    .select-top-extra {
      position: absolute;
      top: 2px;
      right: 6px;
      width: 24px;
      height: 24px;
      border-radius: 2px;
      img {
        width: 24px;
        height: 24px;
      }
    }
  }

  .select-main-box {
    transition: all 1s;
    position: absolute;
    z-index: 1000;
    background: #0e2c48;
    width: 100%;
    text-align: center;
    top: 40px;
    border: 1px solid #0e2c48;
    border-radius: 4px;
    min-height: 20px;
    max-height: 200px;
    overflow-y: auto;
    ul li {
      cursor: pointer;
      line-height: 30px;
      height: 30px;
      font-size: 12px;
      width: 100%;
      color: #ccc;
      font-family: "微软雅黑";
      overflow: hidden;
      white-space: nowrap;
      padding: 0 4px;
    }
  }
}
</style>
<template>
  <div class="container" v-clickoutside = "handClose">
        <div :style="returnStyle" class="select-box" style="margin-right:20px;">
          <div @click="topClick" class="select-top-box">
              <span v-show="!name">{{placeholder}}</span>
              <span v-show="name">{{name}}</span>
              <div class="select-top-extra">
                  <Icon type="md-arrow-dropdown" style="margin-top:-2px;" size="20"  v-show="!mainBoxShow" @click="topClick" color="#FFD300"/>
                  <Icon type="md-arrow-dropup" style="margin-top:-2px;" v-show="mainBoxShow" @click="topClick" size="20" color="#FFD300"/>
              </div>
          </div>
          <div v-show="mainBoxShow" class="select-main-box">
              <ul>
                  <li v-if="total" @click="totalClick">全部</li>
                  <li v-if="province" @click="totalClick">全国</li>
                  <li @click="liClick(item)" v-for="(item ,index) in selectLict" :key="index">
                      {{item.label}}
                  </li>
              </ul>
          </div>
        </div>
  </div>
</template>
<script>
export default {
  name: "selectBox",
  data() {
    return {
      name: "",
      value: "",
      mainBoxShow: false
    };
  },
  directives: {
    clickoutside: {
      bind: (el, binding, vnode) => {
        function documentHandle(e) {
          if (el.contains(e.target)) {
            return false;
          }
          if (binding.expression) {
            binding.value(e);
          }
        }
        el.__vueclickoutside__ = documentHandle;
        document.addEventListener("click", documentHandle, false);
      },
      unbind: (el, binding) => {
        document.removeEventListener("click", el.__vueclickoutside__);
        delete el.__vueclickoutside__;
      }
    }
  },
  props: {
    placeholder: {
      type: String,
      default: "请选择..."
    },
    selectLict: {
      type: Array,
      default() {
        return [];
      }
    },
    total:{
      type:Boolean,
      default:false
    },
    province:{
      type:Boolean,
      default:false
    },
    width: {
      type: [Number, String],
      default: 200
    },
    height: {
      type: [Number, String],
      default: 30
    },
    check:{
      type:[String,Number,Boolean],
      default:false
    }
  },
  created() {
  },
  computed: {
    returnStyle() {
      let style = {};
      style = {
        width: `${this.width}px`,
        height: `${this.height}px`,
        lineHeight: `${this.height}px`
      };
      return style;
    }
  },
  mounted() {
  },
  watch: {
    selectLict(val){
      this.name = "";
      this.value = "";
      if(val && val.length && this.check){
        this.name = val[0].label;
        this.value = val[0].value;

      }
    },
    province(val){
      if(val){
        this.selectLict = this.selectLict.splice(1);
      }
    }
  },
  methods: {
    handClose() {
      this.mainBoxShow = false;
    },
    liClick(item) {
      this.mainBoxShow = false;
      if (this.name == item.label) {
        return false;
      }
      this.name = item.label;
      this.value = item.value;
      this.$emit("input", item.value);
      this.$emit('selectChange',item.value);
    },
    totalClick(){
      this.mainBoxShow = false;
      if (this.name == "全部" || this.name == "全国") {
        return false;
      }
      if(this.province){
        this.name = "全国";
        this.value = "0";
        this.$emit("input", this.value);
        this.$emit('selectChange',this.value);
      }
      if(this.total){
        this.name = "全部";
        this.value = "";
        this.$emit("input", this.value);
        this.$emit('selectChange',this.value);
      }
      
    },
    topClick(e) {
      e.stopPropagation();
      this.mainBoxShow = !this.mainBoxShow;
    }
  }
};
</script>
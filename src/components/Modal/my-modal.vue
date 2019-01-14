<style scoped lang="less">
.my-modal {
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.6);
  display: flex;
  z-index: 1000;
  .mask {
    margin: auto;
    position: relative;
    background: #ffffff;
    min-height: 100px;
    max-height: 700px;
    border-radius: 4px;
    animation: show 0.2s ease-in-out;
    .close{
        position: absolute;
        top: -40px;
        right: -30px;
        width: 30px;
        height: 30px;
        color: #ffffff;
        text-align: center;
        cursor: pointer;
    }
  }
}
@keyframes show {
    0% {
        opacity: 0;
        transform: scale(.5);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
}
</style>
<template>
  <div class="my-modal" @click="outClick" v-show="myModal">
    <div class="mask" :style="style" @click.stop="maskClick">
      <div class="close" @click="outClick">
        <Icon type="md-close" color="#ffffff" size='30'></Icon>
      </div>
      <slot name="main"></slot>
    </div>
  </div>
</template>
<script>
const prefixCls = 'my-modal';
export default {
  name: "myModal",
  
  data() {
    return {
    };
  },
  props: {
    modal: {
      type: Boolean,
      default: false
    },
    height:{
      type:[String,Number],
      default:100
    },
    width: {
      type: [String, Number],
      default: 520
    }
  },
  created() {},
  watch: {},
  computed: {
    style() {
      let style = {
        width: this.width + "px",
       'min-height':this.height + "px"
      };
      return style;
    },
    myModal(){
      if(this.modal){
        return true
      }else{
        return false
      }
    }
  },
  methods: {
    outClick(event) {
      this.$emit('close')
    },
    maskClick(){
        return false;
    }
  }
};
</script>
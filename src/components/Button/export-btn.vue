<style scoped lang="less">
    .export-box{
        cursor: pointer;
        margin-left: 10px;
        position: relative;
        .img{
            display: inline-block;
            width: 20px;
            height: 20px;
            background: url(../../assets/image/export.png) no-repeat;
        }
        span{
            vertical-align: middle;
        }
    }
    .export-box:hover{
        color: #fd8024;
    }
    .export-box:hover .img{
        background: url(../../assets/image/exportColor.png) no-repeat;
    }
</style>
<template>
  <div class='export-box' @click="btnClick">
    <span class="img"></span>
    <span>{{title}}</span>
  </div>
</template>
<script>
export default {
  name: "exportBtn",
  data() {
    return {
    };
  },
  props: {
      title:{
          type:String,
          default:'导出'
      }
  },
  created() {},
  computed: {},
  methods: {
      btnClick(){
          this.$emit('btnClick');
      }
  }
};
</script>
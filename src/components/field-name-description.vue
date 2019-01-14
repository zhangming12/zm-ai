<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
  list-style: none;
  box-sizing: border-box;
}
.field-name-des {
  // overflow: hidden;
  cursor: pointer;
  position: absolute;
  bottom: 10px;
  left: 10px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  .toast-modal {
    transition: all 0.2s;
    display: none;
    position: relative;
    background: #f4f7ff;
    z-index: 1000;
    border-radius: 4px;
    width: 300px;
    // padding-left: 20px;
    margin-left: 10px;
    .toast-main {
      max-height: 200px;
      overflow-y: auto;
    }
    p {
      text-indent: 20px;
      line-height: 30px;
      .modal-title {
        font-weight: bold;
      }
    }
  }
  .toast-modal::before {
    display: block;
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-width: 10px 10px 10px 0;
    border-style: solid;
    border-color: transparent #f4f7ff transparent transparent; /*透明 灰 透明 透明 */
    bottom: 3px;
    left: -9px;
  }
}
.field-name-des:hover .toast-modal {
  display: block;
}
</style>
<template>
  <div class="field-name-des" v-clickoutside = "handClose">
    <Icon type="md-help-circle" class="icon-modal-toast" color="#999999" size="25"/>
    <div class="toast-modal">
      <div class="toast-main" v-if="nameList.length">
          <p v-for="(item,index) in nameList" :key="index">
            <span class="modal-title">
                {{item.title}} ,
            </span>
            <span class="modal-content">
                {{item.content}}
            </span>
        </p>
      </div>
      <p v-else style="text-align:center;text-indent:0;">暂无字段说明</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "fieldNameDes",
  data() {
    return {

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
    nameList: {
      type: Array,
      default() {
        return [];
      }
    },
    width: {
      type: [Number, String],
      default: 200
    },
    height: {
      type: [Number, String],
      default: 30
    }
  },
  created() {},
  computed: {},
  mounted() {},
  watch: {},
  methods: {
    handClose() {
      // this.mainBoxShow = false;
    }
  }
};
</script>
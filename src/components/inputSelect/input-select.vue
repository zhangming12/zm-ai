<style lang="less" scoped>
.main {
  width: 100%;
  position: relative;
  .seletedBox {
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    width: 100%;
    min-height: 32px;
    max-height: 160px;
    overflow-y: scroll;
    position: absolute;
    top: 40px;
    line-height: 32px;
    .elseBox {
      text-align: center;
      color: #e5e5e5;
    }
    ul {
      li {
        cursor: pointer;
        text-align: center;
        margin-left: 10px;
        margin-right: 10px;
      }
    }
  }
}
</style>

<template>
    <div class="main" v-clickoutside = "handClose">
        <Input 
            @on-focus="getFocus" 
            :placeholder="placeholder" 
            v-model.trim="brandName"
            clearable/>
        <div v-if="isFocus" class="seletedBox">
            <ul v-if="filterList && filterList.length">
                <li @click.stop="liClick(item)" v-for="(item,index) in filterList" :key="index">
                    {{ item.name }}
                </li>
            </ul>
            <div class="elseBox" v-else>
                无匹配数据
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "inputSelect",
  props: {
    valueList: {
      type: Array,
      default() {
        return [];
      }
    },
    placeholder: {
      type: String,
      default: "请输入"
    },
    value: {
      type: String,
      default: ""
    }
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
  data() {
    return {
      brandName: this.value,
      isFocus: false
    };
  },
  computed: {
    filterList() {
      let name = this.brandName;
      if (name) {
        return this.valueList.filter(item => {
          return item.name.indexOf(name) != -1;
        });
      } else {
        return JSON.parse(JSON.stringify(this.valueList));
      }
    }
  },
  mounted() {},
  created() {},
  methods: {
    handClose() {
      this.isFocus = false;
    },
    getFocus() {
      this.isFocus = true;
    },
    liClick(item) {
      let { name, id } = item;
      this.brandName = name;
      setTimeout(() => {
        this.isFocus = false;
      }, 100);
      this.$emit("on-input-change", { name, id });
      this.$emit("input", name);
    }
  }
};
</script>



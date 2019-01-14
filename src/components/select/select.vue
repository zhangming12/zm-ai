<style scoped lang="less">
.select-con {
  box-sizing: border-box;
  position: relative;
  //input框部分
  .select-inp {
    .select-icon {
      cursor: pointer;
    }
  }
  //下拉框部分
  ul.select-box {
    position: absolute;
    z-index: 1000;
    background: #ffffff;
    width: 100%;
    top: 36px;
    left: 0;
    min-height: 32px;
    max-height: 200px;
    overflow-y: auto;
    border-radius: 4px;
    border: 1px solid #e5e5e5;
    color: #515a6e;
    font-size: 12px;
    line-height: normal;
    white-space: nowrap;
    list-style: none;
    transition: all 0.2s;
    cursor: pointer;
    li {
      text-align: center;
      line-height: 32px;
      &:hover {
        background: #f3f3f3;
      }
    }
  }
}
</style>
<template>
    <div class="select-con" v-clickoutside = "handClose">
        <Input clearable class="select-inp" placeholder="活动名称" @on-blur="onBlur" @on-focus="onFocus" @on-change="onChange" v-model="value">
            <Icon type="ios-arrow-down" @click="showMore" class="select-icon" v-if="!iconStatus"  slot="suffix" />
            <Icon type="ios-arrow-up" @click="showMore" class="select-icon" v-if="iconStatus"  slot="suffix" />
        </Input>
        
        <ul class="select-box" v-if="iconStatus && selectList.length > 0">
            <li @click="liClick(item,index)" v-for="(item,index) in selectList" :key="index">
                <span>
                    {{ item.name }}
                </span>
            </li>
        </ul>
        <ul class="select-box" v-else-if="iconStatus && selectList.length < 0">
            <li @click="liClick('none')">暂无数据</li>
        </ul>
    </div>
</template>
<script>
export default {
  data() {
    return {
      iconStatus: false,
      value: "",
      selectList: JSON.parse(JSON.stringify(this.nameList))
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
      default: () => {
        return [
          {
            name: "张明",
            id: 1
          },
          {
            name: "张张名",
            id: 2
          },
          {
            name: "2斯",
            id: 3
          },
          {
            name: "222斯",
            id: 4
          },
          {
            name: "123斯",
            id: 5
          }
        ];
      }
    }
  },
  created() {},
  methods: {
    handClose() {
      this.iconStatus = false;
    },
    showMore() {
      this.iconStatus = !this.iconStatus;
    },
    onFocus() {
      this.iconStatus = true;
    },
    onBlur() {
      let flag = false;
      console.log(this.selectList)
      this.selectList.forEach(item => {
        if (item.name == this.value) {
          flag = true;
          this.id = item.id;
          this.$emit("input", item.id);
          return;
        }
      });
      //   this.$nextTick(() => {
      //     if (!flag) {
      //       this.value = "";
      //       this.id = "";

      //       this.selectList = JSON.parse(JSON.stringify(this.nameList));
      //     }
      //   });
    },
    onChange(e) {
      let value = e.target.value;
      //模糊匹配
      this.selectList = this.nameList.filter(item => {
        return item.name.indexOf(value) != -1;
      });
      //   this.selectList = this.filterData(value);
      if (!value) {
        this.id = "";
        this.$emit("input", this.id);
      }
    },
    liClick(item, index) {
      if (item == "none") {
        this.value = "";
        this.id = "";
      } else {
        this.value = item.name;
        this.id = item.id;
      }
      console.log(item);
      console.log(this.id);
      this.$emit("selected", item);
      this.$emit("input", this.id);
      this.iconStatus = false;
    },
    filterData(val) {
      let arr = [];
      arr = this.nameList.filter(item => {
        return item.name.indexOf(val) != -1;
      });
      return arr;
    }
  }
};
</script>



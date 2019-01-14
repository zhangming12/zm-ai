<style lang="less" scoped>
.year-select {
  width: 800px;
  height: 350px;
  box-sizing: border-box;
  border-radius: 4px;
  .year-header {
    width: 100%;
    height: 50px;
    background-color: #e8e3df;
    display: flex;
    justify-content: center;
    align-items: center;
    .year-select {
      width: 190px;
      height: 30px;
    }
  }
  .year-content {
    width: 100%;
    height: 300px;
    ul {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      li {
        width: 200px;
        height: 100px;
        border: 1px solid #e5e5e5;
        text-align: center;
        line-height: 100px;
        font-size: 14px;
        position: relative;
        cursor: pointer;
        &.disabled {
          background-color: #e4e2e2;
          cursor: not-allowed;
        }
        &.actived {
          background-color: #fd8024;
          span {
            background-image: url("../assets/image/docWhite.png");
            background-size: 20px 20px;
          }
        }
        span {
          position: absolute;
          top: 5px;
          right: 5px;
          display: block;
          cursor: pointer;
          width: 20px;
          height: 20px;
          background-image: url("../assets/image/dow.png");
          background-size: 20px 20px;
          //   &:hover {
          //     background-image: url("../assets/image/dowColor.png");
          //   }
        }
      }
    }
  }
}
</style>
<template>
    <div class="year-select">
        <div class="year-header">
            <Select class="year-select" v-model="year" placeholder="年份" @on-change="yearChange" clearable>
                <Option :value="item.name" v-for="(item,index) in yearList" :key="index">{{ item.name }}</Option>
            </Select> 
        </div>
        <div class="year-content">
            <ul>
                <li @click="liClick(index)" :class="{'disabled':!item.fileUrl,'actived':index == activeIndex}" v-for="(item ,index) in monthList" :key="index">
                     {{ item.name }} 
                     <span @click="downloadFile(index)"></span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import DEV_CONFIG from "@/util/config.js";
export default {
  data() {
    return {
      yearList: [],
      year: "",
      monthList: [],
      activeIndex: null
    };
  },
  created() {
    for (let i = 1; i < 13; i++) {
      this.monthList.push({
        name: `${i < 10 ? "0" + i : i}月`,
        disabled: false,
        fileUrl: ""
      });
    }
    let year = new Date().getFullYear();
    this.year = year;
    for (let i = 0; i < 3; i++) {
      this.yearList.push({ name: year - i });
    }
    this.yearChange(this.year);
  },
  props: {
    yearDataList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  watch: {
    yearDataList: {
      handler(val) {
        this.yearChange(this.year);
      },
      immediate: true
    },
  },
  computed: {},
  methods: {
    downloadFile(index) {
      if (this.monthList[index].fileUrl) {
        let url = DEV_CONFIG.downloadServer + this.monthList[index].fileUrl;
        window.open(url);
      } else {
        this.$Message.info("暂未生成记录，无法下载");
      }
    },
    liClick(index) {
      if (this.monthList[index].fileUrl) {
        this.activeIndex = index;
      }
    },
    yearChange(val) {
      this.monthList.forEach(item => {
        item.fileUrl = "";
      });
      this.activeIndex = null;
      this.yearDataList.forEach(item => {
        if (item.year == val) {
          let m = item.m;
          for (let i = 0; i < this.monthList.length; i++) {
            if (
              m ==
              this.monthList[i].name.substring(
                0,
                this.monthList[i].name.length - 1
              )
            ) {
              this.monthList[i].fileUrl = item.fileUrl;
            }
          }
        }
      });
    },
    classs(index) {
      return {
        disabled: this.monthList[index].disabled,
        actived: this.activeIndex == index
      };
    }
  }
};
</script>


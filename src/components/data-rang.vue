<style scoped lang="less">
@import "../config/index.less";
.container {
  display: flex;
  flex-direction: row;
  .timeBox {
    width: 60%;
    padding: 0;
    margin: 0;
    padding-right: 10px;
    .date-picker {
      width: 100% !important;
    }
  }
  .hourBox {
    width: 40%;
    padding: 0;
    margin: 0;
  }
}
</style>
<template>
  <div class="container">
    <div class="timeBox">
      <Date-picker
        class="date-picker"
        :disabled="dis"
        type="date"
        @on-change="changeTime"
        v-model="yearData"
        :placeholder="placeholder"
      ></Date-picker>
    </div>
    <div class="hourBox">
      <Select :disabled="dis" v-model="hourData" placeholder="请选择时间" @on-change="changeTypeValue">
        <Option
          :value="item.dataTime"
          v-for="item in dataList"
          :key="item.dataTime"
        >{{item.dataTime}}</Option>
      </Select>
    </div>
  </div>
</template>
<script>
export default {
  name: "dataRange",
  data() {
    return {
      dataList: [],
      yearData: this.time.slice(0, 10),
      hourData: this.hour
    };
  },
  props: {
    time: {
      type: [String, Number, Date, Boolean]
    },
    hour: {
      type: String
    },
    dis: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: "开始时间"
    }
  },
  created() {
    let str = ":00";
    for (let i = 0; i <= 24; i++) {
      let time = i < 10 ? "0" + i : i;
      time += str;
      this.dataList.push({ dataTime: time });
    }
  },
  watch: {
    time: {
      handler(val) {
        if (!val) {
          this.hourData = this.hour;
        }
        if (typeof val == "string") {
          this.yearData = val.slice(0, 10);
          this.$nextTick(() => {
            this.hourData = val.slice(11, 13) + ":00";
          });
        }
      },
      immediate: true
    }
  },
  computed: {},
  methods: {
    changeTime(val) {
      val = val + " " + "00:00:00";
      val = this.formateTime(val);
      this.$emit("dataChange", { time: val, hour: this.hourData });
    },
    changeTypeValue(val) {
      let time = null;
      if (typeof this.yearData == "object") {
        time = Date.parse(this.yearData);
      } else if (typeof this.yearData == "string") {
        time = this.yearData.split("-").join("/");
        time = Date.parse(new Date(time));
      }
      this.$emit("dataChange", { time, hour: this.hourData });
    },
    formateTime(str) {
      //将日期字符串转为时间戳
      str = str.replace(/-/g, "/");
      return new Date(str).getTime();
    }
  }
};
</script>
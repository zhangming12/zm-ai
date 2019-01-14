<style lang="less" scoped>
.box {
  width: 100%;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  padding: 30px 20px;
  padding-bottom: 0;
  background: #fff;
}
.ivu-date-picker {
  display: block;
}
</style>

<template>
  <div id="box">
      <DatePicker :options="dataOptions" 
        split-panels
        @on-change='timeChange' 
        type="daterange" 
        format="yyyy-MM-dd" 
        :placeholder="placeholder" 
        v-model="time">
      </DatePicker>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: "请选择时间"
    },
    validityStartTime: {
      type: [String, Number],
      default: 0 //开始时间默认为1970-01-01 08:00:00
    },
    validityEndTime: {
      type: [String, Number],
      default: 32503651200000 //结束时间默认为'3000-01-01'
    },
    startWeek: {
      type: [String, Number],
      default: 7
    }
  },
  data() {
    return {
      time: []
    };
  },
  computed: {
    dataOptions() {
      let start = this.validityStartTime;
      let end = this.validityEndTime;
      return {
        disabledDate(date) {
          return (
            (date && date.valueOf() < Number(start)) ||
            (date && date.valueOf() > Number(end))
          );
        }
      };
    }
  },
  methods: {
    timeChange(val) {
      console.log(val)
      let week = Number(this.startWeek);
      this.time = [
        this.getStartTime(week, val[0]).slice(0, 10),
        this.getEndTime(week, val[1]).slice(0, 10)
      ];
      console.log(this.time)
      this.$emit("dataRangChange", this.time);
      this.$emit("input", this.time);
    },
    //获取时间戳
    getTimeStape(date) {
      date = date.substring(0, 19);
      date = date.replace(/-/g, "/");
      return new Date(date).getTime();
    },
    //获取起止日期
    getStartTime(num, time) {
      time = this.getTimeStape(time);
      num = Number(num);
      let week = this.getWeek(time);
      if (week == num) {
        num = 0;
      } else if (week > num) {
        num = Math.abs(week - num);
      } else if (week < num) {
        num = 7 - num + week;
      }
      let s = null;
      if (time < this.validityStartTime) {
        s = this.validityStartTime;
      } else {
        s = time - num * 24 * 60 * 60 * 1000;
      }
      return this.Global.createTime(s);
    },
    getEndTime(num, time) {
      time = this.getTimeStape(time);
      num = Number(num);
      let week = this.getWeek(time);
      if (week == num) {
        num = 6;
      } else if (week < num) {
        num = Math.abs(week - num) - 1;
      } else if (week > num) {
        num = 7 - (week - num) - 1;
      }
      let s = null;
      if (time > this.validityEndTime) {
        s = this.validityEndTime;
      } else {
        s = time + num * 24 * 60 * 60 * 1000;
      }
      return this.Global.createTime(s);
    },
    getWeek(time) {
      let date = new Date(time);
      let week = date.getDay() ? date.getDay() : 7;
      return week;
    }
  }
};
</script>
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  provide() {
    return {
      app: this
    };
  },
  data() {
    return {
      liveVisible: false,
      iViewVisible: false,
      fee: true,
      isSettingShow: false,
      settingData: {
        code: "1" // 1, 2
      }
    };
  },
  computed: {
  },
  mounted() {
    if (window.localStorage.getItem("liveModalTime")) {
      const time = parseInt(window.localStorage.getItem("liveModalTime"));
      const today = this.getTodayUnix();
      if (today - time > 86400000 * 5) this.liveVisible = true;
    } else {
      this.liveVisible = true;
    }
  },
  methods: {
    getTodayUnix() {
      const date = new Date();
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);
      return date.getTime();
    },
    handleLive() {
      const today = this.getTodayUnix();
      window.localStorage.setItem("liveModalTime", today);
    },
    feeclose() {
      this.fee = false;
    },
    handleOpenSetting() {
      this.isSettingShow = true;
    },
    handleUpdateSettings() {
      if (window.localStorage.getItem("settings-code")) {
        this.settingData.code = window.localStorage.getItem("settings-code");
      }
    },
    handleSettingChangeCode(val) {
      window.localStorage.setItem("settings-code", val);
    }
  },
  mounted() {
    this.handleUpdateSettings();
  }
};
</script>

<style lang="less">
#app {
  height: 100%;
}
body,
html {
  height: 100%;
}
.ivu-form-item {
  margin-bottom: 10px !important;
}
/* placeholder居中显示 */
.ivu-select-placeholder,
// .ivu-input,
.ivu-cascader,
.ivu-select-single,
.ivu-select-selection,
.ivu-select-single .ivu-select-selection .ivu-select-selected-value {
  text-align: center;
}
/* 设置在disabled状态下的字体颜色 */
.ivu-input[disabled] {
  color: #515a6e;
}
.ivu-select-disabled {
  color: #515a6e;
}

.ivu-select-disabled .ivu-select-selection {
  color: #515a6e;
}
li {
  list-style: none;
}
/* 取消按钮的默认选中效果 */
.ivu-btn:focus {
  box-shadow: none;
}

.ivu-form-item {
  margin-bottom: 10px !important;
}
/* 
    超出一行隐藏
*/
.TextOverflow {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.ivu-menu-vertical.ivu-menu-light:after {
  background: white !important;
}
//左边栏样式覆盖
.ivu-menu-vertical .ivu-menu-submenu-title {
  // padding: 10px 24px;
  padding: 10px 0 10px 10px !important;
  font-size: 14px;
}
.ivu-menu-vertical .ivu-menu-item {
  font-size: 12px;
  padding: 10px 24px !important;
}

.ivu-tooltip {
  width: 100% !important;
}
.ivu-tooltip-rel {
  overflow: hidden !important;
  white-space: nowrap !important;
  text-overflow: ellipsis !important;
}
input[type="range"] {
  margin-top: 8px;
  outline: none;
  -webkit-appearance: none; /*清除系统默认样式*/
  width: 56% !important;
  background: -webkit-linear-gradient(#61bd12, #61bd12) no-repeat, #ddd;
  background-size: 30% 100%; /*设置左右宽度比例*/
  height: 3px; /*横条的高度*/
}
/*拖动块的样式*/
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none; /*清除系统默认样式*/
  height: 16px; /*拖动块高度*/
  width: 16px; /*拖动块宽度*/
  background: #fff; /*拖动块背景*/
  border-radius: 50%; /*外观设置为圆形*/
  border: solid 1px #ddd; /*设置边框*/
}

/* *::-webkit-scrollbar{
    display: none;
  } */
</style>

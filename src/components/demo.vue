<style lang="less">
@import "../styles/demo.less";
</style>
<template>
    <Row class="example" :class="{'example-vertical': isVertical}" >
        <!-- <i-col class="example-demo" :span="isVertical ? 24 : 12"  v-if="title">
            <div class="example-case">
                <slot name="demo"></slot>
            </div>
            <header class="example-header">
                <span>
                    {{ title }}
                    <a  :data-title="title">#</a>
                </span>
            </header>
            <div class="example-desc">
                <slot name="desc"></slot>
            </div>
        </i-col>
        <div class="example-split"></div> -->
        <i-col class="example-code" :style="codeHeight" :span="isVertical ? 24 : 12">
            <div :style="style"><slot name="code"></slot></div>
            <div class="example-code-more" v-if="showMore" @click="showCode = !showCode">
                <Icon type="ios-arrow-down" v-show="!showCode"></Icon>
                <Icon type="ios-arrow-up" v-show="showCode"></Icon>
                <i-button type="text" v-show="isCodeHide && !showCode">
                    <template >显示代码</template>
                </i-button>
            </div>
        </i-col>
    </Row>
</template>
<script>
export default {
  name: "Demo",
  inject: ["app"],
  props: {
    title: {
      type: String,
      default: ""
    },
    vertical: {
      type: Boolean,
      default: false
    },
    hideCode: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showCode: false,
      showMore: true,
      demo_height: 0,
      code_height: 0,
      ready: false
    };
  },
  computed: {
    isCodeHide() {
      if (this.hideCode) {
        return true;
      } else {
        return this.app.settingData.code == "1" ? false : true;
      }
    },
    isVertical() {
      if (this.vertical) {
        return true;
      } else {
        return this.app.settingData.code == "1" ? false : true;
      }
    },
    settingCode() {
      return this.app.settingData.code;
    },
    codeHeight() {
      let style = {};

      if (this.ready) {
        if (this.showCode) {
          style.height = `${this.code_height}px`;
        } else {
          style.height = `${this.demo_height}px`;
        }
      }

      return style;
    },
    style() {
      let style = {
        opacity: 1
      };
      if (this.isCodeHide && !this.showCode) {
        style.opacity = 0;
      }
      return style;
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$nextTick(() => {
        // const demo_height = this.$children[0].$children[0].$el.clientHeight;
        const demo_height = 200;
        const code_height =
          this.$children[0].$children[0].$el.clientHeight + 20;

        this.code_height = code_height;

        if (code_height <= demo_height && !this.isCodeHide) {
          this.showMore = false;
        }

        this.demo_height = this.isCodeHide ? 30 : demo_height;
        this.ready = true;
      });
    }
  },
  watch: {
    settingCode() {
      this.showCode = false;
      this.showMore = true;
      this.ready = false;
      this.init();
    }
  }
};
</script>

<style lang="less">
// @import '../main.less';
.tags-outer-scroll-con {
  position: relative;
  box-sizing: border-box;
  padding-right: 90px;
  margin-left: 1px;
  overflow: hidden;
  width: 100%;
  height: 100%;
  #tag-left,
  #tag-right {
    width: 20px;
    height: 30px;
    position: absolute;
    left: 0;
    top: 5px;
    font-size: 20px;
    text-align: center;
    z-index: 11;
    line-height: 30px;
    background: #fff;
    border-right: 1px solid #efefef;
    box-sizing: border-box;
    border-radius: 3px;
  }
  #tag-right {
    right: 90px;
    left: auto;
  }
  .tags-inner-scroll-body {
    position: absolute;
    padding: 2px 30px;
    overflow: visible;
    white-space: nowrap;
    transition: left 0.3s ease;
  }
  .close-all-tag-con {
    position: absolute;
    right: 0;
    top: 0;
    box-sizing: border-box;
    padding-top: 8px;
    text-align: center;
    width: 90px;
    height: 100%;
    background: white;
    box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
    z-index: 10;
  }
}

.btn-con {
  position: absolute;
  top: 0px;
  height: 100%;
  background: #fff;
  padding-top: 3px;
  z-index: 11;
  button {
    padding: 6px 4px;
    line-height: 14px;
    text-align: center;
  }
  &.left-btn {
    left: 0px;
  }
  &.right-btn {
    right: 90px;
    border-right: 1px solid #f0f0f0;
  }
}
</style>

<template>
    <div ref="scrollCon" @DOMMouseScroll="handlescroll" @mousewheel="handlescroll" class="tags-outer-scroll-con">
        <div class="btn-con left-btn">
        <Button type="text" @click="handleScroll(300)">
            <Icon :size="18" type="ios-arrow-back" />
        </Button>
        </div>
        <div class="btn-con right-btn">
        <Button type="text" @click="handleScroll(-300)">
            <Icon :size="18" type="ios-arrow-forward" />
        </Button>
        </div>
        <div class="close-all-tag-con">
            <Dropdown transfer @on-click="handleTagsOption">
                <Button size="small" type="primary">
                    选项
                    <!-- <Icon type="arrow-down-b"></Icon> -->
                    <Icon type="md-arrow-dropdown" size="20"/>
                </Button>
                <DropdownMenu slot="list">
                    <DropdownItem name="clearAll">关闭所有</DropdownItem>
                    <DropdownItem name="clearOthers">关闭其他</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
        <!-- <div id="tag-left">1</div> -->
        <div ref="scrollBody" class="tags-inner-scroll-body" :style="{left: tagBodyLeft + 'px'}">
            <transition-group name="taglist-moving-animation">
                <Tag 
                    type="dot"
                    v-for="(item, index) in pageTagsList" 
                    ref="tagsPageOpened"
                    :key="index"
                    :name="item.path"
                    @on-close="closePage"
                    @click.native="linkTo(item)"
                    :closable="item.path==='/index'?false:true"
                    :color="item.path===currentPageName?'#fe8600':'default'"
                    :style="borderStyle(item.path,currentPageName)"
                >{{ item.title }}</Tag>
            </transition-group>
        </div>
         <!-- <div id="tag-right">1</div> -->
    </div>
</template>

<script>
export default {
  name: "tagsPageOpened",
  data() {
    return {
      currentPageName: this.$route.path,
      tagBodyLeft: 0,
      refsTag: [],
      tagsCount: 1
    };
  },
  props: {
    pageTagsList: Array,
    beforePush: {
      type: Function,
      default: item => {
        return true;
      }
    }
  },
  computed: {
    // currentPageName(){
    //     return this.$route.path
    // },
    tagsList() {
      return this.$store.state.app.pageOpenedList;
    }
  },
  methods: {
    itemTitle(item) {
      if (typeof item.title === "object") {
        return this.$t(item.title.i18n);
      } else {
        return item.title;
      }
    },
    //给Tag添加选择的边框
    borderStyle(path, name) {
      if (path === name) {
        return {
          border: "1px solid #ff8a34 !important"
        };
      } else {
        return {
          border: "1px solid #e8eaec !important"
        };
      }
    },
    closePage(event, name) {
      console.log(this)
      let pageOpenedList = this.$store.state.app.pageOpenedList;
      let lastPageObj = pageOpenedList[0];
      if (this.currentPageName === name) {
        let len = pageOpenedList.length;
        for (let i = 1; i < len; i++) {
          if (pageOpenedList[i].path === name) {
            if (i < len - 1) {
              lastPageObj = pageOpenedList[i + 1];
            } else {
              lastPageObj = pageOpenedList[i - 1];
            }
            break;
          }
        }
      } else {
        let tagWidth = event.target.parentNode.offsetWidth;
        this.tagBodyLeft = Math.min(this.tagBodyLeft + tagWidth, 0);
      }
      this.$store.commit("removeTag", name);
      this.$store.commit("closePage", name);
      pageOpenedList = this.$store.state.app.pageOpenedList;
      sessionStorage.pageOpenedList = JSON.stringify(pageOpenedList);
      if (this.currentPageName === name) {
        this.linkTo(lastPageObj);
      }
    },
    linkTo(item) {
      let routerObj = {};
      routerObj.path = item.path;
      if (item.argu) {
        routerObj.params = item.argu;
      }
      if (item.query) {
        routerObj.query = item.query;
      }
      if (this.beforePush(item)) {
        this.$router.push(routerObj);
      }
    },
    handlescroll(e) {
      var type = e.type;
      let delta = 0;
      if (type === "DOMMouseScroll" || type === "mousewheel") {
        delta = e.wheelDelta ? e.wheelDelta : -(e.detail || 0) * 40;
      }
      this.handleScroll(delta);
    },
    handleScroll(delta) {
      let left = 0;
      if (delta > 0) {
        left = Math.min(0, this.tagBodyLeft + delta);
      } else {
        if (
          this.$refs.scrollCon.offsetWidth - 100 <
          this.$refs.scrollBody.offsetWidth
        ) {
          if (
            this.tagBodyLeft <
            -(
              this.$refs.scrollBody.offsetWidth -
              this.$refs.scrollCon.offsetWidth +
              100
            )
          ) {
            left = this.tagBodyLeft;
          } else {
            left = Math.max(
              this.tagBodyLeft + delta,
              this.$refs.scrollCon.offsetWidth -
                this.$refs.scrollBody.offsetWidth -
                100
            );
          }
        } else {
          this.tagBodyLeft = 0;
        }
      }
      this.tagBodyLeft = left;
    },
    handleTagsOption(type) {
      if (type === "clearAll") {
        this.$store.commit("clearAllTags");
        this.$router.push({
          path: "/index"
        });
      } else {
        this.$store.commit("clearOtherTags", this);
      }
      this.tagBodyLeft = 0;
    },
    moveToView(tag) {
      if (tag.offsetLeft < -this.tagBodyLeft) {
        // 标签在可视区域左侧
        this.tagBodyLeft = -tag.offsetLeft + 10;
      } else if (
        tag.offsetLeft + 10 > -this.tagBodyLeft &&
        tag.offsetLeft + tag.offsetWidth <
          -this.tagBodyLeft + this.$refs.scrollCon.offsetWidth - 100
      ) {
        // 标签在可视区域
        this.tagBodyLeft = Math.min(
          0,
          this.$refs.scrollCon.offsetWidth -
            100 -
            tag.offsetWidth -
            tag.offsetLeft -
            20
        );
      } else {
        // 标签在可视区域右侧
        this.tagBodyLeft = -(
          tag.offsetLeft -
          (this.$refs.scrollCon.offsetWidth - 100 - tag.offsetWidth) +
          20
        );
      }
    }
  },
  mounted() {
    this.refsTag = this.$refs.tagsPageOpened;
    setTimeout(() => {
      this.refsTag.forEach((item, index) => {
        if (this.$route.name === item.name) {
          let tag = this.refsTag[index].$el;
          this.moveToView(tag);
        }
      });
    }, 1); // 这里不设定时器就会有偏移bug
    this.tagsCount = this.tagsList.length;
  },
  watch: {
    $route(to) {
      this.currentPageName = to.path;
      this.$nextTick(() => {
        this.refsTag.forEach((item, index) => {
          if (to.path === item.path) {
            let tag = this.refsTag[index].$el;
            this.moveToView(tag);
          }
        });
      });
      this.tagsCount = this.tagsList.length;
    }
  }
};
</script>

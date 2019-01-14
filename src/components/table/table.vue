<style lang="less">
@import "../../config/index.less";
#tableBox {
  overflow: auto;
}
#table {
  width: 100%;
  background: #fff;
  table-layout: fixed;
  th {
    height: 40px;
    background: @tablehead-color;
    color: @head-color;
    border-right: 1px solid #e8eaec;
    border-bottom: 1px solid #e8eaec;
  }
  .table-td {
    td {
      min-width: 0;
      height: 48px;
      box-sizing: border-box;
      text-align: center;
      text-overflow: ellipsis;
      vertical-align: middle;
      border-bottom: 1px solid #e8eaec;
      color: @td-color;
      .td {
        padding-left: 18px;
        padding-right: 18px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
        word-break: break-all;
        box-sizing: border-box;
        span {
          display: block;
        }
        .over {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
  .more {
    background: #f4f2fa;
    #moreBox {
      padding: 0 76px;
      overflow: hidden;
      padding-top: 20px;
      .moreBox-span {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      li {
        float: left;
        width: 25%;
        box-sizing: border-box;
        padding-right: 10px;
        margin-bottom: 20px;
        padding-right: 10px;
        height: 22px;
        color: @head-color;
      }
    }
  }
}

#noneList {
  text-align: center;
  padding-top: 180px;
  background: url("../../assets/image/noneData.png") center 10px no-repeat;
  background-size: auto 163px;
}

#noneList.noneData {
  background-image: url("../../assets/image/noneData.png");
}

#noneList.noneSearch {
  background-image: url("../../assets/image/noneSearch.png");
}
</style>

<template>
    <div id="tableBox">
            <table cellspacing="0" cellpadding="0" border="0" id="table">
                <colgroup>
                    <col v-for="(item, index) in getAllColumns(columns)" :key="index" :width="headWidth(item)">
                </colgroup>
                <tr v-for="(c,n) in handleColumns()" :key="n">
                    <th :colspan="item.colSpan" :rowspan="item.rowSpan" v-for="(item,index) in c" :key="index">{{ item.title }}</th>
                </tr>
            </table>
            <table v-if="pageData.length > 0" cellspacing="0" cellpadding="0" border="0" id="table">
                <colgroup>
                    <col v-for="(item, index) in getAllColumns(columns)" :key="index" :width="headWidth(item)">
                </colgroup>
                <template v-for="(item,index) in pageData">
                    <tr class="table-td">
                        <td v-for="column in getAllColumns(columns)">
                            <div class="td">
                                <template v-if="!column.render">
                                    <template v-if="column.tooltip">
                                        <Tooltip transfer :content="item[column.key]" :max-width="300" :disabled="!showTooltip" class="ivu-table-cell-tooltip">
                                            <span ref="content" class="over" @mouseover.stop="handleTooltipIn($event)" @mouseout.stop="handleTooltipOut">{{ item[column.key] }}</span>
                                        </Tooltip>
                                    </template>
                                    <span v-else>
                                        {{ item[column.key] }}
                                    </span>
                                </template>
                                <Render v-if="column.render" :row="item" :column="column" :index="index" :render="column.render"></Render>
                                <span v-if="column.type === 'index'">
                                    {{ index + 1 }}
                                </span>
                            </div>
                        </td>
                    </tr>
                    <tr class="more" v-if="rowExpanded(index)">
                        <td :colspan="getAllColumns(columns).length">
                            <ul id="moreBox">
                                <li :class="'moreLi' + index + i" v-for="(item,i) in showList" :key="i" >
                                    <!-- {{item.title}}：{{ pageData[index][item.key] }} -->
                                    <!-- {{item.title}}：{{ objData[item.key] }} -->
                                    
                                    <Tooltip v-if="pageData[index][item.key] && pageData[index][item.key] != '暂无数据'" placement="bottom-start" transfer :content="pageData[index][item.key]" >
                                      <span  class="moreBox-span" >{{item.title}}：{{ pageData[index][item.key] }}</span>
                                    </Tooltip>
                                    <span v-else class="moreBox-span" >{{item.title}}：{{ pageData[index][item.key] }}</span>
                                </li>
                            </ul>
                        </td>
                    </tr>
                </template>
            </table>
            <div v-else id="noneList" :class="{noneData: noneStatus, noneSearch: !noneStatus}">
                {{ noneStatus?'暂无数据':'请搜索后查询' }}
            </div>
    </div>
</template>

<script>
import Render from "./render";
let columnKey = 1;
export default {
  name: "table",
  components: { Render },
  props: {
    // showList: Array,
    columns: Array,
    pageData: Array,
    noneStatus: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showTooltip: false,
      shoeMore: 0,
      objData: null, // 单行数据,
      showList: []
    };
  },

  methods: {
    handleTooltipIn($event) {
      const $content = $event.target;
      // 延迟300ms解决闪烁问题
      setTimeout(() => {
        this.showTooltip = $content.scrollWidth > $content.offsetWidth;
      }, 300);
    },
    handleTooltipOut() {
      this.showTooltip = false;
    },
    rowExpanded(index) {
      // 更多详情
      return this.pageData[index] && this.pageData[index].isExpend;
    },
    changeExpend(params, showList) {
      // 更多详情，显示状态
      this.$set(
        this.pageData[params.index],
        "isExpend",
        !this.pageData[params.index].isExpend
      );
      this.objData = params.row;
      this.showList = showList;
    },
    headWidth(column) {
      let width = "";
      if (column.width) {
        width = column.width;
      }
      if (width === "0") {
        width = "";
      }
      return width;
    },
    handleColumns() {
      let maxLevel = 1; // 定义做多的层级，最少是1级；
      const objData = this.Global.deepCopy(this.columns); //拷贝数组

      const traverse = (column, parent) => {
        //递归判断表头所占列数
        if (parent) {
          column.level = parent.level + 1;
          if (maxLevel < column.level) {
            maxLevel = column.level;
          }
        }
        if (column.children && column.children.length > 0) {
          let colSpan = 0;
          column.children.forEach(subItem => {
            traverse(subItem, column);
            colSpan += subItem.colSpan;
          });
          column.colSpan = colSpan;
        } else {
          column.colSpan = 1;
        }
      };
      objData.forEach(item => {
        item.level = 1;
        traverse(item);
      });

      const rows = [];
      for (let i = 0; i < maxLevel; i++) {
        rows.push([]);
      }

      const allColumns = this.getAllColumns(objData, true);
      allColumns.forEach(column => {
        // 判断表头所占行数
        if (!column.children) {
          column.rowSpan = maxLevel - column.level + 1;
        } else {
          column.rowSpan = 1;
        }
        rows[column.level - 1].push(column);
      });

      return rows;
    },
    makeColumnsId(columns) {
      return columns.map(item => {
        if ("children" in item) {
          item.children = this.makeColumnsId(item.children);
        }
        item._id = this.Global.getRandomStr(6);
        return item;
      });
    },
    getAllColumns(cols, forTableHead = false) {
      // forTableHead为false时，过滤掉有children的元素
      const columns = this.Global.deepCopy(cols);
      const result = [];
      columns.forEach(column => {
        if (column.children) {
          if (forTableHead) {
            result.push(column);
          }
          result.push.apply(
            result,
            this.getAllColumns(column.children, forTableHead)
          );
        } else {
          result.push(column);
        }
      });
      return result;
    }
  }
};
</script>
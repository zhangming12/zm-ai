<style lang="less">
@import "../../styles/common.less";
.ivu-article {
  .ivu-card p {
    margin: 0;
  }
  .ivu-card ul {
    padding: 0 !important;
    li {
      list-style: none;
      span {
        float: right;
        color: #ffac2d;
        i:last-child {
          margin-right: 5px;
        }
      }
    }
  }
  .ivu-card img {
    height: 85px;
  }
}
.Main {
  background-color: white;
  padding: 10px;
  // padding-top: 0;
  margin-left: 10px;
  min-height: 100%;
  p {
    line-height: 32px;
    font-size: 14px;
  }
  h1,h2,h3{
    margin: 10px 0;
  }
  .api{
    margin-top: 5px;
  }
}
.codeBox {
  width: 500px;
}
</style>
<template>
        <div class="Main">
            <h1>接口鉴权</h1>
            <p>请使用账号密码登录<a href="http://112.17.87.71:8081/hzai-web/#/" target="blank">[惠合AI平台]</a>，在个人中心获取API_key。</p>
            <h2>请求说明</h2>
            <p>HTTP方法：<code>POST</code></p>
            <div class="api">
                <table>
                    <thead>
                        <tr>
                            <th>参数</th>
                            <th>名称</th>
                            <th>类型</th>
                            <th>描述</th>
                            <th>是否可空</th>
                            <th>示例</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>json_req</td>
                            <td>json对象</td>
                            <td>string(2048)</td>
                            <td>封装基本参数和业务参数</td>
                            <td>否</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>sign</td>
                            <td>签名</td>
                            <td>string(256)</td>
                            <td></td>
                            <td>否</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>sign_type</td>
                            <td>签名类型</td>
                            <td>string(10)</td>
                            <td>签名类型</td>
                            <td>否</td>
                            <td>MD5</td>
                        </tr>
                        <tr>
                            <td>service</td>
                            <td>接口名称</td>
                            <td>string(64)</td>
                            <td>接口名称</td>
                            <td>否</td>
                            <td>send_msg</td>
                        </tr>
                        <tr>
                            <td>merchant_id</td>
                            <td>平台ID </td>
                            <td>string(32)</td>
                            <td>调用方平台ID  </td>
                            <td>否</td>
                            <td>191219</td>
                        </tr>
                        <tr>
                            <td>input_charset</td>
                            <td>input_charset</td>
                            <td>string(10)</td>
                            <td>input_charset</td>
                            <td>否</td>
                            <td>UTF-8</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h2>请求代码示例</h2>
            <Demo title="无边" vertical>
                <!-- <div slot="demo">
                    <div style="background:#eee;padding: 20px">
                        <Card :bordered="false">
                            <p slot="title">No border title</p>
                            <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
                        </Card>
                    </div>
                </div>
                <div slot="desc">
                    <p>通过设置属性<code>bordered</code>为 false ，可以不添加边框，建议在灰色背景下使用。</p>
                </div> -->
                <i-code lang="html" slot="code">{{ code.bordered }}</i-code>
            </Demo>
            <h2>返回说明</h2>
            <p>同步返回基本参数</p>
            <div class="api">
                <table>
                    <thead>
                        <tr>
                            <th>参数</th>
                            <th>名称</th>
                            <th>类型</th>
                            <th>描述</th>
                            <th>是否可空</th>
                            <th>示例</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>is_success</td>
                            <td>成功标识</td>
                            <td>int</td>
                            <td>接口是否调用成功</td>
                            <td>否</td>
                            <td>成功：1<br/>失败：0</td>
                        </tr>
                        <tr>
                            <td>errorCode</td>
                            <td>返回错误码</td>
                            <td>string(32)</td>
                            <td>返回错误码</td>
                            <td>是</td>
                            <td>SYSTEM_ERROR</td>
                        </tr>
                        <tr>
                            <td>errorMsg</td>
                            <td>返回错误描述</td>
                            <td>string(200)</td>
                            <td>返回错误描述</td>
                            <td>是</td>
                            <td>系统异常</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h2>返回数据示例</h2>
            <Demo title="无边框" vertical>
                <!-- <div slot="demo">
                    <div style="background:#eee;padding: 20px">
                        <Card :bordered="false">
                            <p slot="title">No border title</p>
                            <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
                        </Card>
                    </div>
                </div>
                <div slot="desc">
                    <p>通过设置属性<code>bordered</code>为 false ，可以不添加边框，建议在灰色背景下使用。</p>
                </div> -->
                <i-code lang="html" slot="code">{{ code.bordered }}</i-code>
            </Demo>
            
        </div>
</template>
<script>
import iCode from "@/components/code.vue";
import Demo from "@/components/demo.vue";
import Code from "@/code/code";

export default {
  components: {
    iCode,
    Demo
  },
  data() {
    return {
      code: Code,
      movieList: [
        {
          name: "The Shawshank Redemption",
          url: "https://movie.douban.com/subject/1292052/",
          rate: 9.6
        },
        {
          name: "Leon:The Professional",
          url: "https://movie.douban.com/subject/1295644/",
          rate: 9.4
        },
        {
          name: "Farewell to My Concubine",
          url: "https://movie.douban.com/subject/1291546/",
          rate: 9.5
        },
        {
          name: "Forrest Gump",
          url: "https://movie.douban.com/subject/1292720/",
          rate: 9.4
        },
        {
          name: "Life Is Beautiful",
          url: "https://movie.douban.com/subject/1292063/",
          rate: 9.5
        },
        {
          name: "Spirited Away",
          url: "https://movie.douban.com/subject/1291561/",
          rate: 9.2
        },
        {
          name: "Schindler's List",
          url: "https://movie.douban.com/subject/1295124/",
          rate: 9.4
        },
        {
          name: "The Legend of 1900",
          url: "https://movie.douban.com/subject/1292001/",
          rate: 9.2
        },
        {
          name: "WALL·E",
          url: "https://movie.douban.com/subject/2131459/",
          rate: 9.3
        },
        {
          name: "Inception",
          url: "https://movie.douban.com/subject/3541415/",
          rate: 9.2
        }
      ],
      randomMovieList: []
    };
  },
  methods: {
    changeLimit() {
      function getArrayItems(arr, num) {
        const temp_array = [];
        for (let index in arr) {
          temp_array.push(arr[index]);
        }
        const return_array = [];
        for (let i = 0; i < num; i++) {
          if (temp_array.length > 0) {
            const arrIndex = Math.floor(Math.random() * temp_array.length);
            return_array[i] = temp_array[arrIndex];
            temp_array.splice(arrIndex, 1);
          } else {
            break;
          }
        }
        return return_array;
      }
      this.randomMovieList = getArrayItems(this.movieList, 5);
    }
  },
  mounted() {
    this.changeLimit();
  }
};
</script>
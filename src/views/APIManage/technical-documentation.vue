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
  padding-right: 5%;
  // padding-top: 0;
  margin-left: 10px;
  min-height: 100%;
  p {
    line-height: 32px;
    font-size: 14px;
  }
  h1,
  h2,
  h3 {
    margin: 10px 0;
  }
  .api {
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
                            <td>String(2048)</td>
                            <td>封装基本参数和业务参数</td>
                            <td>否</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>sign</td>
                            <td>签名</td>
                            <td>String(256)</td>
                            <td>签名</td>
                            <td>否</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>sign_type</td>
                            <td>签名类型</td>
                            <td>String(10)</td>
                            <td>签名类型</td>
                            <td>否</td>
                            <td>MD5</td>
                        </tr>
                        <tr>
                            <td>service</td>
                            <td>接口名称</td>
                            <td>String(64)</td>
                            <td>接口名称</td>
                            <td>否</td>
                            <td>send_msg</td>
                        </tr>
                        <tr>
                            <td>merchant_id</td>
                            <td>平台ID </td>
                            <td>String(32)</td>
                            <td>调用方平台ID  </td>
                            <td>否</td>
                            <td>191219</td>
                        </tr>
                        <tr>
                            <td>input_charset</td>
                            <td>input_charset</td>
                            <td>String(10)</td>
                            <td>input_charset</td>
                            <td>否</td>
                            <td>UTF-8</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h2>请求代码示例</h2>
            <Demo title="请求代码示例" vertical>
                <i-code lang="jquery" slot="code">{{ code.bordered }}</i-code>
            </Demo>
            <h2>返回说明</h2>
            <p>同步返回基本参数：</p>
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
                            <td>Int</td>
                            <td>接口是否调用成功</td>
                            <td>否</td>
                            <td>成功：1<br/>失败：0</td>
                        </tr>
                        <tr>
                            <td>errorCode</td>
                            <td>返回错误码</td>
                            <td>String(32)</td>
                            <td>返回错误码</td>
                            <td>是</td>
                            <td>SYSTEM_ERROR</td>
                        </tr>
                        <tr>
                            <td>errorMsg</td>
                            <td>返回错误描述</td>
                            <td>String(200)</td>
                            <td>返回错误描述</td>
                            <td>是</td>
                            <td>系统异常</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h2>返回数据示例</h2>
            <Demo title="返回数据示例" vertical>
                <i-code lang="javascript" slot="code">{{ code.base }}</i-code>
            </Demo>
        </div>
</template>
<script>
import iCode from "@/components/code.vue";
import Demo from "@/components/demo.vue";
import Code from "@/code/code.js";

export default {
  name: "technical-documentation-keepAlive",
  components: {
    iCode,
    Demo
  },
  data() {
    return {
      code: Code,
      data: {
        is_success: 1,
        errorCode: null,
        errorMsg: null
      }
    };
  },
  methods: {},
  mounted() {}
};
</script>
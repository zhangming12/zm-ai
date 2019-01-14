
<style lang="less" scoped>
@import "../config/index.less";
button {
  border: none;
  outline: none;
}
#Bg {
  height: 100%;
  background: url("https://hbrand.oss-cn-hangzhou.aliyuncs.com/logoao.png")
    center no-repeat;
  background-size: cover;
  position: relative;
  #Box {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -190px;
    margin-top: -200px;
    .logo {
      height: 58px;
      background: url("../assets/image/logo.png") center no-repeat;
      background-size: auto;
    }
    .title {
      font-size: 20px;
      color: #fff;
      text-align: center;
      line-height: 3;
    }
    #login {
      border: 15px solid rgba(255, 255, 255, 0.3);
      .formBox {
        background: #fff;
        padding: 20px 57px;
        width: 357px;
        .Title {
          font-size: 18px;
          color: @primary-color;
          text-align: center;
          border-bottom: 1px solid #d7d7d7;
          line-height: 2;
        }
        .Form {
          input {
            outline: none;
            border: none;
            background: #efefef;
            margin-top: 20px;
            border: 1px solid #d7d7d7;
            padding: 5px 5px;
            width: 100%;
          }
          .forget {
            text-align: right;
            line-height: 3;
            color: @primary-color;
            overflow: hidden;
            span {
              float: right;
              cursor: pointer;
            }
          }
          .submit {
            // background: #efefef;
            background: @primary-color;
            text-align: center;
            line-height: 2;
            // color: #aeaeae;
            color: #fff;
            font-size: 16px;
            cursor: pointer;
          }
          .active {
            color: #fff;
            background: @primary-color;
          }
        }
      }
    }
  }
  #forgetPas {
    width: 780px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -390px;
    margin-top: -225px;
    .Top {
      background: url("../assets/image/logo.png") left center no-repeat;
      background-size: 108px auto;
      text-align: right;
      cursor: pointer;
      height: 55px;
      line-height: 55px;
      color: @primary-color;
      font-size: 16px;
    }
    .Title {
      height: 50px;
      line-height: 50px;
      text-align: center;
      color: #333;
      font-size: 16px;
      background: @primary-color;
    }
    .content {
      height: 340px;
      background: #fff;
      overflow: hidden;
      .steps {
        width: 505px;
        margin: 33px auto 0;
        transform: translateX(70.67px);
        overflow: hidden;
        li {
          width: 33.33333%;
          float: left;
          overflow: hidden;
          .header {
            width: 27px;
            height: 7px;
            background: #efefef;
            float: left;
          }
          .tail {
            width: calc(~"100% - 27px");
            height: 1px;
            background: #efefef;
            float: left;
            margin-top: 3px;
          }
        }
        .process {
          .header {
            background: @primary-color;
          }
        }
        .finish {
          .header {
            background: @primary-color;
          }
          .tail {
            background: @primary-color;
          }
        }
        li:last-child {
          .tail {
            display: none;
          }
        }
      }
      .stepTitle {
        width: 400px;
        margin: 15px auto;
        overflow: hidden;
        li {
          color: #aeaeae;
          font-size: 14px;
          float: left;
        }
        li:nth-child(2) {
          margin-left: 104px;
        }
        li:last-child {
          float: right;
        }
        .active {
          color: @primary-color;
        }
      }
      .heng {
        width: 243px;
        height: 1px;
        background: #d7d7d7;
        margin: 0 auto;
      }
      .stepOne,
      .stepTwo,
      .stepThree {
        width: 243px;
        margin: 0 auto;
        overflow: hidden;
        .showPhone {
          width: 100%;
          height: 30px;
          line-height: 30px;
          margin-top: 37px;
          background: #efefef;
          color: #000;
          border: 1px solid #d7d7d7;
          text-indent: 4px;
        }
        input {
          outline: none;
          border: none;
          background: #efefef;
          margin-top: 37px;
          border: 1px solid #d7d7d7;
          padding: 5px 5px;
          width: 100%;
        }
        .next {
          width: 100%;
          height: 30px;
          line-height: 30px;
          font-size: 16px;
          text-align: center;
          margin-top: 37px;
          background: @primary-color;
          color: #fff;
          cursor: pointer;
        }
        .next:hover {
          background: #ff9548;
        }
        .inputBox {
          margin-top: 37px;
          overflow: hidden;
          .sendCode {
            text-align: center;
            line-height: 30px;
            background: @primary-color;
            color: #fff;
            width: 85px;
            cursor: pointer;
            float: right;
          }
          .disStatus {
            background: #ccc;
          }
          input {
            width: 150px;
            margin-top: 0;
            float: left;
          }
        }
        .reset {
          margin-top: 37px;
          border: 1px solid #d7d7d7;
          background: #efefef;
          overflow: hidden;
          input {
            margin-top: 0;
            border: 0;
            float: left;
            width: 80%;
          }
          .eyeBox {
            width: 30px;
            text-align: center;
            line-height: 30px;
            cursor: pointer;
            float: right;
          }
        }
      }
    }
  }
}
</style>


<template>
    <div id="Bg">
        <!-- 登录界面  -->
        <div id="Box" v-if="login">
            <div class="logo">
            </div>
            <div class="title">
                惠合AI后台
            </div>
            <div id="login" @keyup.enter="submit">
                <div class="formBox">
                    <div class="Title">
                        用户登录
                    </div>
                    <div class="Form">
                        <input type="text" placeholder="用户名" v-model.trim="formData.loginAccount" >
                        <input type="password" placeholder="密   码" v-model.trim="formData.loginPwd" >
                        <div class="forget" > <span @click='forget'>忘记密码</span></div>
                        <div class="submit" @click="submit">
                            登录
                        </div>
                    </div>
                </div>
            </div>   
        </div>
        <!-- 忘记密码 -->
        <div id="forgetPas" v-else>
            <div class="Top" @click="forget">
                马上登录
            </div>
            <div class="Title">
                找回密码
            </div>
            <div class="content">
                <ul class="steps">
                    <li :class="counm==0?'process':counm > 0?'finish':''">
                        <div class="header"></div>
                        <div class="tail"></div>
                    </li>
                    <li :class="counm==1?'process':counm > 1?'finish':''">
                        <div class="header"></div>
                        <div class="tail"></div>
                    </li>
                    <li :class="counm==2?'process':counm > 2?'finish':''">
                        <div class="header"></div>
                        <div class="tail"></div>
                    </li>
                </ul>
                <ul class="stepTitle">
                    <li :class="counm==0?'active':counm > 0?'active':''">确认用户名</li>
                    <li :class="counm==1?'active':counm > 1?'active':''">验证身份</li>
                    <li :class="counm==2?'active':counm > 2?'active':''">找回密码</li>
                </ul>
                <div class="heng"></div>
                <div class="stepOne" v-if="counm == 0 ">
                    <input type="text" placeholder="用户名" v-model.trim="user">
                    <div class="next" @click="validateUser">下一步</div>
                </div>
                <div class="stepTwo" v-if="counm == 1 ">
                    <div class="showPhone">{{ encryptPhone }}</div>
                    <div class="inputBox">
                        <input type="text" placeholder="验证码" v-model="authCode">
                        <button :class="[{ disStatus: disabledStatus },'sendCode']" @click="sendMsg" :disabled="disabledStatus">
                            {{ codeMsg }}
                        </button>
                    </div>
                    <div class="next" @click="checkPhone">下一步</div>
                </div>
                <div class="stepThree" v-if="counm == 2 ">
                    <div class="reset">
                        <input type="password" placeholder="重置密码" ref="reset">
                        <div class="eyeBox" @click="changeType">
                            <Icon :type="iconType?'md-eye':'md-eye-off'" size="16"></Icon>
                        </div>
                    </div>
                    <div class="next" @click="complate">完成</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        loginAccount: "",
        loginPwd: ""
      },
      login: true,
      counm: 0, // 0： 确认用户 1： 验证身份 2： 找回密码
      inputType: "text",
      iconType: false,
      user: "",
      codeMsg: "发送验证码",
      disabledStatus: false,
      phone: "",
      encryptPhone: "",
      authCode: "",
      userId: ""
    };
  },
  methods: {
    submit() {
      if (!this.formData.loginAccount && !this.formData.loginPwd) {
        this.$Message.error("请输入用户名或密码");
        return false;
      }

      this.Global.doPost(
        "user/doUserLogin.json",
        {
          loginAccount: this.formData.loginAccount,
          loginPwd: this.Global.Md5(this.formData.loginPwd)
        },
        res => {
          sessionStorage.setItem("user", JSON.stringify(res));
          this.$Message.success("登陆成功");
          setTimeout(() => {
            this.$router.replace("/index");
          }, 1500);
        }
      );
    },
    forget() {
      // 忘记密码和登录的切换
      this.login = !this.login;
      this.counm = 0;
    },
    changeType() {
      // 更改input的type值
      this.iconType = !this.iconType;
      if (this.iconType) {
        this.$refs.reset.type = "text";
      } else {
        this.$refs.reset.type = "password";
      }
    },
    validateUser() {
      var user = this.user;
      this.Global.doPost("user/checkLoginAccount.json", user, res => {
        this.encryptPhone = res.phone.replace(
          /(\d{3})\d{4}(\d{4})/,
          "$1****$2"
        );
        this.phone = res.phone;
        this.userId = res.userId;
        this.counm = 1;
      });
    },
    sendMsg() {
      var phone = this.phone;
      if (!this.Global.checkPhone(phone)) {
        this.$Message.error("请输入正确的手机号");
        return false;
      }

      this.disabledStatus = true;
      var time = 60;
      this.Global.sendMsg(phone, "user_complate", () => {
        this.Global.TimeDown(
          time,
          t => {
            this.codeMsg = t + "S";
          },
          () => {
            this.disabledStatus = false;
            this.codeMsg = "发送验证码";
          }
        );
      });
    },
    checkPhone() {
      var phone = this.phone;
      var code = this.authCode;
      if (!this.Global.checkPhone(phone)) {
        this.$Message.error("请输入正确的手机号");
        return false;
      }

      if (this.authCode == "") {
        this.$Message.error("请输入验证码");
        return false;
      }

      this.Global.doPost(
        "checkAuthCode.json",
        {
          phone: phone,
          authCode: code,
          smsBizCode: "user_complate"
        },
        () => {
          this.counm = 2;
        }
      );
    },
    complate() {
      var pwd = this.$refs.reset.value;
      this.Global.doPost(
        "user/resetPwd.json",
        {
          userId: this.userId,
          loginNewPwd: this.Global.Md5(pwd)
        },
        () => {
          this.$Message.success("密码重置成功，跳转至首页");
          setTimeout(() => {
            this.formData.loginPwd = pwd;
            this.formData.loginAccount = this.user;
            this.submit();
          }, 1500);
        }
      );
    }
  }
};
</script>
<template>
  <div class="app">
    <div class="login">
      <div>
        <h2 class="title">Study用户注册</h2>

        <el-input
          class="user"
          placeholder="请输入昵称"
          prefix-icon="el-icon-user-solid"
          v-model="name"
          clearable
        ></el-input>

        <el-input
          class="user"
          placeholder="请输入邮箱"
          prefix-icon="el-icon-phone"
          v-model="email"
          clearable
        ></el-input>

        <!-- <div class="phone">
          <el-input
            class="user"
            placeholder="请输入验证码"
            prefix-icon="el-icon-chat-dot-round"
            v-model="code"
            clearable
          ></el-input>
          <el-button
            class="sendCode"
            type="success"
            :disabled="disabled"
            size="mini"
            @click="sendCode"
          >{{waitTime}}发送验证码</el-button>
        </div>-->

        <el-input
          class="user"
          show-password
          placeholder="密码"
          prefix-icon="el-icon-s-goods"
          v-model="password"
        ></el-input>
        <el-input
          class="user"
          show-password
          placeholder="请重复输入密码"
          prefix-icon="el-icon-s-goods"
          v-model="repassword"
        ></el-input>

        <el-button class="btn" type="primary" @click="srue">确认注册</el-button>
        <el-button class="btn" plain @click="back">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { setInterval, clearInterval } from "timers";
import axios from "axios";

export default {
  name: "",
  data() {
    return {
      name: "",
      email: "",
      code: "",
      password: "",
      repassword: "",
      waitTime: "",
      disabled: false //禁止点击
    };
  },
  components: {},
  methods: {
    back() {
      this.$router.push({ path: "/login" });
    },

    sendCode() {
      // 发送手机验证码
      // let reg = /^1[3456789]\d{9}$/;
      // if (!reg.test(this.phone)) {
      //   this.$message({
      //     message: "手机号不合法",
      //     center: true,
      //     duration: 1500
      //   });
      //   return false;
      // }
      // this.$axios({
      //   method: "post",
      //   url: "/api/sms",
      //   data: {
      //     mobile: this.phone,
      //     type: "1" //1是注册，2是登录，3重制
      //   }
      // })
      //   .then(res => {
      //     console.log(res, "这是短信验证的回应");
      //     if (res.data.code === 200) {
      //       this.disabled = true; //禁止点击
      //       this.waitTime = 60;
      //       let timer = setInterval(() => {
      //         this.waitTime--;
      //         if (this.waitTime == 0) {
      //           clearInterval(timer);
      //           this.disabled = true;
      //         }
      //       }, 1000);
      //     }
      //   })
      //   .catch(err => {});
    },

    async srue() {
      // 先验证手机号
      // let reg = /^1[3456789]\d{9}$/;
      let reg = /^([A-z0-9_-]+)@([A-z0-9_-]+)+(\.([A-z0-9_-]+))+$/g;
      if (!reg.test(this.email)) {
        this.$message({
          message: "邮箱不正确",
          center: true,
          duration: 1500
        });

        return false;
      } else if (this.name === "") {
        this.$message({
          message: "请输入昵称",
          center: true,
          duration: 1500
        });

        return false;
      } else if (this.password === "") {
        //验证是否输入密码
        this.$message({
          message: "请输入密码",
          center: true,
          duration: 1500
        });

        return false;
      } else if (this.password != this.repassword) {
        //密码是否一致
        this.$message({
          message: "两次密码不一致",
          center: true,
          duration: 1500
        });
      }
      let { data } = await axios.post(
        "http://106.53.238.187:8003/api/registerUser",
        {
          email: this.email,
          name: this.name,
          password: this.password,
          repassword: this.repassword
        }
      );

      console.log(data);
      if (data.code === 200) {
        //告诉他注册成功
        this.$message({
          message: "注册成功,请前往邮箱激活账号！",
          center: true,
          duration: 1500
        });
        this.$router.push({ path: "/login" });
      } else if (data.code === 604) {
        //告诉他注册成功
        this.$message({
          message: "短信验证码错误",
          center: true,
          type: "warning",
          duration: 1500
        });
        return false;
      } else if (data.code === 1000) {
        //告诉他注册成功
        this.$message({
          message: "该账号已经注册，请勿重复注册",
          center: true,
          type: "warning",
          duration: 1500
        });
        return false;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.el-input /deep/ .el-input__inner {
  background: rgb(40, 52, 67);
  color: #fff;
}
.title {
  font-size: 22px;
  margin-bottom: 20px;
  color: #fff;
}
.app {
  width: 100%;
  height: 100vh;
  background: rgb(45, 58, 75);
  overflow: hidden;
  .login {
    text-align: center;
    width: 400px;
    height: 200px;
    margin: {
      top: 200px;
      left: 50%;
    }
    .phone {
      display: flex;
      .sendCode {
        margin-bottom: 20px;
        margin-left: 10px;
      }
    }
    transform: translateX(-50%);
    .user {
      margin-bottom: 20px;
      color: red;
    }

    .btn {
      width: 100%;
      margin: {
        top: 10px;
        left: 0;
      }
    }
    .btn2 {
      margin-top: 20px;
    }
  }
}
</style>

<template>
  <div class="app">
    <div class="login">
      <div>
        <h2 class="title">Study后台管理系统</h2>
        <el-input
          class="user"
          placeholder="邮箱"
          prefix-icon="el-icon-user-solid"
          v-model="account"
          clearable
        ></el-input>
        <el-input
          class="user"
          show-password
          placeholder="密码"
          prefix-icon="el-icon-s-goods"
          v-model="password"
        ></el-input>

        <!-- <section class="verifyBox">
          <el-input
            class="verifyInput"
            placeholder="验证码"
            prefix-icon="el-icon-user-solid"
            v-model="verifyInput"
            clearable
          ></el-input>
          <div class="verify" v-html="svgCode" @click="changerVerify"></div>
        </section>-->

        <div class="btnBox">
          <el-button class="btnReg" type="primary" @click="login">立 即 登 录</el-button>
          <!-- <el-button class="btnReg" @click="register" type="success">我 要 注册</el-button> -->
          <!-- <el-button type="primary" plain @click="forgetMyPass">忘记密码</el-button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
var ids = require("short-id");
import axios from "axios";

export default {
  name: "",
  data() {
    return {
      svgCode: "",
      uuid: "",
      verifyInput: "",
      account: "",
      password: ""
    };
  },
  components: {},
  methods: {
    forgetMyPass() {
      this.$router.push({ path: "/changeMyPass" });
    },
    async login() {
      // 先验证账号
      // let reg = /^1[3456789]\d{9}$/;//phone
      let reg = /^([A-z0-9_-]+)@([A-z0-9_-]+)+(\.([A-z0-9_-]+))+$/g; //email

      if (!reg.test(this.account)) {
        this.$message({
          message: "邮箱不合法",
          center: true,
          duration: 1500
        });
        return false;
      }
      //验证输入密码
      if (this.password == "") {
        this.$message({
          message: "请输入密码",
          center: true,
          duration: 1500
        });
        return false;
      }
      //必须输入验证码
      // if (this.verifyInput == "") {
      //   this.$message({
      //     message: "请输入验证码",
      //     center: true,
      //     duration: 1500
      //   });
      //   return false;
      // }
      let { data } = await axios.post(
        "http://127.0.0.1:7001/api/client/login",
        {
          email: this.account,
          password: this.password
        }
      );
        console.log("登陆回应",data);
    
      //如果图片验证码错误
      if (data.code === 422) {
        this.$message.error("验证码错误");
        
      }

      if (data.code === 401) {
        this.$message.error("账号或密码错误");
        return false;
      } else if (data.code === 1002) {
        this.$message.error(data.desc);
      } else if (data.code === 1003) {
        this.$message.error(data.desc);
      } else {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("email", data.data.email);
        localStorage.setItem("uid", data.data.uid);
        localStorage.setItem("isLogin",'true');//记录状态为登陆。
        // console.log(localStorage.getItem("userName"), "存起来的用户名");
        this.$message({
          message: "恭喜您，登录成功",
          type: "success"
        });

        this.$router.push({ path: "/" });
      }
    },
    register() {
      this.$router.push({ path: "/register" });
    },
    changerVerify() {
      this.uuid = ids.generate();
      this.$axios({
        method: "post",
        url: "/api/svg",
        data: {
          uuid: this.uuid
        }
      })
        .then(res => {
          // console.log(res);
          // console.log(res.data.data.svgCode);
          this.svgCode = res.data.data.svgCode;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
  //  async mounted() {
  //     this.uuid = ids.generate();
  //     //验证码的uuid,记得要上线前删除打印记录
  //     console.log("uuid", this.uuid);
  //     let { data } = await axios.post("http://127.0.0.1:7001/api/svg", {
  //       uuid: this.uuid
  //     });
  //     console.log(data);

  //     this.svgCode = data.data.svgCode;
  //   }
};
</script>

<style scoped lang="scss">
.el-input /deep/ .el-input__inner {
  background: rgb(40, 52, 67);
  color: #fff;
}
.verifyBox {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  .verifyInput {
    margin-right: 10px;
  }
  .verify {
    width: 180px;
    height: 40px;
    border-radius: 4px;
    background: #fff;
    /deep/ svg {
      // width: 100%;
      // height: 100%;
      width: 120px;
      height: 40px;
    }
  }
}

.title {
  margin-bottom: 20px;
  color: #fff;
  font-size: 30px;
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
    .btnBox {
      margin-top: 0px;
      display: flex;
      justify-content: space-between;
      .btnReg {
        flex: 1;
      }
    }
  }
}
.fff {
  text-decoration: none;
  color: #333;
  margin-left: 10px;
}
</style>

<template>
  <div>
    <section class="header">
      <div class="content">
        <div class="left">欢迎来开***</div>
        <div class="right" v-if="!isLogin">
          <nuxt-link :to="{path:'login/'}">登陆</nuxt-link>
          <nuxt-link :to="{path:'register/'}">注册</nuxt-link>
        </div>
        <div class="right" v-if="isLogin">
          <el-dropdown>
            <span class="el-dropdown-link">
              用户：{{userName}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <nuxt-link :to="{path:'myData/',query: {uid: uid }}">修改资料</nuxt-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <div @click="signOut">退出登陆</div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </section>
    <section class="navBox">
      <nav>
        <nuxt-link :class="{sel:1== selIndex }" :to="{path:'/',query: {uid: uid }}">首页</nuxt-link>
        <nuxt-link :class="{sel:2== selIndex }" :to="{path:'/like/',query: {uid: uid }}">我的收藏</nuxt-link>
        <nuxt-link :class="{sel:3== selIndex }" :to="{path:'/err/',query: {uid: uid }}">错题本</nuxt-link>
      </nav>
    </section>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      uid: "",
      isLogin: false, //是否登陆的状态
      cateList: [],
      selfExam: [], //自学考试类
      comPuterList: [],
      userName: ""
    };
  },
  props: {
    selIndex: Number
  },
  methods: {
    signOut() {
      localStorage.setItem("isLogin", "false"); //记录状态为登陆。
      localStorage.removeItem("token");
      localStorage.removeItem("uid");
      localStorage.removeItem("email");
    }
  },
  mounted() {
    let tmp = localStorage.getItem("isLogin"); //得到的tmp是string类型的值,第一次赋值时boolean类型
    console.log("tmp值", tmp);
    if (tmp == "true") {
      console.log("进入了string的true");
      this.isLogin = true;
    } else {
      console.log("进入了false");
      this.isLogin = false;
    }
    console.log(this.isLogin);
    this.userName = localStorage.getItem("email");
    this.uid = localStorage.getItem("uid");
  }
};
</script>

<style lang="scss" scoped>
$pageWidth: 1000px;
$setCenter: 0 auto;
$hoverColor: red;

.header {
  background: rgba(202, 199, 202, 0.533);
  height: 30px;
  .content {
    display: flex;
    line-height: 30px;
    justify-content: space-between;
    width: 1000px;
    margin: 0 auto;
    a {
      margin: 0 10px;
      color: #333;
      text-decoration: none;
      &:hover {
        color: rgb(228, 20, 20);
      }
    }
  }
}
.navBox {
  background: rgb(15, 157, 88);
  height: 40px;
  margin: {
    top: 30px;
  }
  nav {
    width: $pageWidth;
    margin: $setCenter;
    line-height: 40px;
    a {
      color: #fff;
      display: inline-block;
      width: 100px;
      text-align: center;
      text-decoration: none;
      &:hover {
        background: rgb(255, 114, 0);
      }
    }
    .sel {
      background: rgb(255, 114, 0);
      margin: 0;
      border: 0;
    }
  }
}
.subject {
  width: $pageWidth;
  margin: $setCenter;
  padding-top: 20px;

  display: flex;
  .left {
    width: 720px;
    .selfEdu {
      margin-top: 20px;
      &:nth-child(1) {
        margin-top: 0;
      }
      h1 {
        border-top: 1px solid rgb(15, 157, 88);
        background: #f1f1f1;
        height: 40px;
        display: flex;
        .title {
          background: rgb(15, 157, 88);
          width: 160px;
          text-align: center;
          height: 40px;
          color: #fff;
          margin: 0;
        }
        .stand {
          display: inline-block;
          width: 40px;
          height: 40px;
          background: linear-gradient(
            135deg,
            rgb(15, 157, 88),
            rgb(15, 157, 88) 28px,
            #f1f1f1,
            #f1f1f1 20px
          );
        }
      }
      ul {
        // display: flex;
        // flex-wrap: wrap;
        border: 1px solid rgb(223, 220, 220);
        padding: 0 10px;
        li {
          margin: 10px;
          list-style: none;
          font-size: 20px;
          border-top: 1px solid rgb(223, 220, 220);
          padding: 10px 0px;
          a {
            color: #333;
            text-decoration: none;
            padding: 0 6px;
            &:hover {
              color: $hoverColor;
            }
          }
        }
      }
    }
  }
  .right {
    background: #000;
    width: 260px;
    height: 20px;
    margin-left: 20px;
    .imgBox {
      img {
        width: 100%;
        height: 140px;
        border-radius: 4px;
      }
    }
  }
}
</style>

<template>
  <div class="box">
    <section class="header">
      <div class="content">
        <div class="left">欢迎来开***</div>
        <div class="right">
          <nuxt-link :to="{path:'login/'}">登陆</nuxt-link>
          <nuxt-link :to="{path:'register/'}">注册</nuxt-link>
        </div>
      </div>
    </section>
    <section class="navBox">
      <nav>
        <a href="javascript:void(0)" class="sel">首页</a>
      </nav>
    </section>
    <ul>
      <li v-for="(item,index) in cateList" :key="index">
        <nuxt-link :to="{path:'chapter/',query: {cate: item._id }}">{{item.name}}</nuxt-link>
      </li>
    </ul>
    <nav class="bottomNav">
      <button>
        <nuxt-link :to="{path:'like/',query: {uid: uid }}">我的收藏</nuxt-link>
      </button>
      <button>
        <nuxt-link :to="{path:'myData/',query: {uid: uid }}">修改资料</nuxt-link>
      </button>
      <button>
        <nuxt-link :to="{path:'err/',query: {uid: uid }}">我的错题</nuxt-link>
      </button>
      <button>退出登陆</button>
      <button>用户：{{userName}}</button>
    </nav>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "",
  data() {
    return {
      uid: "",
      cateList: [],
      userName: ""
    };
  },
  async asyncData() {
    let { data } = await axios.get(`http://127.0.0.1:7001/api/category`);
    console.log(data.data);
    return {
      cateList: data.data
    };
  },

  components: {},
  async mounted() {
    this.userName = localStorage.getItem("email");
    this.uid = localStorage.getItem("uid");
  }
};
</script>

<style lang="scss" scoped>
$pageWidth: 1000px;
$setCenter: 0 auto;
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
    top:30px;
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
    }
    .sel {
      background: rgb(255, 114, 0);
    }
  }
}
.bottomNav {
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
  z-index: 10;
  background: rgba($color: #000000, $alpha: 0.8);
}
.box {
  width: 100%;
  height: 100vh;
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      margin: 10px;
      list-style: none;
      width: 140px;
      height: 140px;
      border-radius: 10px;
      font-size: 40px;
      text-align: center;
      line-height: 140px;
      a {
        color: #fff;
      }
      &:nth-child(n + 1) {
        background: #000;
      }
      &:nth-child(n + 2) {
        background: rgb(187, 68, 68);
      }
      &:nth-child(n + 3) {
        background: rgb(47, 175, 54);
      }
      &:nth-child(n + 4) {
        background: rgb(160, 47, 175);
      }
    }
  }
}
</style>

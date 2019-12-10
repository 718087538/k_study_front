<template>
  <div class="box">
    <ul>
      <li v-for="(item,index) in cateList" :key="index">
        <nuxt-link :to="{path:'chapter/',query: {cate: item._id }}">
          {{item.name}}
        </nuxt-link>
      </li>
    </ul>
    <nav class="bottomNav"></nav>
  </div>
</template>

<script>
import axios from "axios";


export default {
  name: "",
  data() {
    return {
      cateList: []
    };
  },
  async asyncData() {
    let { data } = await axios.get(`http://127.0.0.1:7001/api/category`);
    console.log(data.data);
    return {
      cateList:data.data,
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
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
  background: url(http://pic1.win4000.com/wallpaper/1/581055172df7d.jpg)
    no-repeat fixed center;
  background-size: 100% 100%;
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      margin: 10px;
      list-style: none;
      width: 140px;
      height: 140px;
      border-radius: 10px;
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

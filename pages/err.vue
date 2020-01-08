<template>
  <div class="box">
    <h1>错题题库</h1>
    <h2 v-if="empty">内容为空</h2>

    <li v-for="(item,index) in cateList" :key="index">
      <nuxt-link :to="{path:'/errChapter/',query: {userId: uid,categoryId:item._id }}">{{item.name}}</nuxt-link>
    </li>
  </div>
</template>
err
<script>
import axios from "axios";

export default {
  name: "",
  data() {
    return {
      empty: false, //是否显示内容为空

      uid: "",
      cateList: []
    };
  },
  async asyncData({ params, query }) {
    let { data } = await axios.get(
      `http://127.0.0.1:7001/api/client/errCategory?userId=${query.uid}`
    );
    console.log(data.data);
    if (data.data.length == 0) {
      return {
        empty: true
      };
    }
    return {
      cateList: data.data
    };
  },
  components: {},
  async mounted() {
    this.uid = localStorage.getItem("uid");
  }
};
</script>

<style>
</style>
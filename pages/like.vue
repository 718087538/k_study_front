<template>
  <div class="box">
    <!-- 收藏项，题库列表 -->
    <h1>收藏：题库列表 </h1>
    <h2 v-if="empty">内容为空</h2>
    <li v-for="(item,index) in cateList" :key="index">
      <nuxt-link
        :to="{path:'/likeChapter/',query: {userId: uid,categoryId:item._id }}"
      >{{item.name}}</nuxt-link>
    </li>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "",
  data() {
    return {
      empty:false,//是否显示内容为空
      uid: "",
      cateList: []
    };
  },
  async asyncData({ params, query }) {
    console.log("aaa",query);
    let { data } = await axios.get(
      `http://127.0.0.1:7001/api/client/likeCategory?userId=${query.uid}`
    );
    console.log(data.data);
    if(data.data.length == 0){
     return {
       empty : true
     }
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
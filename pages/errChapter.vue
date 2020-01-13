<template>
  <div class="container">
    <ul>
      <li v-for="(item,index) in chapterList " :key="index">
        章节名称：{{item.name}}
        <nuxt-link :to="{path:'/errRadio',query: {categoryId: item.cid,chapterId:item._id,userId:uid}}">单选</nuxt-link>
        <nuxt-link :to="{path:'/errSimpleAnswer',query: {categoryId: cate,chapterId:item._id,userId:uid}}">应用</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      uid:"",
      chapterList: "",
      cate:"",//这个章节的类
    };
  },
  async asyncData({ params, query }) {
    console.log("打印出查询的",query);
    let { data } = await axios.get(
      `http://127.0.0.1:7001/api/client/errChapter?userId=${query.userId}&categoryId=${query.categoryId}`
    );
    console.log("sss", data.data[0].cid);
    return {
      chapterList: data.data,
      cate : data.data[0].cid,
    };
  },
   async mounted() {
    this.uid = localStorage.getItem("uid");
  }
};
</script>

<style>
</style>
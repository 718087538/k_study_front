<template>
  <div class="container">
    <ul>
      <li v-for="(item,index) in chapterList " :key="index">
        章节名称：{{item.name}}
        <nuxt-link :to="{path:'/likeRadio',query: {categoryId: item.cid,chapterId:item._id,userId:uid}}">单选</nuxt-link>
        <nuxt-link :to="{path:'/likeSimpleAnswer',query: {categoryId: item.cid,chapterId:item._id,userId:uid}}">应用</nuxt-link>
      </li>
    </ul>
    <!-- <el-pagination background layout="prev, pager, next" :total="10"></el-pagination> -->
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
      `http://127.0.0.1:7001/api/client/likeChapter?userId=${query.userId}&categoryId=${query.categoryId}`
    );
    console.log("sss", data.data);
    return {
      chapterList: data.data,
    };
  },
    async mounted() {
    this.uid = localStorage.getItem("uid");
  }
};
</script>

<style>
</style>
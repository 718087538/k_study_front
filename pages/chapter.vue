<template>
  <div class="container">
    <h2 v-if="isEmpty">内容为空</h2>
    <ul v-if="!isEmpty">
      <li v-for="(item,index) in chapterList " :key="index">
        章节名称：{{item.name}}
        <nuxt-link
          :to="{path:'/radio',query: {categoryId: cate,chapterId:item._id,userId:uid}}"
        >单选</nuxt-link>
        <nuxt-link
          :to="{path:'/simplanAnswer',query: {categoryId: cate,chapterId:item._id,userId:uid}}"
        >应用</nuxt-link>
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
      uid: "",
      chapterList: "",
      cate: "", //这个章节的类
      isEmpty: false,
    };
  },
  async asyncData({ params, query }) {
    console.log("打印出查询的", query);
    let { data } = await axios.get(
      `http://127.0.0.1:7001/api/client/chapter?cid=${query.cate}`
    );
    console.log("sss", data.data);
     if (data.data.length == 0) {
      return {
        isEmpty: true
      };
    }
    return {
      chapterList: data.data,
      cate: query.cate
    };
  },
  async mounted() {
    this.uid = localStorage.getItem("uid");
  }
};
</script>

<style>
</style>
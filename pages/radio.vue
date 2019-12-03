<template>
  <div>
    <nuxt-link to="#" v-for="(item,index) in radioList " :key="index">
      <div v-html="item.title"></div>
    </nuxt-link>

    <el-pagination background layout="prev, pager, next" :total="pageNum"></el-pagination>

  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      radioList: "",
      pageNum: ""
    };
  },
  async asyncData({ params, query }) {
    console.log("打印出查询的", query);
    let { data } = await axios.get(
      `http://127.0.0.1:7001/api/searchquestion?categoryId=${query.cate}&chapterId=${query.chapter}`
    );
    console.log("sss", data.data);
    return {
      radioList: data.data.doc,
      pageNum: data.data.count
    };
  }
};
</script>

<style>
</style>
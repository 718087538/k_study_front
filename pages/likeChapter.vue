<template>
  <div class="container">
    <chapterCom :chapterData="chapterData" />
    <!-- <el-pagination background layout="prev, pager, next" :total="10"></el-pagination> -->
  </div>
</template>

<script>
import axios from "axios";
import chapterCom from "~/components/chapterCom";

export default {
  data() {
    return {
      uid: "",
      chapterList: "",
      cate: "", //这个章节的类
      chapterData: {
        isEmpty: false,
        chapterList: [{}]
      }
    };
  },
  components: {
    chapterCom
  },
  async asyncData({ params, query }) {
    console.log("打印出查询的", query);
    let { data } = await axios.get(
      `http://106.53.238.187:8003/api/client/likeChapter?userId=${query.userId}&categoryId=${query.categoryId}`
    );

    if (data.data.length == 0) {
      return {
        empty: true,
        chapterList: []
      };
    }
    return {
      chapterData: {
        isEmpty: false,
        chapterList: data.data,
        oneAddr:"/likeRadio",
        twoAddr:"/likeSimpleAnswer",
      }
    };
  },
  async mounted() {
    this.uid = localStorage.getItem("uid");
  }
};
</script>

<style>
</style>
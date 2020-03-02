<template>
  <div class="container">
    <section class="head">
      <h2>错题详细列表</h2>
    </section>

    <section class="chapterList">
      <h2 v-if="isEmpty">内容为空</h2>
      <ul v-if="!isEmpty">
        <li v-for="(item,index) in chapterList " :key="index">
         <p> 章节名称：{{item.name}}</p>
          <nuxt-link
            :to="{path:'/errRadio',query: {categoryId: item.cid,chapterId:item._id,userId:uid}}"
          >
            <el-button>单项选择</el-button>
          </nuxt-link>
          <nuxt-link
            :to="{path:'/errSimpleAnswer',query: {categoryId: cate,chapterId:item._id,userId:uid}}"
          >
            <el-button>综合应用</el-button>
          </nuxt-link>
        </li>
      </ul>
    </section>
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
      isEmpty:false,
    };
  },
  async asyncData({ params, query }) {
    console.log("打印出查询的", query);
    let { data } = await axios.get(
      `http://127.0.0.1:7001/api/client/errChapter?userId=${query.userId}&categoryId=${query.categoryId}`
    );
    console.log("sss", data.data[0].cid);
    return {
      chapterList: data.data,
      cate: data.data[0].cid
    };
  },
  async mounted() {
    this.uid = localStorage.getItem("uid");
  }
};
</script>

<style lang="scss" scoped>
$pageWidth: 1000px;
$setCenter: 0 auto;
$hoverColor: red;

.head {
  text-align: center;
  color: #333;
  margin: {
    top: 60px;
    bottom: 20px;
  }
}
.chapterList {
  width: 1000px;
  margin: 0 auto;
  border: 1px solid #d8d7d7;
  ul {
    li {
      list-style: none;
      height: 100px;
      display: flex;
      align-items: center;
      p {
        flex: 1;
        color: #333;
      }
      a {
        color: #333;
        margin: 0 10px;
        text-decoration: none;
        &:hover {
          color: $hoverColor;
        }
      }
    }
  }
}
</style>
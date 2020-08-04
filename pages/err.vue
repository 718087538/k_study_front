<template>
  <div class="box">
    <Header :selIndex="3"/>

    <section class="head">
      <h2>错题列表</h2>
    </section>
    <section class="chapterList">
      <h2 v-if="empty">内容为空</h2>
      <ul v-if="!empty">
        <li v-for="(item,index) in cateList" :key="index">
          <p>{{item.name}}</p>
          <nuxt-link
            :to="{path:'/errChapter/',query: {userId: uid,categoryId:item._id }}"
          ><el-button>进入</el-button></nuxt-link>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import Header from "~/components/header.vue";

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
      `http://106.53.238.187:8003/api/client/errCategory?userId=${query.uid}`
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
   components: { Header },

  async mounted() {
    this.uid = localStorage.getItem("uid");
  }
};
</script>

<style  lang="scss" scoped>
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
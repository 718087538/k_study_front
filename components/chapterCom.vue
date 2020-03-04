<template>
  <div class="container">
    <section class="head">
      <h2>详细列表</h2>
      <!-- <div>vuex的值为{{todos}}</div> -->
    </section>
    <section class="chapterList">
      <h2 v-if="chapterData.isEmpty">内容为空</h2>
      <ul v-if="!chapterData.isEmpty">
        <li v-for="(item,index) in chapterData.chapterList " :key="index">
          <p>{{item.name}}</p>
          <nuxt-link :to="{path:chapterData.oneAddr,query: {categoryId: item.cid,chapterId:item._id,userId:uid}}">
            <el-button>单项选择</el-button>
          </nuxt-link>
          <nuxt-link
            :to="{path:chapterData.twoAddr,query: {categoryId: item.cid,chapterId:item._id,userId:uid}}"
          >
            <el-button>综合应用</el-button>
          </nuxt-link>
        </li>
      </ul>
    </section>
    <!-- <el-pagination background layout="prev, pager, next" :total="10"></el-pagination> -->
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      uid: "",
      chapterList: "",
      cate: "", //这个章节的类
      isEmpty: false
    };
  },
  props:{
      chapterData:Object,
  },
  
  methods: {},

  computed: {
     todos () { return this.$store.state.todos.list }
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
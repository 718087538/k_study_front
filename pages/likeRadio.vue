<template>
  <div>
    <div v-html="radio.title"></div>
    <li v-for="(item2,index) in radio.options " :key="index">{{item2.value}}</li>
    <li>
      <span>答案：</span>
      {{radio.answer.key}}
    </li>
    <li>你的答案{{myKey}}</li>
    <li>回答结果：{{result}}</li>
    <li>收藏状态:{{likeState}}</li>
    <br />
    <br />
    <button>查看答案</button>
    <button @click="like">收藏</button>
    <button @click="pre">上一题</button>
    <button @click="next">下一题</button>
    <button @click="answerErr">假设回答错误</button>
    <button @click="deleteErr">删除错误记录</button>
    <!-- <el-pagination background layout="prev, pager, next" :total="pageNum"></el-pagination> -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      radio: "",
      pageNum: "",
      myKey: "A",
      result: "错",
      likeState: "否"
    };
  },
  async asyncData({ params, query }) {
    console.log(params, query);
    let { data } = await axios.get(
      `http://127.0.0.1:7001/api/client/radio?userId=${query.userId}&categoryId=${query.categoryId}&chapterId=${query.chapterId}&like=1`
    );
    console.log("收藏", data.data.res[0]);
    return {
      radio: data.data.res[0]
    };
  },
  methods: {
    async answerErr() {
      let { data } = await axios.post(
        "http://127.0.0.1:7001/api/client/errorQuestion",
        {
          userId: "5db7c8aa3db42c373cdb2974",
          categoryId: this.radio.category_id,
          chapterId: this.radio.chapter_id,
          questionId: this.radio._id
        }
      );
      console.log("answer result", data);
    },
    async deleteErr() {
      //删除打错的题目
      let { data } = await axios.delete(
        "http://127.0.0.1:7001/api/client/errorQuestion",
        {
          data: {
            userId: "5db7c8aa3db42c373cdb2974",
            questionId: this.radio._id
          }
        }
      );
      console.log("answer result", data);
    },

    async like() {
      //收藏
      let { data } = await axios.post("http://127.0.0.1:7001/api/client/like", {
        userId: "5db7c8aa3db42c373cdb2974",
        categoryId: this.radio.category_id,
        chapterId: this.radio.chapter_id,
        questionId: this.radio._id
      });
      console.log("like result", data);
    },
    async next() {
      let { data } = await axios.get(
        `http://127.0.0.1:7001/api/client/radio?userId=5db7c8aa3db42c373cdb2974&categoryId=${this.radio.categoryId}&chapterId=${this.radio.chapterId}&likeNext=1&questionId=${this.radio._id}`
      );
      console.log("next question", data);
      if (data.code === 205) {
        alert("已经是最后一题");
      } else {
        this.radio = data.data.res[0];
      }
    },
    async pre() {
      let { data } = await axios.get(
        `http://127.0.0.1:7001/api/client/radio?pre=0&_id=${this.radio._id}`
      );
      console.log("next question", data.code);
      if (data.code === 206) {
        alert("已经第1题");
      } else {
        this.radio = data.data.res[0];
      }
    }
  }
};
</script>

<style>
</style>
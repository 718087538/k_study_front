<template>
  <div>
    <h1 v-if="isEmpty">本章单选收藏为空</h1>
    <section v-if="!isEmpty">
      <div v-html="radio.title"></div>
      <li v-for="(item2,index) in radio.options " :key="index" @click="sel(index)">{{item2.value}}</li>

      <br />
      <br />
      <li>收藏状态: {{likeState}}</li>
      <div class="answer">
        <!-- v-show="answerResult" -->
        <li>
          <span>答案：</span>
          {{radio.answer.key}}
        </li>
        <li>你的答案：{{myAnswer}}</li>
        <li>回答结果：{{result}}</li>
      </div>
      <br />
      <br />
      <button>查看答案</button>
      <button @click="like">收藏</button>
      <button @click="pre">上一题</button>
      <button @click="next">下一题</button>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      uid: "",
      answerResult: false,
      radio: "",
      pageNum: "",
      myAnswer: "*",
      result: "*",
      likeState: "*",
      selOver: false, //是否选择过
      isEmpty: false
    };
  },
  async asyncData({ params, query }) {
    console.log(params, query);
    let { data } = await axios.get(
      `http://127.0.0.1:7001/api/client/radio?userId=${query.userId}&categoryId=${query.categoryId}&chapterId=${query.chapterId}&like=1`
    );
    console.log("收藏", data.data.res);
    if (data.data.res.length == 0) {
      return {
        isEmpty: true
      };
    }
    return {
      radio: data.data.res[0],
      likeState: data.data.liked
    };
  },
  methods: {
    async answerErr() {
      let { data } = await axios.post(
        "http://127.0.0.1:7001/api/client/errorQuestion",
        {
          userId: localStorage.getItem("uid"),
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
            userId: localStorage.getItem("uid"),
            questionId: this.radio._id
          }
        }
      );
      console.log("answer result", data);
    },
    sel(n) {
      if (this.selOver) {
        return false; //不能选多次
      }
      let myAnswer;
      switch (n) {
        case 0:
          myAnswer = "A";
          break;
        case 1:
          myAnswer = "B";
          break;
        case 2:
          myAnswer = "C";
          break;
        case 3:
          myAnswer = "D";
          break;
      }
      if (myAnswer === this.radio.answer.key) {
        this.result = "对";
      } else {
        this.result = "错";
        this.answerErr();
      }
      this.selOver = true;
      this.myAnswer = myAnswer;
    },
    async like() {
      //收藏
      let { data } = await axios.post("http://127.0.0.1:7001/api/client/like", {
        userId: localStorage.getItem("uid"),
        categoryId: this.radio.categoryId,
        chapterId: this.radio.chapterId,
        questionId: this.radio._id
      });
      console.log("like result", data);
      if (data.code === 200) {
        alert("收藏成功！");
      } else if (data.code === 201) {
        alert("取消收藏成功");
      }
    },
    async next() {
      let { data } = await axios.get(
        `http://127.0.0.1:7001/api/client/radio?userId=${this.uid}&categoryId=${this.radio.categoryId}&chapterId=${this.radio.chapterId}&likeNext=1&questionId=${this.radio._id}`
      );
      console.log("next question", data);
      this.selOver = false;
      this.myAnswer = "*";
      this.result = "*";
      this.radio.answer.key = "*";
      if (data.code === 206) {
        alert("已经是最后一题");
      } else {
        this.radio = data.data.res[0];
        this.likeState = data.data.liked;
      }
    },
    async pre() {
      let { data } = await axios.get(
        `http://127.0.0.1:7001/api/client/radio?likeNext=0&userId=${this.uid}&categoryId=${this.radio.categoryId}&chapterId=${this.radio.chapterId}&questionId=${this.radio._id}`
      );
      console.log("top question", data.code);
      this.selOver = false;
      this.myAnswer = "*";
      this.result = "*";
      this.radio.answer.key = "*";
      if (data.code === 206) {
        alert("已经第1题");
      } else {
        this.radio = data.data.res[0];
        this.likeState = data.data.liked;
      }
    }
  },
  async mounted() {
    this.uid = localStorage.getItem("uid");
  }
};
</script>

<style>
</style>
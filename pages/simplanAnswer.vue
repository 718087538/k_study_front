<template>
  <div class="box">
    <h1 v-if="isEmpty">简答题为空</h1>
    <div v-html="simpleAnswer.title"></div>
    <ul v-if="!isEmpty">
      <li  @click="sel(0)">A:{{simpleAnswer.options[0].value}}</li>
      <li  @click="sel(1)">B:{{simpleAnswer.options[1].value}}</li>
      <br>
      <br>
      <div v-show="showKey">
        <span>答案：</span>
        <span v-html="simpleAnswer.answer"></span>
      </div>

      <div v-show="showKey">
        解析：<span v-html="simpleAnswer.analysis"></span>
      </div>

      <br />
      <br />

      <p  v-show="showKey">你的回答：{{myKey}}</p>

      <br />
      <br />

      <button>查看答案</button>
      <button @click="like">收藏</button>
      <button @click="pre">上一题</button>
      <button @click="next">下一题</button>
      <!-- <button @click="answerErr">假设回答错误</button>
      <button @click="deleteErr">删除错误记录</button> -->
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      isEmpty:false,
      showKey:false,
      uid: "",
      simpleAnswer: "",
      pageNum: "",
      myKey: "",
      result: "错",
      likeState: "否"
    };
  },
  async asyncData({ params, query }) {
    //userId到时候要动态获取，vuex或者缓存或者其他方式登陆时存起来
    let { data } = await axios.get(
      `http://127.0.0.1:7001/api/client/simpleAnswer?userId=${query.userId}&categoryId=${query.categoryId}&chapterId=${query.chapterId}`
    );
    console.log(data.data.length);
    if(data.data.length == 0){
       return {
        isEmpty:true
      }
    }
    // if(dataLength == 0){
    //  
    // }
    return {
      simpleAnswer: data.data[0]
    };
  },
  methods: {
    async sel(n){
      if(this.showKey){
        return false;
      }

      if(n === 0){
        this.showKey = true;
        this.myKey = "A";

        }else{
        this.answerErr();
        this.showKey = true;
        this.myKey = "B";
      }
    },
    async deleteErr() {
      let { data } = await axios.delete(
        "http://127.0.0.1:7001/api/client/errorSimpleAnswer",
        {
          data: {
            userId: localStorage.getItem("uid"),
            categoryId: this.simpleAnswer.categoryId,
            chapterId: this.simpleAnswer.chapterId,
            questionId: this.simpleAnswer._id
          }
        }
      );
      console.log("delete err", data);
    },
    async answerErr() {
      let { data } = await axios.post(
        "http://127.0.0.1:7001/api/client/errorSimpleAnswer",
        {
          userId: localStorage.getItem("uid"),
          categoryId: this.simpleAnswer.categoryId,
          chapterId: this.simpleAnswer.chapterId,
          questionId: this.simpleAnswer._id
        }
      );
      console.log("answer result", data);
    },

    async next() {
      let { data } = await axios.get(
        `http://127.0.0.1:7001/api/client/simpleAnswer?userId=${this.uid}&categoryId=${this.simpleAnswer.categoryId}&chapterId=${this.simpleAnswer.chapterId}&pre=1&_id=${this.simpleAnswer._id}`
      );
       this.showKey = false;
        this.myKey = " ";
      console.log("next question", data);
      if (data.code === 205) {
        alert("已经是最后一题");
      } else {
        this.simpleAnswer = data.data[0];
      }
    },
    async pre() {
      let { data } = await axios.get(
        `http://127.0.0.1:7001/api/client/simpleAnswer?userId=${this.uid}&categoryId=${this.simpleAnswer.categoryId}&chapterId=${this.simpleAnswer.chapterId}&pre=0&_id=${this.simpleAnswer._id}`
      );
      this.showKey = false;
        this.myKey = " ";
      if (data.code === 206) {
        alert("已经第1题");
      } else {
        this.simpleAnswer = data.data[0];
      }
    },
    async like() {
      //收藏
      let { data } = await axios.post(
        "http://127.0.0.1:7001/api/client/simpleAnswerLike",
        {
          userId: localStorage.getItem("uid"),
          categoryId: this.simpleAnswer.categoryId,
          chapterId: this.simpleAnswer.chapterId,
          questionId: this.simpleAnswer._id
        }
      );
      console.log("like result", data);
      if(data.code === 200){
        alert("收藏成功");
      }else if(data.code === 201){
        alert("删除收藏成功");
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
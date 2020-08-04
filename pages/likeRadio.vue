<template>
  <div>
    <h2 v-if="isEmpty">内容为空</h2>
    <section class="content" v-if="!isEmpty">
      <div class="left">
        <div v-html="radio.title"></div>
        <li
          class="options"
          :class="{selItem:index===selnum,selHover:!selOver}"
          v-for="(item2,index) in radio.options"
          :key="index"
          @click="sel(index)"
        >{{item2.value}}</li>
        <br />
        <br />
        <div class="answer" v-show="answerResult">
          <li>
            <span>答案：</span>
            {{radio.answer.key}}
          </li>
          <li>你的回答：{{myAnswer}}</li>
          <li>回答结果：{{result}}</li>
          <li>收藏状态: {{likeState}}</li>
        </div>
        <br />
        <br />
        <el-button @click="showKey" class="info">查看答案</el-button>
        <el-button
          @click="like"
          v-if="likeState == 'like'"
          type="warning"
          icon="el-icon-success"
          circle
        ></el-button>
        <el-button
          @click="like"
          v-if="likeState == 'noLike'"
          type="warning"
          icon="el-icon-star-off"
          circle
        ></el-button>
        <el-button @click="pre" type="primary" plain>上一题</el-button>
        <el-button @click="next" type="primary" plain>下一题</el-button>
      </div>
      <div class="right">
        <ImgAd />
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import ImgAd from "~/components/imgAd.vue";

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
  components: {
    ImgAd
  },
  async asyncData({ params, query }) {
    console.log(params, query);
    let { data } = await axios.get(
      `http://106.53.238.187:8003/api/client/radio?userId=${query.userId}&categoryId=${query.categoryId}&chapterId=${query.chapterId}&like=1`
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
        "http://106.53.238.187:8003/api/client/errorQuestion",
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
        "http://106.53.238.187:8003/api/client/errorQuestion",
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
      let { data } = await axios.post("http://106.53.238.187:8003/api/client/like", {
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
        `http://106.53.238.187:8003/api/client/radio?userId=${this.uid}&categoryId=${this.radio.categoryId}&chapterId=${this.radio.chapterId}&likeNext=1&questionId=${this.radio._id}`
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
        `http://106.53.238.187:8003/api/client/radio?likeNext=0&userId=${this.uid}&categoryId=${this.radio.categoryId}&chapterId=${this.radio.chapterId}&questionId=${this.radio._id}`
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


<style lang="scss" scoped>
$pageWidth: 1000px;
$setCenter: 0 auto;
$hoverColor: red;

.content {
  width: $pageWidth;
  margin: $setCenter;
  margin-top: 30px;
  display: flex;
  .left {
    flex: 1;
  }
  .options {
    list-style: none;
    margin: 6px 0;
    cursor: pointer;
    width: 70%;
    padding: 8px 0;
  }
  .selHover {
    &:hover {
      background: rgb(85, 140, 223);
      color: #fff;
    }
  }

  .selItem {
    background: rgb(85, 140, 223);
    color: #fff;
  }
  .answer {
    display: flex;
    li {
      margin-right: 24px;
      list-style: none;
    }
  }
}
</style>
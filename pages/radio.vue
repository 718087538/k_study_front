<template>
  <div>
    <!-- <nuxt-link to="#" v-for="(item,index) in radioList " :key="index">
      <div v-html="item.title"></div>
    </nuxt-link>-->
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
        <el-button @click="showKey" class="info" >查看答案</el-button>
        <el-button @click="like" v-if="likeState == 'like'" type="warning" icon="el-icon-success" circle></el-button>
        <el-button @click="like" v-if="likeState == 'noLike'" type="warning" icon="el-icon-star-off" circle></el-button>
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
      isEmpty: false,
      selnum: -1
    };
  },
  components: {
    ImgAd
  },
  async asyncData({ params, query }) {
    //userId到时候要动态获取，vuex或者缓存或者其他方式登陆时存起来
    let { data } = await axios.get(
      `http://127.0.0.1:7001/api/client/radio?userId=${query.userId}&categoryId=${query.categoryId}&chapterId=${query.chapterId}`
    );
    console.log("11111111111111", data.data);
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
    sel(n) {
      if (this.selOver) {
        return false; //不能选多次
      }
      let myAnswer;
      switch (n) {
        case 0:
          myAnswer = "A";
          this.selnum = 0;
          break;
        case 1:
          myAnswer = "B";
          this.selnum = 1;
          break;
        case 2:
          myAnswer = "C";
          this.selnum = 2;
          break;
        case 3:
          myAnswer = "D";
          this.selnum = 3;
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
      this.answerResult = true;
    },
    showKey(){
      this.answerResult = true;
    },
    //回答错误题目时，记录错题
    async answerErr() {
      let { data } = await axios.post(
        "http://127.0.0.1:7001/api/client/errorQuestion",
        {
          userId: localStorage.getItem("uid"),
          categoryId: this.radio.categoryId,
          chapterId: this.radio.chapterId,
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
      this.answerResult = false;
      this.selnum = -1;
      let { data } = await axios.get(
        `http://127.0.0.1:7001/api/client/radio?userId=${this.uid}&categoryId=${this.radio.categoryId}&chapterId=${this.radio.chapterId}&pre=1&_id=${this.radio._id}`
      );
      console.log("next question", data);
      this.selOver = false;
      this.myAnswer = "*";
      this.result = "*";
      this.radio.answer.key = "*";
      if (data.code === 205) {
        alert("已经是最后一题");
      } else {
        this.radio = data.data.res[0];
        this.likeState = data.data.liked;
      }
    },
    async pre() {
      this.answerResult = false;
      this.selnum = -1;

      let { data } = await axios.get(
        `http://127.0.0.1:7001/api/client/radio?pre=0&_id=${this.radio._id}&categoryId=${this.radio.categoryId}&chapterId=${this.radio.chapterId}&userId=${this.uid}`
      );
      console.log("next question", data.code);
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
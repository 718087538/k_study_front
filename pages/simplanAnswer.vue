<template>
  <div class="box">
    <section class="content">
      <div class="left">
        <h1 v-if="isEmpty">简答题为空</h1>
        <div v-html="simpleAnswer.title"></div>
        <ul v-if="!isEmpty">
          <li
            class="selItem"
            :class="{selItem2:0 == selnum,selHover:!selOver}"
            @click="sel(0)"
          >A:{{simpleAnswer.options[0].value}}</li>
          <li
            class="selItem"
            :class="{selItem2:1 == selnum,selHover:!selOver}"
            @click="sel(1)"
          >B:{{simpleAnswer.options[1].value}}</li>
          <br />
          <br />
          <div class="keyBox" v-show="showKey">
            <li>
              <span>答案：</span>
              <span class="key" v-html="simpleAnswer.answer"></span>
            </li>
            <li>
              解析：
              <span v-html="simpleAnswer.analysis"></span>
            </li>
            <p>你的回答：{{myKey}}</p>
          </div>
          <el-button @click="showKey" type="info">查看答案</el-button>
          <el-button @click="like" type="warning" icon="el-icon-star-off" circle></el-button>
          <el-button @click="pre" type="primary" plain>上一题</el-button>
          <el-button @click="next" type="primary" plain>下一题</el-button>
        </ul>
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
      isEmpty: false,
      showKey: false,
      uid: "",
      simpleAnswer: "",
      pageNum: "",
      myKey: "",
      result: "错",
      likeState: "否",
      selOver: false, //是否选择过
      selnum: -1
    };
  },
  components: {
    ImgAd
  },
  async asyncData({ params, query }) {
    //userId到时候要动态获取，vuex或者缓存或者其他方式登陆时存起来
    let { data } = await axios.get(
      `http://127.0.0.1:7001/api/client/simpleAnswer?userId=${query.userId}&categoryId=${query.categoryId}&chapterId=${query.chapterId}`
    );
    console.log(data);
    if (data.data.length == 0) {
      return {
        isEmpty: true
      };
    }

    return {
      simpleAnswer: data.data[0]
    };
  },
  methods: {
    async sel(n) {
      if (this.showKey) {
        return false;
      }

      if (n === 0) {
        this.showKey = true;
        this.selnum = 0;
        this.myKey = "A";
      } else {
        this.answerErr();
        this.showKey = true;
        this.selnum = 1;
        this.myKey = "B";
      }
      this.selOver = true;
    },
    showKey() {
      this.answerResult = true;
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
      if (data.code === 200) {
        alert("收藏成功");
      } else if (data.code === 201) {
        alert("删除收藏成功");
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
  display: flex;
  width: $pageWidth;
  margin: $setCenter;
  margin-top: 30px;
  .left {
    flex: 1;
  }
  ul {
    padding: 0;
  }
  .selHover {
    &:hover {
      background: rgb(85, 140, 223);
      color: #fff;
    }
  }
  .selItem {
    list-style: none;
    margin: 8px 0;
    cursor: pointer;
    width: 70%;
    padding: 8px 0;
  }
  .selItem2 {
    background: rgb(85, 140, 223);
    color: #fff;
  }
}
.keyBox {
  display: flex;
  li {
    list-style: none;
    margin-right: 26px;
  }
  .key /deep/ p {
    display: inline-block;
  }
}
</style>
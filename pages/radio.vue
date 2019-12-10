<template>
  <div>
    <!-- <nuxt-link to="#" v-for="(item,index) in radioList " :key="index">
      <div v-html="item.title"></div>
    </nuxt-link>-->
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
    //userId到时候要动态获取，vuex或者缓存或者其他方式登陆时存起来
    let { data } = await axios.get(
      `http://127.0.0.1:7001/api/client/radio?userId=${query.userId}&categoryId=${query.categoryId}&chapterId=${query.chapterId}`
    );
    console.log("sss", data.data[0]);
    return {
      radio: data.data[0]
    };
  },
  methods: {
    async like(){//收藏
      let {data}= await axios.post('http://127.0.0.1:7001/api/client/like',{ userId:'5db7c8aa3db42c373cdb2974', categoryId:this.radio.category_id, chapterId:this.radio.chapter_id, questionId:this.radio._id});
      console.log("like result",data);
    },
    async next() {
      let { data } = await axios.get(
        `http://127.0.0.1:7001/api/client/radio?userId=5db7c8aa3db42c373cdb2974&categoryId=${this.radio.category_id}&chapterId=${this.radio.chapter_id}&pre=1&_id=${this.radio._id}`
      );
      console.log("next question", data.code);
      if (data.code === 205) {
        alert("已经是最后一题");
      } else {
        this.radio = data.data[0];
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
        this.radio = data.data[0];
      }
    }
  }
};
</script>

<style>
</style>
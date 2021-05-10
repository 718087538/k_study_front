<template>
  <div class="box">
    
    <section class="playBox">
      <p>{{lesson.name}}</p>
      <div class="lessonBox">
        <div class="left">
          <div id="mse"></div>
        </div>
        <div class="right">
            <div class="chapterBox" v-for="(item,index) in chapterList" :key="index">
              <h4>章节：{{index}} - {{item.chapterName}}</h4>
                <nuxt-link  v-for="(item2,index2) in item.videoLessons" :key="index2" :to="{ path: `/play/${item2.id}`}">
                  <p>{{item2.name}}</p>
                </nuxt-link>
            </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { getCourseInfo,videoLesson } from "@/plugins/api/course";
export default {
  name: "",
  data() {
    return {
      uid: "",
      categoryUuid: "",
      isLogin: false, //是否登陆的状态
      
      selfExam: [], //自学考试类
      comPuterList: [],
      userName: "",
      firstCategories: [],
      firstCategoryIndex: 0,
      classListIndex: 0,
      levelIndex: 0,
      secondCategories: [],
      threeCategories: [],

      lesson:null,
      play:null,
      chapterList: [],
    };
  },
  async asyncData({ params }) {
    console.log("query",params)
    let para = {
      id: params.id,
    };
    let lesson = await videoLesson(para);
    console.log("courseInfo", lesson);

    return {
      lesson: lesson[0],
    };
  },

  components: {},
  methods: {
    initPlayer() {
      if (process.client) {
        const Player = require("xgplayer");
        this.player = new Player({
          id: "mse",
          url:this.lesson.videoUrl,
          playsinline: true,
          whitelist: [""],
        });
      }
    },
    async getCourseList(){
      let para = {
        videoCourseId: this.lesson.videoCourseId,
      };
      let chapterList = await getCourseInfo(para);

      console.log("课程的列表", chapterList);

      this.chapterList = chapterList
    },
    signOut() {
      localStorage.setItem("isLogin", "false"); //记录状态为登陆。
      localStorage.removeItem("token");
      localStorage.removeItem("uid");
      localStorage.removeItem("email");
    },
    changeCategory(type, index) {
      console.log(`类型是${type},index是${index}`);
      switch (type) {
        case "firstCategory":
          this.firstCategoryIndex = index;
          break;
        case "classList":
          this.classListIndex = index;
          break;
        case "level":
          this.levelIndex = index;
          break;
      }
    },
  },
  computed: {
    displayShow() {
      for (let i in this.secondCategories) {
        let tmp = this.secondCategories[i].threeCategoryList;
        for (let j in tmp) {
          if (this.categoryUuid === tmp[j].uuid) {
            return this.secondCategories[i].id;
          }
        }
      }
    },
  
  },
  mounted() {
    this.initPlayer();
    this.getCourseList()
    // let tmp = localStorage.getItem("isLogin"); //得到的tmp是string类型的值,第一次赋值时boolean类型
    // console.log("tmp值", tmp);
    // if (tmp == "true") {
    //   console.log("进入了string的true");
    //   this.isLogin = true;
    // } else {
    //   console.log("进入了false");
    //   this.isLogin = false;
    // }
    // console.log(this.isLogin);
    // this.userName = localStorage.getItem("email");
    // this.uid = localStorage.getItem("uid");
  },
};
</script>

<style lang="scss" scoped>
$pageWidth: 1200px;
$setCenter: 0 auto;
$hoverColor: red;
$font: 14px/1.5 "PingFang SC", "微软雅黑", "Microsoft YaHei", Helvetica,
  "Helvetica Neue", Tahoma, Arial, sans-serif;
.setDisplayShow {
  display: block !important;
}

.playBox {
  width: 800px;
  margin: 30px auto;
  border: 1px solid red;
  .lessonBox{
    display: flex;  
  }
}
</style>

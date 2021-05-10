<template>
  <div class="box">
    <section class="courseIntro">
      <div class="left">
        <img src="https://www.51zxw.net/m/img/kcbm/938.jpg" alt="" />
        <div>
          <img
            style="width: 30px; float: right"
            src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2150579574,289106176&fm=26&gp=0.jpg"
            alt=""
          />
        </div>
      </div>
      <div class="right">
        <p class="title">Word2019视频教程</p>
        <p>
          共 <span>23</span> 小节 已有<span>14659</span>人学过
          <span>2021年4月</span> 推出
        </p>
        <div class="intro">
          系统讲解Word2019从基础操作到简单文档排版、制表和图文混排、规范排版和办公自动化、长文档编辑和文档安全等内容。教程讲解由浅入深，循序渐进，零基础的同学也可以学习。
        </div>
      </div>
    </section>

    <section class="courseBox">
      <div class="top"></div>
      <div class="content">
        <div class="left">
          <div class="chapterBox" v-for="(item,index) in chapterList" :key="index">
            <h2>章节：{{index}} - {{item.chapterName}}</h2>
              <nuxt-link  v-for="(item2,index2) in item.videoLessons" :key="index2" :to="{ path: `/play/${item2.id}`}">
                <p>{{item2.name}}</p>
              </nuxt-link>
          </div>
        </div>
        <div class="right">老师介绍</div>
      </div>
    </section>

    <el-pagination
      class="pagination"
      background
      layout="prev, pager, next"
      :total="1000"
    >
    </el-pagination>
    <footer class="footer">
      <h1>末尾</h1>
    </footer>
  </div>
</template>

<script>
import { getCourseInfo } from "@/plugins/api/course";

export default {
  name: "",
  data() {
    return {
      uid: "",
      categoryUuid: "",
      isLogin: false, //是否登陆的状态
      chapterList: [],
      selfExam: [], //自学考试类
      comPuterList: [],
      userName: "",
      firstCategories: [],
      firstCategoryIndex: 0,
      classListIndex: 0,
      levelIndex: 0,
      secondCategories: [],
      threeCategories: [],
    };
  },
  async asyncData({ params }) {
    let para = {
      videoCourseId: params.id,
    };
    let courseInfo = await getCourseInfo(para);
    console.log("courseInfo", courseInfo);
  
    // let { firstCategories } = await clientCategory(params);
    // let para = {
    //   threeCategoryUuid: params.uuid,
    // };
    // let courseList = await videoCourse(para);
    // console.log("courseList", courseList);

    return {
      
      chapterList:courseInfo
    };
  },

  components: {},
  methods: {
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

.courseIntro {
  width: $pageWidth;
  margin: 30px auto;
  border: 1px solid red;
  display: flex;
  .left {
    margin-right: 30px;
  }
  .right {
    flex: 1;
    .title {
      font-size: 30px;
    }
    .intro {
      margin-top: 30px;
      text-indent: 2em;
    }
  }
}

.courseBox {
  width: $pageWidth;
  margin: 30px auto;
  border: 1px solid rgb(30, 255, 0);
  .content {
    display: flex;
    .left {
      flex: 1;
    }
    .right {
      width: 300px;
      border: 1px solid rgb(27, 92, 19);
    }
  }
}
</style>

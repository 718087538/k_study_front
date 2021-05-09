<template>
  <div class="box">
    <section class="header">
      <div class="content">
        <div class="left">欢迎分类页面</div>
        <div class="right" v-if="!isLogin">
          <nuxt-link :to="{ path: 'login/' }">登陆</nuxt-link>
          <nuxt-link :to="{ path: 'register/' }">注册</nuxt-link>
        </div>
        <div class="right" v-if="isLogin">
          <el-dropdown>
            <span class="el-dropdown-link">
              用户：{{ userName }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <nuxt-link :to="{ path: 'myData/', query: { uid: uid } }"
                  >修改资料</nuxt-link
                >
              </el-dropdown-item>
              <el-dropdown-item>
                <div @click="signOut">退出登陆</div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </section>

    <section class="courseCategory">
      <div class="tab direction">
        <ul>
          <li
            class="secondItem"
            v-for="(item, index) in secondCategories"
            :key="index"
            :class="{ seled:item.id == displayShow }"
            @click="changeCategory('firstCategory', index)"
          >
            <span>{{ item.secondCategory }}</span>

            <div class="subtab" :class="{setDisplayShow:item.id == displayShow}">
              <ul>
                <li
                  v-for="(item2, index2) in item.threeCategoryList"
                  :key="index2"
                  @click="changeCategory('classList', index)"
                >
                  <nuxt-link :to="{ path: `/category/${item2.uuid}` }" :class="{ seled: item2.uuid === categoryUuid }">{{item2.title}} </nuxt-link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>

      <div class="tab" v-if="false">
        <div class="name">难度：</div>
        <ul>
          <li
            v-for="(item, index) in level"
            :key="index"
            :class="{ seled: index === levelIndex }"
            @click="changeCategory('level', index)"
          >
            {{ item.title }}
          </li>
        </ul>
      </div>
    </section>
    <section class="courseList">
      <ul>
        <li v-for="(item, index) in courseList" :key="index">
          <img :src="item.cover" alt="" />
          <div class="intro">
            <p>{{ item.title }}</p>
            <p>已有{{ item.studyTimes }}人学习</p>
            <div class="likeBtn">收藏</div>
          </div>
        </li>
      </ul>
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
import { clientCategory , videoCourse } from "@/plugins/api/course";

export default {
  name: "",
  data() {
    return {
      uid: "",
      categoryUuid:"",
      isLogin: false, //是否登陆的状态
      cateList: [],
      selfExam: [], //自学考试类
      comPuterList: [],
      userName: "",
      firstCategories: [],
      firstCategoryIndex: 0,
      classListIndex: 0,
      levelIndex: 0,
      secondCategories: [],
      threeCategories: [],
      level: [
        { id: 1, title: "入门" },
        { id: 1, title: "中等" },
        { id: 1, title: "困难" },
      ],
      courseList: [
        {
          id: 1,
          title: "从松是法国辣椒水地理空间拉萨空间的拉伸",
          imgSrc:
            "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2676935521,922112450&fm=11&gp=0.jpg",
          seeTimes: 10,
          level: "中级",
        },
        {
          id: 1,
          title: "从松是法国辣椒水地理空间拉萨空间的拉伸",
          imgSrc:
            "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2676935521,922112450&fm=11&gp=0.jpg",
          seeTimes: 10,
          level: "中级",
        },
        {
          id: 1,
          title: "从松是法国辣椒水地理空间拉萨空间的拉伸",
          imgSrc:
            "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2676935521,922112450&fm=11&gp=0.jpg",
          seeTimes: 10,
          level: "中级",
        },
        {
          id: 1,
          title: "从松是法国辣椒水地理空间拉萨空间的拉伸",
          imgSrc:
            "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2676935521,922112450&fm=11&gp=0.jpg",
          seeTimes: 10,
          level: "中级",
        },
        {
          id: 1,
          title: "从松是法国辣椒水地理空间拉萨空间的拉伸",
          imgSrc:
            "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2676935521,922112450&fm=11&gp=0.jpg",
          seeTimes: 10,
          level: "中级",
        },
        {
          id: 1,
          title: "从松是法国辣椒水地理空间拉萨空间的拉伸",
          imgSrc:
            "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2676935521,922112450&fm=11&gp=0.jpg",
          seeTimes: 10,
          level: "中级",
        },
        {
          id: 1,
          title: "从松是法国辣椒水地理空间拉萨空间的拉伸",
          imgSrc:
            "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2676935521,922112450&fm=11&gp=0.jpg",
          seeTimes: 10,
          level: "中级",
        },
        {
          id: 1,
          title: "从松是法国辣椒水地理空间拉萨空间的拉伸",
          imgSrc:
            "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2676935521,922112450&fm=11&gp=0.jpg",
          seeTimes: 10,
          level: "中级",
        },
        {
          id: 1,
          title: "从松是法国辣椒水地理空间拉萨空间的拉伸",
          imgSrc:
            "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2676935521,922112450&fm=11&gp=0.jpg",
          seeTimes: 10,
          level: "中级",
        },
        {
          id: 1,
          title: "从松是法国辣椒水地理空间拉萨空间的拉伸",
          imgSrc:
            "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2676935521,922112450&fm=11&gp=0.jpg",
          seeTimes: 10,
          level: "中级",
        },
        {
          id: 1,
          title: "从松是法国辣椒水地理空间拉萨空间的拉伸",
          imgSrc:
            "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2676935521,922112450&fm=11&gp=0.jpg",
          seeTimes: 10,
          level: "中级",
        },
        {
          id: 1,
          title: "从松是法国辣椒水地理空间拉萨空间的拉伸",
          imgSrc:
            "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2676935521,922112450&fm=11&gp=0.jpg",
          seeTimes: 10,
          level: "中级",
        },
        {
          id: 1,
          title: "从松是法国辣椒水地理空间拉萨空间的拉伸",
          imgSrc:
            "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2676935521,922112450&fm=11&gp=0.jpg",
          seeTimes: 10,
          level: "中级",
        },
      ],
    };
  },
  async asyncData({ params }) {

    let  { firstCategories}  = await clientCategory(params);

    console.log("》》》", JSON.stringify(firstCategories))

    let  courseList  = await videoCourse();
    // console.log("res", courseList);

    return {
      firstCategories:firstCategories,
      secondCategories:firstCategories[0].secondCategories,
      // threeCategories:threeCategories,
      courseList,
      categoryUuid:params.uuid
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
  computed:{
    displayShow(){
      for(let i in this.secondCategories){
        let tmp = this.secondCategories[i].threeCategoryList
        for(let j in tmp){
          if(this.categoryUuid === tmp[j].uuid){
            
            return this.secondCategories[i].id
          }
        }
      }
    }

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
.setDisplayShow{
  display:  block  !important;
}

.header {
  background: rgba(202, 199, 202, 0.533);
  height: 30px;
  .content {
    display: flex;
    line-height: 30px;
    justify-content: space-between;
    width: 1000px;
    margin: 0 auto;
    a {
      margin: 0 10px;
      color: #333;
      text-decoration: none;
      &:hover {
        color: rgb(228, 20, 20);
      }
    }
  }
}
.courseCategory {
  width: $pageWidth;
  margin: 30px auto;
  .tab {
    display: flex;
    margin: 40px 0;
    position: relative;
    border: 1px solid red  ;
    height: 70px;
    .secondItem:hover .subtab{
      display: block !important;
      background: rgb(94, 85, 85);
      z-index: 1;
    }
    .subtab{
      width: 600px;
      display: none;
      position: absolute;
      height: 40px;
      border: 1px solid green;

      left: 0px;
      top: 30px;
      color: #333;
      a{
        color: #333;
        text-decoration: none;
      }
    }
  }
  ul {
    flex: 1;
    display: flex;
    padding: 0;
    li {
      list-style: none;
      margin-right: 20px;
      cursor: pointer;
    }
    .seled {
      color: red !important;
      background: rgba(242, 13, 13, 0.06);
    }
  }
}
.courseList {
  width: $pageWidth;
  margin: $setCenter;
  ul {
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    li {
      width: 282px;
      height: 270px;
      list-style: none;
      margin: 0 24px 24px 0;
      box-shadow: 0 4px 8px 0 rgb(95, 101, 105);
      border-radius: 8px;
      background-color: #fff;
      transition: all 0.2s;
      overflow: hidden;
      cursor: pointer;

      &:hover {
        margin-top: -6px;
        box-shadow: 0 10px 10px 0 rgb(79, 84, 87);
      }
      img {
        width: 100%;
        height: 152px;
      }
      .intro {
        padding: 0 10px;
        box-sizing: border-box;
        font: $font;
        color: #545c63;
        .likeBtn {
          float: right;
        }
      }
    }
    li:nth-child(4n + 4) {
      margin-right: 0 !important;
    }
  }
}
.direcBox {
  background: #f2f2f2;
  overflow: hidden;
  padding: 30px 0;
  .navBox {
    width: $pageWidth;
    margin: $setCenter;

    .contentBox {
      display: flex !important;
      justify-content: space-between;
      height: 400px;
      .left {
        width: 240px;
        background: #e9e7e6;
        border-radius: 8px;
        margin-right: 10px;
        box-sizing: border-box;

        ul {
          padding: 20px 0;
          position: relative;

          li {
            list-style: none;
            background: #e9e7e6;
            cursor: pointer;
            &:hover {
              background: #fff;
              .infoBox {
                display: block;
              }
            }

            .infoBox {
              position: absolute;
              display: none;
              z-index: 100;
              left: 236px;
              top: 0;
              width: 600px;
              height: 400px;
              background: #fff;
              border-radius: 0 10px 10px 0;
            }
            .listTitle {
              width: 100%;
              overflow: hidden;
              white-space: nowrap;
              padding: 10px;
              text-overflow: ellipsis;
            }
          }
        }
      }
      .right {
        flex: 1;
        border-radius: 8px;
        overflow: hidden;
        .swiperImg {
          width: 100%;
          height: 100%;
        }
      }
    }

    nav {
      width: $pageWidth;
      margin: $setCenter;
      line-height: 40px;
      a {
        color: #fff;
        display: inline-block;
        width: 100px;
        text-align: center;
        text-decoration: none;
        &:hover {
          background: rgb(255, 114, 0);
        }
      }
      .sel {
        background: rgb(255, 114, 0);
        margin: 0;
        border: 0;
      }
    }
  }
}
</style>

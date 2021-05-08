<template>
  <div class="box">
    <section class="header">
      <div class="content">
        <div class="left">欢迎来开***</div>
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
    <section class="direcBox">
      <div class="navBox">
        <div class="contentBox">
          <div class="left">
            <ul>
              <li
                v-for="(item, index) in firstCategories"
                :key="index"
                :class="{ seled: index === firstCategoryIndex }"
              >
                <div class="listTitle">
                  <span>{{ item.firstCategory }}</span>
                  :
                  <span
                    v-for="(item2, index2) in item.secondCategories"
                    :key="index2"
                    >{{ item2.secondCategory }} /</span
                  >
                </div>

                <!-- 悬浮显示 -->
                <div class="infoBox">
                  <h2>{{ item.firstCategory }}</h2>
                  <div
                    v-for="(item2, index2) in item.secondCategories"
                    :key="index2"
                  >
                    {{ item2.secondCategory }} ->
                    <!-- <span v-for="(item3,index3) in item2.threeCategoryList" :key="index3">{{item3.title}} | </span> -->
                    <nuxt-link 
                    v-for="(item3,index3) in item2.threeCategoryList" 
                    :key="index3" 
                    :to="{ path: `category/${item3.uuid}` }">{{item3.title}} | </nuxt-link>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="right">
            <el-carousel height="400px">
              <el-carousel-item
                v-for="(item, index) in swiperList"
                :key="index"
              >
                <img class="swiperImg" :src="item.src" alt="" />
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
        <div class="bottomBox"></div>
        <nav>
        <a href="javascript:void(0)" class="sel">首页</a>
        <nuxt-link :to="{ path: 'like/', query: { uid: 1 } }">我的收藏</nuxt-link>
        <nuxt-link :to="{ path: 'err/', query: { uid: 1 } }"
          >错题本</nuxt-link>
      </nav>
      </div>
    </section>
    <section class="courseCategory">
      <div class="tab direction">
        <div class="name">方向：</div>
        <ul>
          <li
            v-for="(item, index) in firstCategory"
            :key="index"
            :class="{ seled: index === firstCategoryIndex }"
            @click="changeCategory('firstCategory', index)"
          >
            {{ item.title }}
          </li>
        </ul>
      </div>
      <div class="tab">
        <div class="name">分类：</div>
        <ul>
          <li
            v-for="(item, index) in classList"
            :key="index"
            :class="{ seled: index === classListIndex }"
            @click="changeCategory('classList', index)"
          >
            {{ item.title }}
          </li>
        </ul>
      </div>
      <div class="tab">
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
      <ul v-if="false">
        <li v-for="(item, index) in courseList" :key="index">
          <img :src="item.imgSrc" alt="" />
          <div class="intro">
            <p>{{ item.title }}</p>
            <p>{{ item.level }}~{{ item.seeTimes }}人学习</p>
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
import { indexCategory } from "../plugins/api/course";

export default {
  name: "",
  data() {
    return {
      uid: "",
      isLogin: false, //是否登陆的状态
      cateList: [],
      selfExam: [], //自学考试类
      comPuterList: [],
      userName: "",
      firstCategories: [],
      firstCategoryIndex: 0,
      classListIndex: 0,
      levelIndex: 0,
      firstCategory: [
        { id: 1, title: "前端" },
        { id: 1, title: "前端" },
        { id: 1, title: "前端" },
        { id: 1, title: "前端" },
      ],
      classList: [
        { id: 1, title: "HTML" },
        { id: 1, title: "HTML" },
        { id: 1, title: "HTML" },
        { id: 1, title: "HTML" },
      ],
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
      swiperList: [
        {
          src:
            "http://edu-image.nosdn.127.net/318d882bd0ef4d4d847992978e2ea163.jpg?imageView&quality=100",
        },
        {
          src:
            "http://edu-image.nosdn.127.net/4a7f00d2f0b64843910538d02a0a6770.png?imageView&quality=100",
        },
        {
          src:
            "http://edu-image.nosdn.127.net/cea243532f644683935a4f4887789ce6.png?imageView&quality=100",
        },
        {
          src:
            "http://edu-image.nosdn.127.net/318d882bd0ef4d4d847992978e2ea163.jpg?imageView&quality=100",
        },
      ],
    };
  },
  async asyncData() {
    let {firstCategories} = await indexCategory();
    return {
      firstCategories: firstCategories,
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
      let _idl = 4
      this.$router.push({ path: `/category/${_idl}`});

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
    margin: 16px 0;
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
      color: red;
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

.pagination {
  text-align: center;
  margin-top: 20px;
}
footer {
  color: rgb(92, 25, 25);
  margin-top: 30px;
  padding: 50px 0;
  background: rgb(161, 159, 159);
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>

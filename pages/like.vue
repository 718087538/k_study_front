<template>
  <div class="box">
      <li v-for="(item,index) in cateList" :key="index">
          <nuxt-link :to="{path:'/likeChapter/',query: {userId: '5db7c8aa3db42c373cdb2974',categoryId:item._id }}">
            {{item.name}}
          </nuxt-link>
      </li>
     <button>
        单选收藏
      </button>
     <button>
        <nuxt-link :to="{path:'like/',query: {userId: '34654354' }}">简单收藏</nuxt-link>
      </button>
  </div>
</template>

<script>
import axios from "axios";

export default {
    
name: "",
  data() {
    return {
        cateList:[]
    };
  },
  async asyncData({params, query}) {
    let { data } = await axios.get(`http://127.0.0.1:7001/api/client/likeCategory?userId=5db7c8aa3db42c373cdb2974`);
    console.log(data.data);
    
    return {
        cateList:data.data
    }
  },
  components: {}
}
</script>

<style>

</style>
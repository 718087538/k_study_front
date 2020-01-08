<template>
  <div class="box">
      <h1>错题题库</h1>
      <li v-for="(item,index) in cateList" :key="index">
          <nuxt-link :to="{path:'/errChapter/',query: {userId: '5db7c8aa3db42c373cdb2974',categoryId:item._id }}">
            {{item.name}}
          </nuxt-link>
      </li>
  </div>
</template>
err
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
    let { data } = await axios.get(`http://127.0.0.1:7001/api/client/errCategory?userId=5db7c8aa3db42c373cdb2974`);
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
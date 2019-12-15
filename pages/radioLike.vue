<template>
  <div class="box">
    <h1>单选收藏</h1>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      cateList: []
    };
  },
  async asyncData() {
    let { data } = await axios.get(`http://127.0.0.1:7001/api/category`);
    console.log(data.data);
    return {
      cateList: data.data
    };
  },
  components: {}
};
</script>

<style>
</style>
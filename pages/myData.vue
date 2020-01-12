<template>
  <div>
    <h1>我的资料</h1>
    <ul>
      <li>
        <p>修改昵称</p>
        <input type="text" v-model="name" />
        <button @click="changeData">确定</button>
      </li>
      <li>
        <p>修改密码</p>
        <input type="text" placeholder="原密码" />
        <input type="text" placeholder="新密码" />
        <input type="text" placeholder="重复密码" />
        <button>确定</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data(){
    return {
      name:""
    }
  },


  methods:{
  async  changeData(){
    console.log(localStorage.getItem('uid'),this.name);
        let { data } = await axios.post(
        "http://127.0.0.1:7001/api/client/changeData",
        {
          uid: localStorage.getItem("uid"),
          name: this.name,
        }
      );
      console.log(data);
    }
  }
};
</script>

<style>
</style>
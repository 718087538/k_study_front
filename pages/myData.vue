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
        <input type="text" placeholder="原密码"  v-model="oldPassword"/>
        <input type="text" placeholder="新密码" v-model="newPassword"/>
        <input type="text" placeholder="重复密码" v-model="reNewPassword" />
        <button @click="changePass">确定</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data(){
    return {
      name:"",
      oldPassword:"",
      newPassword:"",
      reNewPassword:"",
    }
  },


  methods:{
  async  changeData(){
        let { data } = await axios.post(
        "http://106.53.238.187:8003/api/client/changeData",
        {
          uid: localStorage.getItem("uid"),
          name: this.name,
        }
      );
      if(data.code === 200){
        alert("修改成功");
      }
    },
  async  changePass(){
    if(this.oldPassword == ""){
      alert("请输入原密码");
      return false;
    }
    if(this.newPassword == ""){
      alert("请输入新密码");
      return false;

    }
    if(this.reNewPassword == ""){
      alert("请再次输入新密码");
      return false;

    }
    if(this.newPassword != this.reNewPassword){
      alert("两次新密码不一致！");
      return false;

    }
        let { data } = await axios.post(
        "http://106.53.238.187:8003/api/client/changePassword",
        {
          uid: localStorage.getItem("uid"),
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
          reNewPassword: this.reNewPassword,
        }
      );
      console.log("改密返回状态",data);
      if(data.code === 200){
        alert("修改成功");
      }else{
        alert("原密码错误");
      }
    }
  }
};
</script>

<style>
</style>
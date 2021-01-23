<template>
  <!-- <div id="app">
    <van-uploader :after-read="afterRead" v-model="fileList" multiple :max-count="9"/>
      <router-view />
  </div> -->
  <div>
    
      <router-view />
      <van-tabbar route active-color="rgb(20,255,20)" v-show="$route.path == '/chat' || $route.path == '/list' || $route.path == '/mine'">
        <van-tabbar-item replace to="/chat" icon="chat-o">聊天</van-tabbar-item>
        <van-tabbar-item replace to="/list" icon="friends-o">联系人</van-tabbar-item>
        <van-tabbar-item replace to="/circle" icon="search">朋友圈</van-tabbar-item>
        <van-tabbar-item replace to="/mine" icon="home-o">个人</van-tabbar-item>
      </van-tabbar> 
  </div>
</template>

<script>
// import Vue from 'vue';

// import axios from 'axios'



export default {
  name: 'App',
  components: {
    
  },
  data(){
    return{
      active: 'search',
    }
  }
  // data() {
  //   return {
  //     fileList: [
  //       // {url:'',
  //       // status:'done',
  //       // message: '上传中...'}
  //     ]
  //   }
  // },
  // methods:{
  //   //读取图片
  //   async afterRead(file) {
  //     console.log('end');
  //     console.log(file);
  //     let arr = []
  //     file.forEach(item => {
  //       arr.push(item.content)
  //     });
  //     console.log(arr);
  //     // let data = file.content;
  //     let result = await axios.post('http://localhost:2008/ts', {data:JSON.stringify(arr)});
  //     // let imgSrc = result.data.imgSrc;
  //     // console.log(imgSrc);
  //     // this.fileList.push({url:imgSrc})
  //     // this.fileList = [{url:imgSrc}]
  //     console.log('this',this.fileList);
  //     console.log('result',result);
  //   },
  // }
}
</script>

<style>

</style>

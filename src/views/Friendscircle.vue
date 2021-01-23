<template>
  <div>
    <van-nav-bar title="FriendCircle" left-text="返回" @click-left="$router.push('/chat')" :fixed="true"
      :placeholder="true" />
    <header style="position:relative">
      <!-- <img :src="userInfo.imgSrc" alt="" style="width:100%;height:15%"> -->
      <img src="https://img.yzcdn.cn/vant/cat.jpeg" alt="" style="width:100%;height:15%">
      <div id="pic" style="width:20%;height:25%;position: absolute;right: 5%;top:85%">
        <img :src="userInfo.imgSrc" alt="" style="width:100%;height:100%">
        <!-- <img src="https://img.yzcdn.cn/vant/cat.jpeg" alt="" style="width:100%;height:100%"> -->
      </div>
      <!-- <div style="position:absolute;left:5%;top:5%;font-size:25px;">
        <van-icon name="revoke" @click="$router.push('/chat')" />
      </div> -->
      <div style="position:absolute;right:5%;top:5%;font-size:25px;">
        <van-icon name="add-o" @click="$router.push('/adit')" />
      </div>
    </header>
    <!-- <van-skeleton title avatar :row="3" v-for="item in list" :key="item.id" style="border-bottom:1px solid #e6e6e6;padding:5vh 0"/> -->
    <div class="main" style="padding-bottom:50px">
      <div :v-if="list.length>0" v-for="(item,idx) in list" :key="item._id"
        style="border-bottom:1px solid #e6e6e6;padding:2vh 0;background-color:eeeeee">
        <div class="left" style="width:13%;display:inline-block;height:100%;vertical-align:top;padding:0 1%">
          <img :src="item.imgSrc?item.imgSrc:'https://img.yzcdn.cn/vant/cat.jpeg'" alt=""
            style="width:100%;height:100%">
        </div>
        <div class="right" style="width:85%;display:inline-block;height:100%;position:relative">
          <p style="margin:0;font-weight:bold;font-size:16px;color:rgb(77,101,135)">
            {{item.username?item.username:idx+'测试'}}</p>

          <p style="overflow:hidden;word-wrap:break-word;padding:0 5%;font-size:14px">{{item.description}}</p>

          <div style="display:flex;flex-wrap: wrap;">
            <img v-for="(ele,idx) in item.media" :key="idx" :src="ele.imgSrc" alt="" style="width:80px;max-width:80;height:75px;max-height:35%">

          </div>

          <!-- 点赞评论区 -->
          <div style="text-align:right;">
            <b @click="show(idx)"
              style="height:24px;background-color:#eee;border-radius:30%;margin-top:3%;float:right;width:8%;font-size:16px;padding:0;margin-right:5%;text-align:center">..</b>
            <b ref="box" v-show="current==idx"
              style="border-radius:10%;width:99px;float:right;border:1px solid #999;margin-top:3%;background-color:#767676">
              <span style="float:left;text-align:center;width:50%;color:white;font-weight:normal;font-size:18px"
                @click="love(userInfo._id,item._id)">
                <van-icon name="thumb-circle-o" /></span>
              <span style="float:right;text-align:center;width:50%;color:white;font-weight:normal;font-size:18px"
                @click="showInp(idx)">
                <van-icon name="chat-o" /></span>

            </b>

          </div>
          <div style="background-color">
            <span style="font-size:12px;">{{item.like.length == 0 ?'':item.like.length +'人觉得很赞'}}</span>
          </div>
          <div v-show="current==idx" style="width:90%;font-size:16px">
            <input type="text" ref="comments" v-show="keys" v-model="event" @keyup.enter="talk(userInfo._id,item._id)">
          </div>
          <div style="background-color:#eee;width:90%;font-size:16px">
            <p v-for="(com,idx) in item.comments" :key="idx">{{com.username+':'+com.comments}}</p>
          </div>

        </div>
      </div>
      <div>
        <van-notice-bar color="#999" background="#ecf9ff" left-icon="info-o">
          暂无更多数据，我来<a style="color:blue;cursor: pointer;" @click="gotoEdit">发一条</a>
        </van-notice-bar>
      </div>
    </div>

  </div>

</template>

<script>
  // import vant from 'vant'

  export default {
    data() {
      return {
        list: [],
        userInfo: '',
        // userId:'6005a09a454af942d9a62e45',
        current: 10000,
        keys: false,
        event: ''
      };
    },
    methods: {
      async getcircle() {
        let data = {
          _id: this.userInfo._id, //用户ID
          // _id:"6005a09a454af942d9a62e45",//用户ID
        }
        let result = await this.$ajax.get('/circle/getCircle', {
          params: {
            data
          }
        });
        console.log(result);
        this.list = result.data.data.reverse()
      },
      show(idx) {
        this.current = idx;
      },
      async love(userId, _id) {
        let data = {
          userId,
          _id,
          like: 0,
        };
        console.log(data);
        let result = await this.$ajax.post('/circle/updateCircle', {
          data
        });
        console.log(result);
        console.log(666);
        this.list = result.data.data.reverse()

        this.current = 10000;
      },
      async talk(userId, _id) {
        if (this.event == '') {
          return
        }
        let data = {
          userId,
          _id,
          comments: this.event,
        };
        console.log(data);
        let result = await this.$ajax.post('/circle/updateCircle', {
          data
        });
        // console.log(result);
        // console.log(666);
        this.event = ''
        // this.keys=false
        this.list = result.data.data.reverse()

        this.current = 10000;
      },
      showInp(idx) {
        if (!this.keys) {
          this.keys = true;
          // let txt = document.querySelectorAll('input')
          // txt[idx].value = 232
          // console.log(txt,txt[0]);
          // this.$refs.comments[idx]
          // console.log(this.$refs.comments[idx]);
        } else {
          this.keys = false;
        }
      },
      gotoEdit(){
        this.$router.replace('/adit')
      }


    },
    created() {
      this.userInfo = this.$store.state.user.userInfo
      this.getcircle()
    },
  }
</script>



<style scoped>
  header {
    position: relative;
    margin-bottom: 5vh;
  }

  ;
  /* header #pic{position: absolute;right: 0;} */
</style>
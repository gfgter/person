<template>
  <div class="contain" :sticky="true">
    <van-nav-bar :fixed="true" :placeholder="true" title="个人中心" class="nav" style="background: #58bc58">个人中心

    </van-nav-bar>
    <van-cell-group v-for="(item, idx) in userlist" :key="idx">
      <van-cell title="头像" value="item.imgSrc" is-link center>
        <template>
          <div>
            <van-image :src="item.imgSrc" height="48px" width="48px" radius="10px">
            </van-image>
          </div>
        </template>
      </van-cell>
      <van-cell title="昵称" :value="item.username" is-link />
      <van-cell title="性别" :value="item.sex" is-link />
      <van-cell title="电话" :value="item.tel" is-link />

      <van-cell title="更多" is-link />
    </van-cell-group>
    <van-cell-group class="t-3">
      <van-cell title="我的地址" is-link />
    </van-cell-group>
    <van-cell-group class="t-3" v-for="(item, idx) in userlist" :key="idx">
      <van-cell title="个性签名" is-link :value="item.sign" />
    </van-cell-group>
    <div style="display:flex;flex-direction: column;align-items: center;justify-content:center;padding-top:15%;background-color:white">
        <van-button type="success" size="small" style="border-radius:15px;background-color:skyblue;border:0;width:85px;margin-bottom:15px"
        @click="correct">修改资料</van-button>
      <van-button type="danger" size="small" style="border-radius:15px;background-color:rgba(250,0,0,.5);border:0;width:85px"
        @click="exit">退出登录</van-button>
    </div>
  </div>
</template>
<script>
  import{ Dialog} from 'vant';
  export default {
    name: "Mine",
    data() {
      return {
        userlist: [],
        id: "",
      };
    },
    methods: {
      exit() {
        Dialog.confirm({
            title: '退出登录',
            message: '是否退出登录',
          })
          .then(() => {
            // on confirm
            this.$store.commit('logout');
            this.$router.replace('/login');
          })
          .catch(() => {
            });
            // on cancel
      },
      correct(){
        this.$router.replace('/correct')
      }
    },
    async created() {
      this.userlist = [this.$store.state.user.userInfo]
      console.log([this.$store.state.user.userInfo]);
    },
  };
</script>
<style scoped>
  .contain {
    background: #eee;


  }

  .contain .t-3 {
    margin-top: 5px;
  }

  .contain img {
    width: 100%;
    height: 100%;
  }
</style>
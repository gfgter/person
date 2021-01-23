<template>
  <div class="contain" :sticky="true">
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @cancel="onCancel"
      />
     
    </form>

    <van-cell-group v-show="show" v-for="(item, idx) in pyszm" :key="idx">
      <van-cell :title="item.username" >
        <van-button
          icon="plus"
          type="primary"
          size="mini"
          @click="showPopup(item)"
          v-show="show1"
          >通过申请</van-button
        >
      </van-cell>
    </van-cell-group>
  </div>
</template>
<script>
// import Vue from "vue";
// import { Dialog } from "vant";
// Vue.use(Dialog);
export default {
  name: "sreach",
  data() {
    return {
      pyszm: [],
      value: "",
      show: false,
      userInfo:'',
      show1: false,
    };
  },
  methods: {
    async showPopup(item) {
      console.log("this=", item.username);
      let obj = {
        data: { username: this.userInfo.username},
        // data: { username: "二十八班首席甄雅威8" }, //查找自己的条件，如username：username或_id
        query: { _id: item._id }, //这里通过好友申请的id，具体在登录返回数据组的apply数组中
      };
      console.log(obj,"lll");
      let result = await this.$ajax.post("/user/pass", {
        data: obj,
      });
      if(result.data.code==200){
        this.$router.replace('/chat')
      }
      console.log(result);
    },
    async onSearch() {
      let t = true;
      this.show = t;

      //当输入框为空时，隐藏
      if (this.value == "") {
        return (this.show = false);
      }

      //
    },
    onCancel() {
      //   Toast("取消");
      this.$router.push({
        // name:'chathistory',
        path: "/list",
      });
    },
  },
  async created() {
    this.userInfo = this.$store.state.user.userInfo
    console.log(this.userInfo);
    let t = true;
    this.show = t;
    // let _id = "60050f066dea5419780b7119"; //用户ID
    let _id = this.userInfo._id; //用户ID

    let result = await this.$ajax.get(
      "/user/getApply",
      { params: { _id } }
    );
    console.log(result);
    let list = result.data.data;
    let obj = { username: result.data.msg };
    console.log("list=", obj);
    if (list.length == 0) {
      list.push(obj);
    //   this.show1 = true;
    }
    this.pyszm = list;
    console.log(list,"nhnh");
    if (this.pyszm[0].username != obj.username) {
      this.show1 = true;
    }
    // console.log("list=", this.pyszm);
    // console.log("数据=", this.$route.query.pyszm);
    // console.log("this=", this.pyszm);
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
</style>
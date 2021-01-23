<template>
  <div class="contain" :sticky="true">
    <form action="/">
      <van-search v-model="value" show-action placeholder="请输入搜索关键词" @input="onSearch" @cancel="onCancel" />
    </form>

    <van-cell-group v-show="show" v-for="(item, idx) in pyszm" :key="idx">
      <van-cell :title="item.username">
        <van-button type="primary" size="mini" @click="onAdd(item.username)">
          {{new RegExp('"'+userInfo._id+'"').test(JSON.stringify(item.friends))==true?'好友':'申请'}}

          <van-notify v-model="showFlag" :type="type">
            <van-icon name="bell" style="margin-right: 4px;" />
            <span>{{msg}}</span>
          </van-notify>

        </van-button>
      </van-cell>
    </van-cell-group>
  </div>
</template>
<script>
  import {
    Notify
  } from 'vant';
  export default {
    name: "sreach",
    data() {
      return {
        pyszm: this.$route.query.pyszm,
        value: "",
        show: false,
        // show1: false,
        // show2: false,
        userInfo: '',
        showFlag: false,
        type: 'success',
        msg:''
      };
    },
    methods: {
      async onAdd(item) {
        console.log("this=", item);
        let obj = {
          query: {
            username: item
          }, //这里写要添加好友的条件，如username:123456
          data: {
            _id: this.userInfo._id
          }, //这里_id：自己的id
        };
        let result = await this.$ajax.get(
          "/user/addFriend", {
            params: {
              data: obj
            },
          }
        );
        if(result.data.code==200){
          this.type = 'success'
        }else if(result.data.code==400){
          this.type = 'warning'
        }
        console.log(result);
        this.msg=result.data.msg
        this.showNotify()
      },
      async onSearch() {
        let t = true;
        this.show = t;

        //当输入框为空时，隐藏
        if (this.value == "") {
          return (this.show = false);
        }

        let data = {
          _id: this.userInfo._id, //条件查找
          keyword: {
            key: "username",
            word: this.value
          }, //模糊查找，不需要可不写
          dbname: "users", //查找的类型（users：用户；chathistory：聊天历史；friendscircle：朋友圈历史），默认users，默认可不写
        };
        let result = await this.$ajax.get(
          "/user/search2", {
            params: {
              data,
            },
          }
        );
        // console.log(result.data.data);
        let list = result.data.data;
        let obj = {
          username: "查无此人"
        };
        // console.log("list=",list);
        if (list.length == 0) {
          list.push(obj);
          // this.show1 = false;
        }
        this.pyszm = list;
        // console.log("list=", this.pyszm);
      },
      onCancel() {
        //   Toast("取消");
        this.$router.push({
          // name:'chathistory',
          path: "/list",
        });
      },
      showNotify() {
        this.showFlag = true;
        setTimeout(() => {
          this.showFlag = false;
        }, 2000);
      },
    },
    created() {
      this.userInfo = this.$store.state.user.userInfo
      console.log("数据=", this.$route.query.pyszm);
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
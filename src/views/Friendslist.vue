<template>
  <div class="contain" :sticky="true" style="overflow:auto;margin:0 0 50px 0">

    <van-nav-bar :fixed="true" :placeholder="true" title="通讯录" class="nav" style="background: #58bc58"
      @click-left="onClickLeft" @click-right="onClickRight">通讯录
      <template #right>
        <van-icon name="search" size="18" />
      </template>
      <template #left>
        <van-icon size="20px" name="friends-o" :badge="num<=0?'':num" />

      </template>
    </van-nav-bar>

  <div v-if="nullObj(pyszm)">
      <van-index-bar>

        <div v-for="(item, idx) in pyszm" :key="idx">
          <van-index-anchor :index="idx" />
          <van-cell center v-for="(valItem, index) in item" :title="`${valItem.username}`" is-link :key="index"
            @click="dianji(valItem)">
            <template #icon>
              <van-image round :src="valItem.imgSrc" style="width: 44px; height: 44px"></van-image>
            </template>

            <div v-show="currentId==valItem._id">
              <button @click.stop="$router.push('/chat')"
                style="background-color:rgba(50,205,50,0.8);border:0;border-radius:10px;color:white;font-size:9px">聊天</button>
              <button @click.stop="del(valItem._id)"
                style="background-color:rgba(205,0,0,0.8);border:0;border-radius:10px;color:white;font-size:9px;margin-left:10px">删除</button>
            </div>
          </van-cell>
        </div>

      </van-index-bar>
    </div>
    <div v-else>
      <van-empty description="暂无好友列表" />
    </div>

  </div>
</template>
<script>
  import {
    Dialog
  } from 'vant';
  import vPinyin from "../utils/vue-py.js";
  export default {
    name: "Friendslist",
    data() {
      return {
        pyszm: {},
        userInfo: '',
        num: '',
        currentId: ''
      };
    },
    methods: {
      nullObj(d) {
        return Boolean(Object.keys(d).length > 0);
      },
      onClickLeft() {
        this.$router.push({
          path: "/add",
          query: {
            // pyszm: this.pyszm,
          },
        });
      },
      onClickRight() {
        this.$router.push({
          path: "/sreach",
          query: {
            // pyszm: this.pyszm,
          },
        });
        // console.log(1, id);
      },
      dianji(item) {
        console.log(item);
        if (this.currentId == item._id) {
          this.currentId = ''
        } else {
          this.currentId = item._id
        }
      },
      async del(op_id) {
        Dialog.confirm({
            title: '删除好友',
            message: '此操作将删除好友及其所有数据',
          })
          .then(async() => {
            let result = await this.$ajax.get('/user/deleteFriend', {
              params: {
                _id:this.userInfo._id,
                op_id
              }
            });
            console.log(result);
            window.location.reload();
            // on confirm
          })
          .catch(() => {
            // on cancel
          });
      }
    },
    async created() {
      this.userInfo = this.$store.state.user.userInfo
      // console.log(this.userInfo.apply.length,'length');
      // console.log(this.userInfo);
      let data = {
        _id: this.userInfo._id,
        // query: {}, //条件查找
        // keyword: { key: "username", word: "八" }, //模糊查找，不需要可不写
        //查找的类型（users：用户；chathistory：聊天历史；friendscircle：朋友圈历史），默认users，默认可不写
      };
      let newuserlist = await this.$ajax.get(
        "/user/getFriends", {
          params: {
            data,
          },
        }
      );

      var list = newuserlist.data.data || [];

      /******通讯录成员排序按字母 start******/
      const Letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let szm = {};
      //存储好友数据 {"A":[{},{}],"Y":[{},{}]}
      for (var i = 0; i < list.length; i++) {
        // 中文转拼音，但多音字转不了
        list[i].pinyin = vPinyin.chineseToPinYin(list[i].username);
        // 提取首字母并转成大写
        let aaa = list[i].pinyin[0].toUpperCase();
        //首字母不为汉字或字母时归到#中
        list[i].aaa = Letters.indexOf(aaa) > -1 ? aaa : "#";
        // 判断首字母是否存在，存在就push，不存在就创建新的属性
        if (szm[aaa]) {
          szm[aaa].push(list[i]);
        } else {
          szm[aaa] = [list[i]];
        }
      }
      //获取到key值并对key值排序
      let b = Object.keys(szm).sort();
      let result = [];
      // 排序
      for (var y = 0; y < b.length; y++) {
        var thisInitial = b[y]; // "B"

        result = szm[thisInitial].sort();

        szm[thisInitial] = result;
      }

      // 根据排序后的key遍历对象并重新赋值;
      b.forEach(function (key) {
        szm[key];
      });

      this.pyszm = szm;

      let result_ = await this.$ajax.get("/user/getApply", {
        params: {
          _id: this.userInfo._id
        }
      });
      this.num = result_.data.data.length;
      console.log(this.num);
      console.log(this.pyszm);

    },
    // components: {
    //   [Dialog.Component.name]: Dialog.Component,
    // },

  };
</script>
<style scoped>
  .nav {
    background: #58bc58;
  }

  ;
</style>
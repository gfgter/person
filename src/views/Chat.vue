<template>
    <div class="contain" style="overflow:auto;margin:0 0 50px 0">
        <div v-if="friends.length > 0">
            <van-nav-bar left-text="消息" :left-arrow="false" class="nav" :fixed="true" :placeholder="true" />
            <div class="row">
                <div class="friend" v-for="item in friends" :key="item._id" @click="goHistory(item._id,item.username)">
                    <div class="pic">
                        <img :src="item.imgSrc" alt="">
                    </div>
                    <div class="txt">
                        <p>{{item.username}}</p>
                        <p>消息</p>
                    </div>
                </div>
            </div>

        </div>
        <div v-else>
            <!-- <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                <van-swipe-item >珍惜有缘人</van-swipe-item>
                <van-swipe-item>此男子名东强，男，20岁，英俊潇洒。</van-swipe-item>
                <van-swipe-item>如想结识此人</van-swipe-item>
                <van-swipe-item>请前往添加李东强</van-swipe-item>
            </van-swipe> -->
            <div style="font-size:14px;color:#666666">
                <h2 style="text-align:center" class="tip">暂无好友，请前往添加好友聊天吧</h2>
                <p style="display:flex;justify-content:center">
                    <button class="addFriend" @click="$router.push('/sreach')" style="border:0;"><van-icon name="good-job-o" />添加好友</button></p>
            </div>
        </div>



    </div>
</template>
<script>
    export default {
        name: 'Chat',
        data() {
            return {
                friends: [],
                userId: ''
            }
        },
        async created() {
            console.log(this.$store.state.user.userInfo,'=======');
            let userInfo = this.$store.state.user.userInfo;
            // let userInfo = []
            // this.userInfo = userInfo;
            this.userId = userInfo._id
            let data = {
                _id: this.userId
            }
            let result = await this.$ajax.get('/user/getFriends', {
                params: {
                    data
                }
            });
            console.log(result);
            this.friends = result.data.data;
            console.log(this.friends);

        },
        mounted() {

        },
        methods: {


            goHistory(id, name) {
                // this.$router.push('/chathistory')
                this.$router.push({
                    // name:'chathistory',
                    path: '/chathistory',
                    query: {
                        ow_id: this.userId,
                        op_id: id,
                        op_name: name
                    },
                })
            },
            // socket() {
            //     let socket;
            //     // let datalist = [];
            //     let socketUrl = 'ws://47.103.207.13:2080';
            //     socket = new WebSocket(socketUrl);
            //     socket.onopen = function () {
            //         // 连接服务器城后触发open事件
            //         console.log("服务已连接 " + socketUrl);

            //     }
            // },
        }
    }
</script>

<style scoped>
    .nav {
        background-color: #fff;
    }

    .contain {
        margin: 0;
        padding: 0;
    }

    .row .friend {
        display: flex;
        background: rgba(243, 238, 238, 0.3);
    }

    .row .friend:hover {
        background: rgba(243, 238, 238, 0.9);
    }

    .row .friend .pic {
        width: 80px;
        height: 80px;
        display: flex;
    }

    .row .friend .pic img {
        width: 50px;
        height: 50px;
        border-radius: 8px;
        margin: auto;
    }

    .row .friend .txt {
        flex: 1;
        height: 80px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .row .friend .txt p {
        margin: 0;
        padding: 0;
        font-size: 16px;
        line-height: 26px;
    }

    .tip{
        margin-top: 50px;
    }

    .addFriend{
        border-radius: 6px;
        background-color: rgba(88, 188, 88, .45);
        font-size: 16px;
    }
    /* .my-swipe .van-swipe-item {
        color: #fff;
        font-size: 20px;
        line-height: 150px;
        text-align: center;
        background-color: #39a9ed;
    } */
</style>
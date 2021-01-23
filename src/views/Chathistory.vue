<template>
    <div ref="wrapper">
        <van-nav-bar :title="op_name" left-text="返回" left-arrow @click-left="onClickLeft" :fixed="true"
            :placeholder="true" />
        <!-- <div style="width:95%"><input type="text" ref="woid" class="woid" style="width:100%;height:30px"></div> -->

        <ul class="msgBox">
            <li class="msg_item clearFix" :class="{activeBox:item._id != op_id}" :v-if="historyList.length>0"
                v-for="(item) in historyList" :key="item.addTime">
                <img :src="item.imgSrc" alt="">
                <p class="txt">{{item.msg[0]?item.msg[0]:''}}</p>
            </li>
        </ul>
        

        <div class="occupied"></div>
        <div class="fixNav">
            <textarea class="s_msg" ref="txt" autofocus @keyup.13="send"></textarea>
            <van-button type="primary" class="send" @click="send" >发送</van-button>
        </div>

    </div>
</template>
<script>
    import Vue from 'vue'
    import {
        Button
    } from 'vant';

    Vue.use(Button);
    import {
        NavBar
    } from 'vant';
    Vue.use(NavBar);
    export default {
        name: 'Chathistory',
        data() {
            return {
                historyList: [],
                ow_id: '', //自己的id
                op_name: '', //对方的名字
                message: '' //
            }
        },
        async created() {
            let {
                ow_id,
                op_id,
                op_name
            } = this.$route.query;
            this.op_id = op_id;
            this.ow_id = ow_id;
            this.op_name = op_name;
            console.log(ow_id, op_id, op_name);
            let data = {
                query: [`${ow_id}&${op_id}`, `${op_id}&${ow_id}`],
                name: 'name',
                dbname: 'chathistory',
            }
            let result = await this.$ajax.get('/user/search', {
                params: {
                    data
                }
            });
            if (result.data.data.length > 0) {
                this.historyList = result.data.data[0].details
                console.log(result.data.data[0].details);
            }
            console.log(ow_id);
        },
        methods: {
            onClickLeft() {
                this.$router.go(-1)
            },
            send() {
                let str = this.$refs.txt.value
                if(str ==''){
                    return 
                }
                let socket;
                let woid = this.ow_id
                // let woid = this.$refs.woid.value

                let data = {
                    // name: '6005a09a454af942d9a62e45&6005a07c454af942d9a62e28',
                    name: `${this.ow_id}&${this.op_id}`,

                    details: [{
                        _id: woid, //发送方的id
                        username: '测试', //发送方用户名
                        imgSrc: 'http://47.103.207.13:2008/img/default.jpg',
                        msg: [str],
                        addTime: Date.now()
                    }]
                }
                console.log(data.name);
                let socketUrl = 'ws://47.103.207.13:2080';
                socket = new WebSocket(socketUrl, woid);
                socket.onopen = function () {
                    // 连接服务器城后触发open事件
                    console.log("服务已连接 " + socketUrl);
                    socket.send(JSON.stringify(data));
                }
                socket.onmessage = (e) => {
                    const data = JSON.parse(e.data);
                    this.historyList = data.details;
                    this.scrollToBottom()
                    this.$refs.txt.value = '';
                }
            },
            scrollToBottom() {
            this.$nextTick(() => {
                var div = this.$refs["wrapper"];
                div.scrollIntoView(false)
            })

        }
        },
        updated(){
            this.scrollToBottom()
        },
        mounted(){
            this.scrollToBottom()
        }
    }
</script>

<style scoped>
    .clearFix::after {
            content: ".";
            display: block;
            height: 0;
            clear: both;
            visibility: hidden;
        }
    

    .fixNav {
        width: 100%;
        padding: 10px 0;
        position: fixed;
        bottom: 0;
        display: flex;
        justify-content: space-evenly;
        align-content: center;
        border-top: 1px solid rgba(161, 158, 158, .15);
        background-color: #fff;
    }
  .fixNav .s_msg {
            width: 68%;
            height: 40px;
            resize: none;
            font-size: 18px;
            border: 1px solid #999;
            border-radius: 20px;
            padding: 3px 20px;
        }
  .fixNav .send {
            font-size: 12px;
            border-radius: 10px;
        }




    .msgBox {
        font-size: 16px;
    }

    .msgBox .msg_item {
            margin-bottom: 15px;         
        }
    .msgBox .msg_item img {
                float: left;
                width: 50px;
                height: 50px;
                border-radius: 15px;
                margin: 0 15px;
            }
.msgBox .msg_item  .txt {
                float: left;
                /* max-width: 275px; */
                max-width: 70%;
                margin: 0 0px;
                line-height: 35px;
                padding: 7px 15px;
                border-radius: 15px;
                box-sizing: border-box;
                background-color: rgba(190, 172, 172, 0.2);
            }


  .msgBox .activeBox img {
                float: right;
            }
  .msgBox .activeBox .txt {
                float: right;
                background-color: rgba(91, 231, 78, .7);
            }
    .occupied {
        width: 100%;
        height: 70px;
    }
</style>
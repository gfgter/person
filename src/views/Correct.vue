<template>
    <div>
        <van-nav-bar title="修改资料" left-text="返回" left-arrow @click-left="goback" />
        <div class="img">
            <van-uploader :after-read="afterRead" v-model="fileList" multiple :max-count="1" />
            <p style="line-height:20px;font-size:12px;color:#999">关闭头像，可点击进行更换头像</p>
            <div v-for="(item,idx) in correctItem" :key="idx" class="citem">
                <span style="font-size:12px;line-height:30px">{{idx}}</span>
                <input type="text" :value="item" :ref="idx"
                    style="width:70%;height:30px;outline:none;margin-bottom:10px;margin-left:10px;font-size:16px">
            </div>
            <p style="margin:0;padding:0">
                <van-button type="info" id="correct" @click="correct">修改资料</van-button>
            </p>
        </div>
    </div>
</template>

<script>
    import {
        Dialog
    } from 'vant';
    const crypto = require('crypto');


    export default {
        name: 'Correct',
        data() {
            return {
                userInfo: '',
                fileList: [{
                    url: this.$store.state.user.userInfo.imgSrc
                }],
                file1: [],
                correctItem: {
                    username: this.$store.state.user.userInfo.username,
                    password: '',
                    tel: this.$store.state.user.userInfo.tel ? this.$store.state.user.userInfo.tel:'',
                    sex: this.$store.state.user.userInfo.sex ? this.$store.state.user.userInfo.sex:'',
                    sign: this.$store.state.user.userInfo.sign ?this.$store.state.user.userInfo.sign:'',
                },
            }
        },
        methods: {
            goback() {
                this.$router.replace('/mine')
            },
            async afterRead(file) {
                console.log('end');
                console.log(file);
                //   let arr = []
                if (!Array.isArray(file)) {
                    file = [file]
                }
                file.forEach(item => {
                    this.file1.push(item.content)
                });
                console.log(this.file1);
            },
            correct() {
                Dialog.confirm({
                        title: '修改资料',
                        message: '确认修改资料？',
                    })
                    .then(async () => {
                        // on confirm
                        let info = {
                            query: {
                                _id: this.$store.state.user.userInfo._id
                            },
                            file: this.file1,
                            details: {
                                username: this.$refs.username[0].value,
                                tel: this.$refs.tel[0].value,
                                sex: this.$refs.sex[0].value,
                                sign: this.$refs.sign[0].value
                            },
                        }
                        let password = ''
                        password = this.$refs.password[0].value
                        if (password) {
                            let newPassword = password
                            const hash = crypto.createHash('sha256');
                            hash.update(newPassword);
                            newPassword = hash.digest('hex')


                            info.details.password = newPassword;
                        }
                        console.log(info);
                        let result = await this.$ajax.post('/user/updateAllinfo', {
                            info
                        })
                        console.log(result);
                        if (result.data.code == 200) {
                            result.data.data.Authorization = this.$store.state.user.userInfo.Authorization
                            localStorage.setItem('userInfo', JSON.stringify(result.data.data))
                            window.location.reload()
                        }
                    })
                    .catch(() => {
                        // on cancel
                    });
            }
        },
        created() {
            this.userInfo = this.$store.state.user.userInfo
            console.log(this.userInfo);
        },
    }
</script>

<style scoped>
    .img {
        margin: 0;
        padding: 0;
        text-align: center;
    }

    .citem {
        display: flex;
        justify-content: center;
        align-content: center;
    }

    #correct {
        border-radius: 5px;
    }
</style>
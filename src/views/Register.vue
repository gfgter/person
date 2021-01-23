<template>
    <div
        style=" background-image:url(https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3996311307,4118098080&fm=26&gp=0.jpg);background-size:cover;height:100vh">
        <h1 style="text-align:center;color:white;padding:10vh 0;margin:0;font-size:30px">葳信注册</h1>
        <van-form @submit="onSubmit" style="width:90vw;padding-left:5vw">
            <van-field v-model="username" name="username" label="用户名" ref="uname" placeholder="用户名"
                :rules="[{ validator,required: true, message: '用户名长度必须在3-10'}]"  autocomplete="off"/>
            <van-field v-model="password" type="password" name="password" ref="uword" label="密码" placeholder="密码"
                :rules="[{ pattern,required: true, message: '必须是数字英文结合的6-18位的密码'  }]" autocomplete="off" />
            <div style="margin: 16px">
                <van-button round block type="info" native-type="submit"
                    style="background-color:rgb(25,137,250);margin-top:10vh">注册</van-button>
            </div>
        </van-form>
        <div style="text-align:center;color:#999;font-size:16px;padding-top:100px">已有账户，前往 <span style="color:white"
                @click="$router.push('/login')">登录</span></div>
    </div>

</template>


<script>
    import {
        Dialog
    } from 'vant';


    const crypto = require('crypto');
    export default {
        // components: {
        //     [Dialog.Component.name]: Dialog.Component,
        // },
        data() {
            return {
                username: '',
                password: '',
                pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z\\W]{6,18}$/
            };
        },
        methods: {
            async onSubmit(values) {
                // console.log('submit', values);
                let password = values.password;
                const hash = crypto.createHash('sha256');
                hash.update(password);
                password = hash.digest('hex');
                // const newPassword = hash.digest('hex');
                let obj = {
                    username: values.username,
                    password
                }
                let result = await this.$ajax.post('/user/register', {
                    data: obj
                });
                console.log(result);
                if (result.data.code === 200) {
                    this.$router.push('/login')
                } else {
                    Dialog.alert({
                        message: '用户名已存在，请重新注册',
                    }).then(() => {
                        window.location.reload()
                    });
                }

            },
            validator(val) {
                return /^[\u4e00-\u9fff\w]{3,10}$/.test(val);
            }
        },
    }
</script>

<style scoped>

</style>
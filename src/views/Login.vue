<template>
    <div
        style=" background-image:url(https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3996311307,4118098080&fm=26&gp=0.jpg);background-size:cover;height:100vh">
        <h1 style="text-align:center;color:white;padding:10vh 0;margin:0;font-size:30px">葳信登录</h1>
        <van-form @submit="onSubmit" style="width:90vw;height:30vh;padding-left:5vw">
            <van-field v-model="username" name="username" label="用户名" placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]" autocomplete="off" />
            <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]" autocomplete="off" />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit"
                    style="background-color:rgb(26,172,25);margin-top:10vh">登录</van-button>
            </div>
        </van-form>
        <div style="text-align:center;color:#999;font-size:16px;padding-top:100px">未有账户，前往 <span style="color:white"
                @click="$router.push('/reg')">注册</span></div>
    </div>

</template>


<script>
    import {mapMutations} from 'vuex';
    import {Dialog} from 'vant';
    const crypto = require('crypto');

    export default {
        data() {
            return {
                username: '',
                password: '',
                user:''
            };
        },
        methods: {
            ...mapMutations(['login']),
            async onSubmit(values) {
                let password = values.password;
                const hash = crypto.createHash('sha256');
                hash.update(password);
                password = hash.digest('hex');
                let obj = {
                    username: values.username,
                    password
                }
                let result = await this.$ajax.get('/user/login/token', {
                    params: {
                        data: obj
                    }
                });
                this.user = result.data.data;
                if (result.data.code === 200) {
                    this.$store.commit('login',this.user);
                    let {redirectTo='/chat'} = this.$route.query;
                    this.$router.replace(redirectTo)
                } else {
                    Dialog.alert({
                        message: result.data.msg,
                    }).then(() => {
                        // window.location.reload()
                    });
                }

            },
        },
    }
</script>
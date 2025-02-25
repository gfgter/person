import router from '../router'
import { request } from '../utils'

//数据持久化：利用本地存储+Vue实现
let userInfo = localStorage.getItem('userInfo');
try {
    userInfo = JSON.parse(userInfo) || {};
} catch (err) {
    userInfo = {}
}


export default {
    //命名空间
    // namespaced:true,
    state: {
        userInfo,
    },
    getters: {
        // isLogin(state, getters, rootState, RootGetters)
        isLogin(state) {
            console.log('getters=', arguments);
            return !!state.userInfo._id;
        },
        getUserInfo(state) {
            return state.userInfo;
        }
    },

    //修改数据唯一方式
    mutations: {
        login(state, userInfo) {
            console.log('mutation=', arguments);
            state.userInfo = userInfo;

            //存入本地
            localStorage.setItem('userInfo', JSON.stringify(userInfo))
        },
        logout(state) {
            state.userInfo = {}
            localStorage.removeItem('userInfo');
        }
    },

    actions: {
        // async login(context, payload) {
        //     // context类似与store{state,getter,commit,dispatch,rootState,rootGetters}
        //     console.log('actions=', arguments);
        //     //发起ajax请求注册
        //     const { data } = await request.get('/userInfo/login2', {
        //         params: payload,
        //     });
        //     if (data.code == 200) {
        //         router.replace('/chat');

        //         //把用户信息保存到vuex
        //         context.commit('login', data.data);
        //     } else {
        //         // this.$message.error("用户名或密码错误");
        //         this.errMsg = '用户名或密码错误'

        //     }
        // }
    }
}
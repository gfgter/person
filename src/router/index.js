import Vue from 'vue'

// 1. 引入
import VueRouter from 'vue-router';
import Login from '../views/Login.vue'
import Chat from '../views/Chat.vue'
import Friendscircle from '../views/Friendscircle.vue'
import Friendslist from '../views/Friendslist.vue'
import Mine from '../views/Mine.vue'
import Register from '../views/Register.vue'

import Sreach from '../views/Sreach.vue'
import Add from '../views/Add.vue'
import Chathistory from '../views/Chathistory.vue'
import Correct from '../views/Correct.vue'
import NotFound from '../views/NotFound.vue'


import Adit from '../views/Adit.vue'
const {
    getCookie
} = require('../utils/cookie')

import store from '../store'
import request from '../utils/request'
// 2. 使用
Vue.use(VueRouter)

// 3. 配置
const router = new VueRouter({
    mode: 'history', // history,hash
    routes: [
        //这里写路由
        // {
        //     //首页跳转
        //     path: '/',

        // }, 
        {
            path: '/',
            redirect: '/login'
        },
        {
            //登录页
            path: '/login',
            component: Login
        },
        {
            //聊天页面
            path: '/chat',
            component: Chat,
            meta: { requiresAuth: true }
        },
        {
            //朋友圈
            path: '/circle',
            component: Friendscircle
        },
        {
            // 朋友列表
            name: 'list',
            path: '/list',
            component: Friendslist
        },

        {
            //我的
            path: '/mine',
            component: Mine,
        },
        {
            //通过好友申请
            path: '/add',
            component: Add
        },
        {
            //搜索
            path: '/sreach',
            component: Sreach
        },
        {
            name: 'adit',
            path: '/adit',
            component: Adit
        }, {
            //注册
            path: '/reg',
            component: Register
        },
        {
            //聊天
            path: '/chathistory',
            component: Chathistory
        },
        {
            path: '/correct',
            component: Correct
        },
        {
            path: '/*',
            component: NotFound,
        },
    ]
});
// 开始导航
router.beforeEach((to, from, next) => {
        // if (to.matched.some(item => item.meta.requiresAuth)) {
        // 判断是否登录
        if (store.getters.isLogin) {
            console.log(1);
            request.get('/user/verify', {
                params: {},
                headers: {
                    Authorization: store.state.user.userInfo.Authorization
                }
            }).then(({
                data
            }) => {
                if (data.code == 400) {
                    store.commit('logout');
                    router.push({
                        path: '/login',
                        query: {
                            redirectTo: to.fullPath
                        }
                    })
                } else {
                    next();
                }
            })
        } else {
            if (to.path == '/login' || to.path == '/reg') {
                next();
            } else {
                router.push({
                    path: '/login',
                    query: {
                        redirectTo: to.fullPath
                    }
                })
            }

        }

        // } else {
        //     next();
        // }
        //     let flag = getCookie('login')
        //     console.log(flag);
        //     if (!flag) {
        //         if (from.fullPath == '/login') {
        //             next();
        //         }
        //         if (to.fullPath == '/login') {
        //             next();
        //         }
        //         if (to.fullPath == '/reg') {
        //             next();
        //         } else {
        //             next('/login')
        //         }
        //     }
        //     if (flag && to.fullPath == '/login') {
        //         next('/chat')
        //     }
        //     next();
        //     console.log('beforeEach=', to.path, from.path);
    })
    // 全局路由守卫
    // 开始导航
    // router.beforeEach(function(to, from, next) {
    //     console.log('beforeEach=', to.path, from.path);
    //     next();
    // })

// // 确认导航
// router.beforeResolve((to, from, next) => {
//         console.log('beforeResolve=', to.path, from.path);
//         next();
//     })
//     // 结束导航
// router.afterEach(function(to, from) {
//     console.log('afterEach=', to.path, from.path);
// })


// // 开始导航
// router.beforeEach((to, from, next) => {
//     let flag = getCookie('login')
//     console.log(flag);
//     if (!flag) {
//         if (from.fullPath == '/admin') {
//             next();
//         }
//         if (to.fullPath == '/admin') {
//             next();
//         } else {
//             next('/admin')
//         }
//     }
//     if (flag && to.fullPath == '/admin') {
//         next('/user')
//     }
//     next();
//     console.log('beforeEach=', to.path, from.path);
// })


export default router;
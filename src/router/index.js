import VueRouter from 'vue-router';
import Vue from 'vue';
Vue.use(VueRouter);
import store from '@/store';
import routes from './routes';
//先把router原型对象的push,先保存一份
let originpush = VueRouter.prototype.push;
//先把router原型对象的replace,先保存一份
let originreplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function(location, resolve, reject) {
    if (resolve && reject) {
        //第一个参数：告诉原来的push方法，往哪里跳（传递哪些参数）
        // 第二个参数:成功的回调
        // 第三个参数:失败的回调
        originpush.call(this, location, resolve, reject);
    } else {
        originpush.call(this, location, () => {}, () => {})
    }
}
VueRouter.prototype.replace = function(location, resolve, reject) {
    if (resolve && reject) {
        //第一个参数：告诉原来的replace方法，往哪里跳（传递哪些参数）
        // 第二个参数:成功的回调
        // 第三个参数:失败的回调
        originreplace.call(this, location, resolve, reject);
    } else {
        originreplace.call(this, location, () => {}, () => {})
    }
};
//对外暴漏VueRouter类的实例
let router = new VueRouter({
    routes,
    //添加滚动行为
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
    },
});

//全局前置守卫 在路由跳转之前判断
router.beforeEach(async(to, from, next) => {
    //用户登录了，才会有token,反之
    // next()
    let token = store.state.User.token;
    let name = store.state.User.userInfo.name;
    //用户登录了
    if (token) {
        //登陆了后用户还想去登陆页面，不放行！
        if (to.path == '/Login') {
            next('/Home')
                //没有name
        } else {
            //登陆了去的不是登录页面,有name才放行！
            if (name) {
                next();
            } else {
                try {
                    //获取用户信息成功
                    await store.dispatch('getUserInfo');
                    next();
                } catch (error) {
                    //token失效了，获取不到用户信息，重新登录
                    await store.dispatch('getLoginOut');
                    next('/Login');
                }
            }
        }
        //未登录,不能去交易、支付、个人页面,去登录页面
    } else {
        let toPath = to.path;
        if (toPath.indexOf('/Trade') != -1 || toPath.indexOf('/Pay') != -1 || toPath.indexOf('/Center') != -1) {
            next('Login?redirect=' + toPath);
        } else {
            next()
        }
    }
})
export default router;
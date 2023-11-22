import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import store from '@/store'
// mock数据一定要对外暴露
import '@/mock/mockServe'
import 'swiper/css/swiper.css'
import * as api from '@/API';
import { Button, MessageBox } from 'element-ui';
import Vuelazyload from 'vue-lazyload'
import lazyUrl from '@/assets/images/012b3c599276cc0000002129ebff53.gif'
// import { reqGetSearchInfo } from '@/API'
// console.log(reqGetSearchInfo({}));
Vue.config.productionTip = false;
//第一个参数：全局组件的名字，第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 路由懒加载
Vue.use(Vuelazyload, {
    // 懒加载时的显示的图片
    loading: lazyUrl
});
//引入自定义表单验证插件
import '@/plugins/validate'

new Vue({
    render: h => h(App),
    //全局事件总线$bus配置
    beforeCreate() {
        Vue.prototype.$bus = this;
        Vue.prototype.$api = api;
    },
    router,
    //注册仓库
    store
}).$mount('#app')
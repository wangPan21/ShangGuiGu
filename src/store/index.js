import Vue from 'vue';
import Vuex from 'vuex';
import Home from './Home';
import Search from './Search';
import Detail from './Detail';
import ShopCart from './ShopCart';
import User from './User';
import Trade from './Trade';
//使用插件一次
Vue.use(Vuex);

//对外暴漏Store类的一个实例
export default new Vuex.Store({
    modules: {
        Home,
        Search,
        Detail,
        ShopCart,
        User,
        Trade
    }
})
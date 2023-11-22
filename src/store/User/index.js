import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLoginOut } from '@/API'
import { setToken, getToken, removeToken } from '@/utils/token';
//search模块的小仓库
//state：仓库存储数据的地方
const state = {
    code: '',
    token: getToken(),
    userInfo: {}
};
//mutations：修改state的唯一手段
const mutations = {
    GETCODE(state, code) {
        state.data = code;
    },
    GETUSERLOGIN(state, token) {
        state.token = token;
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo;
    },
    //清空本地存储
    GETLOGINOUT(state) {
        state.token = '';
        state.userInfo = {};
        //清空本地存储
        removeToken()
    }
};
//actions：处理actions，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    //获取验证码
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone);
        if (result.code == 200) {
            commit('GETCODE', result.data)
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    //用户注册
    async getUserRegister({ commit }, user) {
        let result = await reqUserRegister(user);
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    //用户登录
    async getUserLogin({ commit }, data) {
        let result = await reqUserLogin(data);
        if (result.code == 200) {
            commit('GETUSERLOGIN', result.data.token);
            //持久化存储token
            setToken(result.data.token);
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    //获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo();
        if (result.code == 200) {
            commit('GETUSERINFO', result.data);
            return 'ok'
        } else {}
    },
    //退出登录
    async getLoginOut({ commit }) {
        let result = await reqLoginOut();
        if (result.code == 200) {
            commit('GETLOGINOUT')
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'));
        }
    }

};
//getters:计算属性，用于简化仓库的数据，让组件获取仓库的数据更加方便
const getters = {}
    //对外暴漏Store类的一个实例
export default ({
    state,
    mutations,
    actions,
    getters
})
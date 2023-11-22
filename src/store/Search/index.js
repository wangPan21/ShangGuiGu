import { reqGetSearchInfo } from '@/API'
//search模块的小仓库
//state：仓库存储数据的地方
const state = {
    getSearchList: {},
};
//mutations：修改state的唯一手段
const mutations = {
    GETSEARCHLIST(state, getSearchList) {
        state.getSearchList = getSearchList;
    },
};
//actions：处理actions，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    async getSearchList({ commit }, params = {}) {
        let result = await reqGetSearchInfo(params)
        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data)
        }
    }
};
//getters:计算属性，用于简化仓库的数据，让组件获取仓库的数据更加方便
const getters = {
        goodsList(state) {
            //如果服务器的数据回来了，是一个数组，否则为undefined
            return state.getSearchList.goodsList;
        },
        trademarkList(state) {
            return state.getSearchList.trademarkList;
        },
        attrsList(state) {
            return state.getSearchList.attrsList;
        },
    }
    //对外暴漏Store类的一个实例
export default ({
    state,
    mutations,
    actions,
    getters
})
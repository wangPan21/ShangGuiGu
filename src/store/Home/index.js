//Home模块的小仓库

import { reqCategoryList, reqBannerList, reqFloorList } from "@/API";

//state：仓库存储数据的地方
const state = {
    // state默认数据的初始值不能乱写，服务器返回的是对象，就写空对象，同理。
    categoryList: [],
    bannerList: [],
    floorList: []
};
//mutations：修改state的唯一手段
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList;
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList;
    }
};
//actions：处理actions，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    async categoryList({ commit }) {
        let result = await reqCategoryList();
        if (result.code == 200) {
            commit('CATEGORYLIST', result.data)
        }
    },
    async getBannerList({ commit }) {
        let result = await reqBannerList();
        if (result.code == 200) {
            commit('GETBANNERLIST', result.data);
        }
    },
    //获取floor数据
    async getFloorList({ commit }, params = {}) {
        let result = await reqFloorList(params);
        if (result.code == 200) {
            commit('GETFLOORLIST', result.data)
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
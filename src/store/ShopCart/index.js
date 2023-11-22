import { reqCartList, reqDeleteCartById, reqUpdateChecked } from '@/API'
//search模块的小仓库
//state：仓库存储数据的地方
const state = {
    carList: []
};
//mutations：修改state的唯一手段
const mutations = {
    GETCARTLIST(state, carList) {
        state.carList = carList;
    }
};
//actions：处理actions，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    //获取购物车列表数据
    async getCartList({ commit }) {
        let result = await reqCartList()
        if (result.code == 200) {
            commit('GETCARTLIST', result.data)
        }
    },
    //删除购物车某一个产品
    async deleteCartById({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId)
        if (result.code == 200) {
            // commit('DELETECARTBYID',skuId)
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    //修改商品的选中的状态
    async updateCheckeById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateChecked(skuId, isChecked)
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    //删除选中的产品
    deletAllCheckedCart({ dispatch, getters }) {
        //context小仓库，commit:提交mutataions修改state, getters:(计算属性)，dispatch:派发action, state:当前仓库的数据
        //获取购物车的全部数组
        let PromiseAll = [];
        getters.carList.cartInfoList.forEach(element => {
            let promise = element.isChecked == 1 ? dispatch('deleteCartById', element.skuId) : '';
            PromiseAll.push(promise);
        });
        //只要全部的结果都成功，返回的结果即为成功，一个失败，返回的结果即为失败
        return Promise.all(PromiseAll);
    },
    //全选购物车里的商品
    allUpdateChecked({ commit, state, dispatch }, isChecked) {
        let PromiseAll = [];
        state.carList[0].cartInfoList.forEach(element => {
            let pr = dispatch('updateCheckeById', { skuId: element.skuId, isChecked });
            PromiseAll.push(pr);
        });
        return Promise.all(PromiseAll);
    }
};
//getters:计算属性，用于简化仓库的数据，让组件获取仓库的数据更加方便
const getters = {
        carList(state) {
            return state.carList[0] || {}
        }
    }
    //对外暴漏Store类的一个实例
export default ({
    state,
    mutations,
    actions,
    getters
})
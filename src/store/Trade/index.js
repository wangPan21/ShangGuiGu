import { reqAddressInfo, reqOrderInfo } from '@/API'
//search模块的小仓库
//state：仓库存储数据的地方
const state = {
    address: [],
    orderInfo: {},
};
//mutations：修改state的唯一手段
const mutations = {
    GETADDRESSINFO(state, address) {
        state.address = address;
    },
    GETORDERINFO(state, orderInfo) {
        state.orderInfo = orderInfo;
    }
};
//actions：处理actions，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    //获取订单地址
    async getAddressInfo({ commit }) {
        let result = await reqAddressInfo();
        if (result.code == 200) {
            commit('GETADDRESSINFO', result.data);
        }
    },
    // 获取清单数据
    async getOrderInfo({ commit }) {
        let result = await reqOrderInfo();
        if (result.code == 200) {
            commit('GETORDERINFO', result.data);
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
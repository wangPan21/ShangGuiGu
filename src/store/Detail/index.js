import { reqGetDetail, reqAddOrUpdateCart } from '@/API'
import { getUUID } from '@/utils/uuid_token';
//search模块的小仓库
//state：仓库存储数据的地方
const state = {
    getDetail: {},
    //游客的临时身份
    uuid_token: getUUID(),
};
//mutations：修改state的唯一手段
const mutations = {
    GETDETAIL(state, getDetail) {
        state.getDetail = getDetail;
    }
};
//actions：处理actions，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    async getDetail({ commit }, skuId) {
        let result = await reqGetDetail(skuId);
        if (result.code == 200) {
            commit('GETDETAIL', result.data)
        }
    },
    // 将产品添加到购物车中
    async addOrUpdateCart({ commit }, { skuId, skuNum }) {
        let result = await reqAddOrUpdateCart(skuId, skuNum);
        if (result.code == 200) {
            return "ok";
        } else {
            return Promise.reject(new Error('faile'));
        }
        //代表服务器加入购物车成功
        // console.log(result);
        //     if (result.data == 200) {
        //         return '666'
        //             //代表服务器加入购物车失败
        //     } else {
        //         return Promise.reject(new Error('faile'));
        //     }
    }
};
//getters:计算属性，用于简化仓库的数据，让组件获取仓库的数据更加方便
const getters = {
        categoryView(state) {
            return state.getDetail.categoryView || {};
        },
        skuInfo(state) {
            return state.getDetail.skuInfo || {};
        },
        spuSaleAttrList(state) {
            return state.getDetail.spuSaleAttrList || [];
        }
    }
    //对外暴漏Store类的一个实例
export default ({
    state,
    mutations,
    actions,
    getters
})
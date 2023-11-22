//该模块API进行统一管理
import requests from './request';
import mockRequests from './mockRequest';
import { method } from 'lodash';
// import mockServe from '../mock/mockServe'
//三级联动接口
///api/product/getBaseCategoryList  method:get  无参数
export const reqCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' });
//获取轮播图
export const reqBannerList = () => mockRequests({ url: '/banner', method: 'get' });
//获取floor数据
export const reqFloorList = () => mockRequests({ url: '/floor', method: 'get' });
//获取搜索模块的数据 /api/list
export const reqGetSearchInfo = (params) => requests({ url: '/list', method: 'post', data: params });
//获取商品详情数据 /api/item/{ skuId }
export const reqGetDetail = (skuId) => requests({ url: `/item/${ skuId }`, method: 'get' });
//将产品添加到购物车中（或者更新某一个产品的个数）/api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' });
//获取购物车商品列表  /api/cart/cartList
export const reqCartList = () => requests({ url: '/cart/cartList', method: 'get' });
//删除购物车商品  /api/cart/deleteCart/{skuId}
export const reqDeleteCartById = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'DELETE' });
//修改商品选中的状态   /api/cart/checkCart/{skuID}/{isChecked}
export const reqUpdateChecked = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' });
//获取验证码 /api/user/passport/sendCode/phone
export const reqGetCode = (phone) => requests({ url: `user/passport/sendCode/${phone}`, method: 'get' });
//注册用户 /api/user/passport/register
export const reqUserRegister = (data) => requests({ url: `/user/passport/register`, data, method: 'POST' });
//登录 /api/user/passport/login
export const reqUserLogin = (data) => requests({ url: '/user/passport/login', data, method: 'POST' });
//获取用户信息  /api/user/passport/auth/getUserInfo
export const reqUserInfo = () => requests({ url: '/user/passport/auth/getUserInfo', method: 'get' });
//退出登录 /api/user/passport/logout
export const reqLoginOut = () => requests({ url: '/user/passport/logout', method: 'get' });
//获取用户地址信息  /user/userAddress/auth/findUserAddressList
export const reqAddressInfo = () => requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' });
//获取订单交易信息 /api/order/auth/trade
export const reqOrderInfo = () => requests({ url: '/order/auth/trade', method: 'get' });
//提交订单 /api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqsubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'POST' });
//获取支付信息 /api/payment/weixin/createNative/{orderId}
export const reqPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' });
//查询订单状态 /api/payment/weixin/createNative/{orderId}
export const reqPayment = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' });
//获取个人中心数据 /api/order/auth/{page}/{limit}
export const reqMyOrderlist = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'get' });
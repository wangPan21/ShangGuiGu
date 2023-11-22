<template>
    <div class="header">
        <!-- 头部的第一行 -->
        <div class="top">
            <div class="container">
                <div class="loginList">
                    <p>蓝海潮欢迎您！</p>
                    <p v-if="!userName">
                        <span>请</span>
                        <router-link to="/Login">登录</router-link>
                        <router-link class="register" to="/Register">免费注册</router-link>
                    </p>
                    <p v-else>
                        <a>{{ userName }}</a>
                        <a class="register" @click="logOut">退出登录</a>
                    </p>
                </div>
                <div class="typeList">
                    <!-- <a href="###">我的订单</a> -->
                    <router-link to="/Center/myOrder">我的订单</router-link>
                    <!-- <a href="###">我的购物车</a> -->
                    <router-link to="/ShopCart">我的购物车</router-link>
                    <a href="###">我的蓝海潮</a>
                    <a href="###">蓝海潮会员</a>
                    <a href="###">企业采购</a>
                    <a href="###">关注蓝海潮</a>
                    <a href="###">合作招商</a>
                    <a href="###">商家后台</a>
                </div>
            </div>
        </div>
        <!--头部第二行 搜索区域-->
        <div class="bottom">
            <h1 class="logoArea">
                <router-link class="logo" to="/Home">
                    <img src="./images/logo.png" alt="">
                </router-link>
            </h1>
            <div class="searchArea">
                <form action="###" class="searchForm">
                    <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword" />
                    <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">搜索</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            keyword: ''
        }
    },
    methods: {
        goSearch() {
            this.$router.push({ name: "search", params: { keyword: this.keyword }, query: { K: this.keyword.toUpperCase() } })
        },
        //退出登录
        async logOut(){
            try {
                await this.$store.dispatch('getLoginOut');
                this.$router.push('/Home');
            } catch (error) {
                alert('失败！')
            }
        }
    },
    mounted() {
        //通过全局事件总线清除关键字
        this.$bus.$on('clear', () => {
            this.keyword = '';
        })
    },
    computed: {
        //用户信息
        userName() {
            return this.$store.state.User.userInfo.name;
        }
    }
}
</script>

<style scoped lang="less">
.header {
    &>.top {
        background-color: #eaeaea;
        height: 30px;
        line-height: 30px;

        .container {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .loginList {
                float: left;

                p {
                    float: left;
                    margin-right: 10px;

                    .register {
                        border-left: 1px solid #b3aeae;
                        padding: 0 5px;
                        margin-left: 5px;
                    }
                }
            }

            .typeList {
                float: right;

                a {
                    padding: 0 10px;

                    &+a {
                        border-left: 1px solid #b3aeae;
                    }
                }

            }

        }
    }

    &>.bottom {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;

        .logoArea {
            float: left;

            .logo {
                img {
                    width: 175px;
                    margin: 25px 45px;
                }
            }
        }

        .searchArea {
            float: right;
            margin-top: 35px;

            .searchForm {
                overflow: hidden;

                input {
                    box-sizing: border-box;
                    width: 490px;
                    height: 32px;
                    padding: 0px 4px;
                    border: 2px solid #2760d0bf;
                    float: left;

                    &:focus {
                        outline: none;
                    }
                }

                button {
                    height: 32px;
                    width: 68px;
                    background-color: #2760d0bf;
                    border: none;
                    color: #fff;
                    float: left;
                    cursor: pointer;

                    &:focus {
                        outline: none;
                    }
                }
            }
        }
    }
}
</style>
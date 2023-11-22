<template>
  <div>
    <!-- 商品分类三级联动 -->
    <TypeNav></TypeNav>
    <div class="main">
      <div class="py-container">
        <!--bread 面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">{{ searchParams.categoryName }}<i
                @click="removeCatgoryName">×</i></li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">{{ searchParams.keyword }}<i @click="removekeyword">×</i></li>
            <!-- 品牌面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">{{ searchParams.trademark.split(':')[1] }}<i
                @click="removetrademark">×</i></li>
            <!-- 平台售卖属性的值展示 -->
            <li class="with-x" v-for="(attrValue, index) in searchParams.props" :key="index">{{ attrValue.split(':')[1]
            }}<i @click="removeattrs(index)">×</i></li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isone }" @click="changeOrder('1')">
                  <a>综合<span v-show="isone" class="iconfont"
                      :class="{ 'icon-DOWN': isDesc, 'icon-UP': isAsc }"></span></a>
                </li>
                <li :class="{ active: istwo }" @click="changeOrder('2')">
                  <a>价格<span v-show="istwo" class="iconfont"
                      :class="{ 'icon-DOWN': isDesc, 'icon-UP': isAsc }"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售商品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(goods) in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 路由跳转带params参数 -->
                    <router-link :to="`/Detail/${goods.id}`">
                      <img v-lazy="goods.defaultImg"  />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>&#8201;
                      <i>{{ goods.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{ goods.title
                    }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total" :continues="5" @getPageNo="getPageNo"></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from './SearchSelector/SearchSelector';
import { mapGetters ,mapState} from 'vuex';
import { start } from 'nprogress';
export default {
  name: 'Search',
  data() {
    return {
      searchParams: {
        //一级分类id
        category1Id: "",
        //二级分类id
        category2Id: "",
        //三级分类id 
        category3Id: "",
        //分类名
        categoryName: "",
        //关键字
        keyword: "",
        //排序
        order: "1:desc",
        //分页器用的，代表当前是第几页
        pageNo: 1,
        //代表的是每一个展示的数据个数
        pageSize: 10,
        //平台售卖属性操作带的参数
        props: [],
        //品牌
        trademark: ""
      }
    }
  },
  components: {
    SearchSelector
  },
  //组件挂载完毕前，调用（生命周期函数）
  beforeMount() {
    //Es6新增语法，合并参数，带给服务器
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    this.getData();
  },
  watch: {
    $route(newValue, oldVlue) {
      //每次请求完毕，应该把相应的1，2，3级分类的id置空，好接受下一次的1.2.3级id
      this.searchParams.category1Id = '';
      this.searchParams.category2Id = '';
      this.searchParams.category3Id = '';
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      this.getData();
    }
  },
  computed: {
    //mapGetters里面的写法：传递数组，因为getters计算是没有划分模块【home,search】
    ...mapGetters(['goodsList']),
    ...mapState({
      total:state =>state.Search.getSearchList.total
    }),
    isone() {
      return this.searchParams.order.indexOf('1') != -1;
    },
    istwo() {
      return this.searchParams.order.indexOf('2') != -1
    },
    isAsc() {
      return this.searchParams.order.indexOf('asc') != -1
    },
    isDesc() {
      return this.searchParams.order.indexOf('desc') != -1

    }
  },
  methods: {
    //向服务器发送请求
    getData() {
      this.$store.dispatch('getSearchList', this.searchParams);
    },
    //删除分类的名字
    removeCatgoryName() {
      this.searchParams.categoryName = '';
      //把带给服务器的参数置空了，向服务器发送请求，但是服务器的参数为No,若为空字符串，
      //会将相应的带给服务器，若为undefined，则不会将字段带给服务器
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.getData();
      //地址栏也需要修改，进行路由跳转,本意是删除query,若路径当中出现params则不应该删除，且路由跳转时带着
      if (this.$route.params) {
        this.$router.push({ name: 'search', params: this.$route.params })
      }
    },
    //删除关键字
    removekeyword() {
      this.searchParams.keyword = undefined;
      this.getData();
      this.$bus.$emit('clear');
      if (this.$route.query) this.$router.push({ name: 'search', query: this.$route.query })
    },
    //自定义事件的回调
    trademarkInfo(trademark) {
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      this.getData();

    },
    attrInfo(attrs, attrValue) {
      let props = `${attrs.attrId}:${attrValue}:${attrs.attrName}`;
      // if语句里面只有一行代码可以省略{}！！！！！！！！
      if (this.searchParams.props.indexOf(props) == -1) this.searchParams.props.push(props);
      this.getData();
    },
    //分页器自定义事件
    getPageNo(pageNo){
      this.searchParams.pageNo = pageNo;
      this.getData()
    },
    //删除品牌
    removetrademark() {
      this.searchParams.trademark = undefined;
      this.getData();
    },
    //删除平台售卖属性
    removeattrs(index) {
      this.searchParams.props.splice(index, 1);
      this.getData();
    },
    //排序的操作
    changeOrder(number) {
      //number是形参，用于区分点击的是综合还是价格
      let orders = this.searchParams.order;
      //获取到最开始的状态
      let ordersnumber = this.searchParams.order.split(':')[0];
      let ordersort = this.searchParams.order.split(':')[1];
      let newOrder = '';
      if (number == ordersnumber) {
        // 点击综合
        newOrder = `${ordersnumber}:${ordersort == 'desc' ? 'asc' : 'desc'}`;
      } else {
        //点击价格
        newOrder = `${number}:${'desc'}`;
      }
      //修改order属性值
      this.searchParams.order = newOrder;
      // 向服务器发送请求
      this.getData()
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #2760d0bf;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;
      }
    }
  }
}</style>
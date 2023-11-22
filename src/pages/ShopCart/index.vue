<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="carlist in cartInfoList" :key="carlist.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="carlist.isChecked == 1"
              @change="updateChecked(carlist, $event)">
          </li>
          <li class="cart-list-con2">
            <img :src="carlist.imgUrl">
            <div class="item-msg">{{ carlist.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">￥{{ carlist.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="editNum('min', -1, carlist)">-</a>
            <input autocomplete="off" type="text" :value="carlist.skuNum" minnum="1" class="itxt"
              @change="editNum('change', $event.target.value * 1, carlist)">
            <a href="javascript:void(0)" class="plus" @click="editNum('max', 1, carlist)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">￥{{ carlist.skuPrice * carlist.skuNum }}.00</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteGoods(carlist)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllChecked&&cartInfoList.length>0" @change="updateAllCart($event)">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deletAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">￥{{ sumPrice }}.00</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="$router.push('/Trade')" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import throttle from 'lodash/throttle';
export default {
  name: 'ShopCart',
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$store.dispatch('getCartList');
    },
    //type:区分点击的3个元素 ，num:区分变化量   carlist:区分点击的产品
    editNum: throttle(async function (type, editNum, carlist) {
      switch (type) {
        case "max":
          editNum = 1;
          break;
        case "min":
          //判断产品的个数是否大于或小于等于1
          editNum = carlist.skuNum > 1 ? -1 : 0;
          break;
        case "change":
          //如果输入值非法
          if (isNaN(editNum) || editNum < 1) {
            //不变
            editNum = 0
          } else {
            //出现小数：向上取整再减去原来的数
            editNum = parseInt(editNum) - carlist.skuNum;
          }
          // editNum = isNaN(editNum) || editNum < 1 ? 0 : parseInt(editNum) - carlist.skuNum;
          break;
      }
      //派发actions
      try {
        //修改成功
        await this.$store.dispatch('addOrUpdateCart', { skuId: carlist.skuId, skuNum: editNum });
        //再次获取服务器最新数据
        this.getData();
      } catch (error) { }
    }, 1000),
    //删除某一产品ID
    async deleteGoods(carlist) {
      try {
        // 删除成功
        await this.$store.dispatch('deleteCartById', carlist.skuId);
        this.getData();
      } catch (error) {
        alert('失败！')
      }
    },
    //修改商品选中的状态
    async updateChecked(carlist, event) {
      try {
        // 修改成功
        let isChecked = event.target.checked ? '1' : '0';
        await this.$store.dispatch('updateCheckeById', { skuId: carlist.skuId, isChecked, });//KV一致可以只写一个
        // 获取服务器数据
        this.getData();
      } catch (error) {
        alert(error.message)
      }
    },
    // 删除选中的所有商品
    async deletAllCheckedCart() {
      try {
        await this.$store.dispatch('deletAllCheckedCart')
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    //全选购物里的商品
    async updateAllCart(event){
      try {
        let isChecked = event.target.checked ? "1" : "0";
        //派发action
        await this.$store.dispatch('allUpdateChecked', isChecked);
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    }
  },
  computed: {
    ...mapGetters(['carList']),
    //购物车数据
    cartInfoList() {
      return this.carList.cartInfoList || [];
    },
    //计算产品的总价
    sumPrice() {
      let sum = 0;
      this.cartInfoList.forEach(item => {
        sum += item.skuNum * item.skuPrice;
      });
      return sum;
    },
    //判断底部的复选框是否全选
    isAllChecked() {
      //遍历数组里面的元素，只要全部元素ischecked属性值都为1
      return this.cartInfoList.every(item => item.isChecked == 1);
    }
  }

}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      &>div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;

      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        &>li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;

        }

        .cart-list-con5 {
          width: 14%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 13%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
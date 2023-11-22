<template>
  <div class="app">
   <TypeNav></TypeNav>
   <ListContainer></ListContainer>
   <Recommend></Recommend>
   <Rank></Rank>
   <Like></Like>
   <Floor v-for="(floor) in floorList" :key="floor.id" :floor="floor"></Floor>
   <Brand></Brand>
</div>
</template>

<script>
import ListContainer  from '@/pages/Home/ListContainer';
import Recommend from '@/pages/Home/Recommend';
import Rank from '@/pages/Home/Rank';
import Like from '@/pages/Home/Like';
import Floor from '@/pages/Home/Floor';
import Brand from '@/pages/Home/Brand';
import { mapState } from 'vuex';
export default {
  name:'',
  components:{
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  mounted() {
    this.$store.dispatch('getFloorList');
    // //获取用户信息在首页展示
    this.$store.dispatch('getUserInfo');
  },
  computed: {
    ...mapState({
      floorList: state => state.Home.floorList
    })
  }
}
</script>

<style>

</style>
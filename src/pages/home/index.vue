<template>
  <div>
    <topSwiper :tops="tops"></topSwiper>
    <div class="book-list" v-if="bookList.length">
      <card v-for="(bookinfo,index) in bookList" :key="index" :bookinfo="bookinfo"></card>
    </div>
    <div v-if="!bookList.length" class="text-center">暂无数据</div>
    <div v-if="!more&&bookList.length" class="text-footer">暂无更多数据</div>
  </div>
</template>

<script>
import topSwiper from '@/components/topSwiper.vue'
import card from '@/components/card.vue'
import {get} from '@/utils/index'

export default {
  data(){
    return {
      tops:[],
      bookList:[],
      more:true,
      page:0,
      num:10
    }
  },
  components:{
    card,
    topSwiper
  },
  mounted(){
    this.getBookList();
    this.getTops();
  },
  methods:{
    //图书列表
    async getBookList(){
      let result = await get('/weapp/getbookinfo',{
        page:this.page,
        num:this.num
      });
      if(result.code === 0){
        wx.stopPullDownRefresh();
        let data = result.data;
        //没有更多数据
        if(data.length<this.num){
          this.more = false;
        }
        if(this.page === 0){
          this.bookList = data;
        }else{
          this.bookList = this.bookList.concat(data)
        }
        
      }
    },
    //图书轮播图
    async getTops(){
      let result = await get('/weapp/top');
      if(result.code === 0){
        this.tops = result.data;
      }
    }
  },
  onReachBottom(){
    if(this.more){
      this.page++;
      this.getBookList();
    }
  },
  onPullDownRefresh(){
    this.page = 0;
    this.more = true;
    this.getBookList();
    this.getTops();
  } 

}
</script>

<style scoped>
</style>

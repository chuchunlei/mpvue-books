<template>
<div>
  <div class="comments" v-if="getLoginUserInfo">
    <div :key="index" v-for="(comment,index) in comments" @click="toDetail(comment)">
      <commentList v-if="comments.length" 
                  :comment="comment">
      </commentList>
    </div>
  </div>
  <div class="text-center" v-else>暂无评论</div>
</div>
</template>

<script>
import {get} from '@/utils/index'
import commentList from '@/components/commentList'
import helper from '@/utils/helper'
import {mapGetters} from 'vuex'

export default {
  data(){
    return {
      comments:[],
    }
  },
  components:{
    commentList
  },
  computed:{
      ...mapGetters('user',['getLoginUserInfo'])
  },  
  onShow(){
    this.getCommentsList();
  },
  methods:{
    //获取评论列表
    async getCommentsList(){
        let result = await get('/weapp/getCommentsList',{
            openid:this.getLoginUserInfo.openId
        })
        if(result.code === 0){
            wx.stopPullDownRefresh();
            this.comments = result.data.list;
        }
    },
    toDetail(item){
      this.$router.push({
        path:'/pages/detail/main',
        query:{
          id:item.bookid,
          title:'图书详情'
        }
      })
    }
  },
  onPullDownRefresh(){
    this.getCommentsList()
  }
}
</script>

<style>

</style>

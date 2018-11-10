<template>
  <div class="user">
    <div class="user-info">
      <div class="static" v-if="!isLogin">
        <img class="avatar" src="/static/img/unlogin.png" alt="">
        <button class="name" open-type="getUserInfo" @getuserinfo="login">点击登录</button>
      </div>
      <div class="login" v-else>
        <img class="avatar" :src="userinfo.avatarUrl" alt="">
        <p class="name">{{userinfo.nickName}}</p>
      </div>
    </div>
    <yearProgress></yearProgress>
    <div class="btn" v-if="isLogin">
      <button class="btn-primary" @click="scanBook"> 
        上传图书
      </button>
    </div>
  </div>
</template>

<script>
import yearProgress from '@/components/yearProgress'
import {get,post} from '@/utils'
import qcloud from 'wafer2-client-sdk';
import helper from '@/utils/helper'
import config from '@/utils/config'
import {mapGetters,mapMutations} from 'vuex'

export default {
  data(){
    return{
      isLogin:false,
      userinfo:{nickName:'',avatarUrl:''}
    }
  },
  components:{
    yearProgress
  },
  computed:{
    ...mapGetters('user',['getLoginUserInfo'])
  },
  created(){
    if(this.getLoginUserInfo){
      this.userinfo = this.getLoginUserInfo;
      this.isLogin = true;
    }
  },
  methods:{
    ...mapMutations('user',['SET_LOGIN_USER_INFO']),
    login(){
      helper.showLoading();
      qcloud.setLoginUrl(config.loginUrl);
      qcloud.login({
        success:(res)=>{
          helper.hideLoading();
          this.SET_LOGIN_USER_INFO({
            isCache:true,      
            value:res
          });
          this.isLogin = true;
          this.userinfo = res;
          helper.showToast('登录成功','success');
        },
        fail:(err)=>{
          helper.hideLoading();
          helper.showToast('登录失败','none')
        }
      })
    },
    scanBook(){      
      wx.scanCode({
        success:(res)=>{
          if(res.result){
            this.addBook(res.result)
          }
        }
      })
    },
    async addBook(isbn){
      let openid = wx.getStorageSync('userinfo').openId;
      let result = await post('/weapp/addbook',{
        openid,
        isbn
      })
      if(result.code == 0){
        helper.showModal(result.data.title,result.data.msg)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .user{
    text-align: center;
    .user-info{
      margin-top: 20px;
      .static{
        .name{
          background: transparent;          
          font-size: 32rpx;
          color: #ccc;
          &::after{
            border: 0;
          }
        }
      }
      img{
        width:128rpx;
        height: 128rpx;
        border-radius: 50%;
      }
    }
  }
</style>

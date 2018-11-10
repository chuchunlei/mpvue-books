<template>
    <div class="detail">
        <bookinfo :detailInfo="detailInfo"></bookinfo>
        <div v-if="comments.length" class="comment-title">
            评论
        </div>
        <commentList v-if="comments.length" 
                    :key="index"
                    v-for="(comment,index) in comments"
                    :comment="comment">
        </commentList>
        <div class="comment" v-if="getLoginUserInfo && !hasComment">
            <textarea   v-model='comment'
                        class='textarea'
                        :maxlength='100'
                        placeholder='请输入图书短评'></textarea>

            <div class='location'>
                地理位置：
                <switch class="switch" color='#EA5A49' :checked='location' @change='getGeo'></switch>
                <span class='text-primary'>{{location}}</span>
            </div>
            <div class='phone'>
                手机型号：
                <switch color='#EA5A49' :checked='phone' @change='getPhone'></switch>
                <span class='text-primary'>{{phone}}</span>
            </div>
            <button class="btn-primary" @click="addComment">
                发表评论
            </button>
        </div>
        <div class="text-footer" v-else>
            未登录或已评论
        </div>
    </div>
</template>
<script>
import {get,post} from '@/utils/index'
import bookinfo from '@/components/bookinfo'
import commentList from '@/components/commentList'
import helper from '@/utils/helper'
import {mapGetters} from 'vuex'

export default {
    data(){
        return {
            detailID:'',
            detailInfo:{},
            comments:[],
            hasComment:false,
            comment:'',
            location:'',
            phone:''
        }
    },
    components:{
        bookinfo,
        commentList
    },
    computed:{
        ...mapGetters('user',['getLoginUserInfo'])
    },
    methods:{
        //获取图书详情
        async getDetail(){
            let result = await get('/weapp/bookdetail',{
                id:this.detailID
            });
            if(result.code === 0){
                this.detailInfo = result.data.list;
            }
            
        },
        //获取评论列表
        async getCommentsList(){
            let result = await get('/weapp/getCommentsList',{
                bookid:this.detailID
            })
            if(result.code === 0){
                this.comments = result.data.list;
                this.comments.some((comment)=>{
                    if(comment.openid === this.getLoginUserInfo.openId){
                        this.hasComment = true;
                    }else{
                        this.hasComment = false;
                    }
                })
            }
        },
        //发表评论
        async addComment(){
            if(!this.comment){
                helper.showToast('未输入评论内容','none');
                return;
            }
            let result = await post('/weapp/addcomment',{
                bookid:this.detailID,
                comment:this.comment,
                openid:this.getLoginUserInfo.openId,
                location:this.location,
                phone:this.phone
            })
            this.comment = '';
            this.location = '';
            this.phone = '';
            this.getCommentsList();
            helper.showToast(result.data.msg)
        },
        //地理位置
        getGeo(e){
            const ak = 'ddKs8OSkYjUZsD35xFC5RHXEcNT23FDX';
            const url = 'http://api.map.baidu.com/geocoder/v2/';
            if(e.target.value){
                wx.getLocation({
                    sueecss:(res)=>{
                        console.log(res)
                    },
                    complete:(res)=>{
                        wx.request({
                            url,
                            data:{
                                location:`${res.latitude},${res.longitude}`,
                                ak,
                                output:'json'

                            },
                            success:(data)=>{
                                this.location = data.data.result.addressComponent.city;
                            },
                            dail:(err)=>{
                                this.location = '位置城市'
                            }
                        })
                    }
                })
            }
        },
        //手机
        getPhone(e){
            if(e.target.value){
                let phone = wx.getSystemInfoSync();
                this.phone = phone.model;
            }
        }
    },
    mounted(){
        this.hasComment = false;
        this.detailID = this.$root.$mp.query.id;
        wx.setNavigationBarTitle({
            title:this.$root.$mp.query.title
        });
        this.getDetail();
        this.getCommentsList();
    },
    onShareAppMessage(){
        return{}
    }
}
</script>
<style lang="scss" scoped>
    .comment{
        margin-top:10px;
        font-size: 14px;
        .textarea{
            display: block;
            width:710rpx;
            height:200rpx;
            background:#eee;
            padding:20rpx;
        }
        .location{
            margin-top:10px;
            padding:5px 10px;
        }
        .phone{
            margin-top:10px;
            padding:5px 10px;
            
        }
    }
</style>

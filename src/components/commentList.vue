<template>
    <div class="comment-list">
        <div class="user-info">
            <div class="item">
                <img :src="comment.user_info.avatarUrl" mode="aspectFit">
                {{comment.user_info.nickName}}
            </div>
            <div class="item">
                <span>{{comment.location||'未知地点'}}</span>
                <span class="teat-primary">--</span>
                <span>{{comment.phone||'未知型号'}}</span>
            </div>
        </div>
        <div class="comment">
            {{comment.comment}}
        </div>
    </div>
</template>
<script>
export default {
    props:{
        comment:{
            type:Object,
            required:true
        }
    },
    created(){
        // console.log(this.comment)
    }
}
</script>
<style scoped lang="scss">
    .comment-list{
        padding: 10px;
        font-size: 14px;
        .user-info{
            display: flex;
            justify-content: space-between;
            .item{
                display: flex;
                padding: 10rpx 0;
                img{
                    width: 25px;
                    height: 25px;
                    border-radius: 50%;
                }
            }
        }
    }
</style>

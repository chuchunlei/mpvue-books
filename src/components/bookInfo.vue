<template>
    <div class="book-info" v-if="detailInfo.id">
        <div class="thumb">
            <img mode="aspectFill" class="back" :src="detailInfo.image">
            <div class="front">
                <img :src="detailInfo.image" mode="aspectFit">
                <p class="title">{{detailInfo.title}}</p>
                <p>{{detailInfo.author}}</p>
            </div>
        </div>
        <div class="row">
            <div class="left">
                <img class="avatar" :src="detailInfo.user_info.image">
                <span class="lh-50">{{detailInfo.user_info.name}}</span>
            </div>
            <div class="right">
                <span class="lh-50">{{detailInfo.rate}}分</span>
                <span class="lh-50"><rate :rate="detailInfo.rate"></rate></span>
            </div>
        </div>
        <div class="row">
            <div class="left">
                <span>{{detailInfo.publisher}}</span>
            </div>
            <div class="right">
                <span>{{detailInfo.price}}</span>
            </div>
        </div>

        <div class="tags">
            <div class="badge" :key='tag' v-for='tag in detailInfo.tags'>{{tag}}</div>
        </div>
        <div class="summary">
            <p :key='i' v-for='(sum,i) in detailInfo.summary'>{{sum}}</p>
        </div>

    </div>
</template>
<script>
import rate from '@/components/rate'

export default {
    props:{
        detailInfo:{
            type:Object,
            required:true
        }
    },
    components:{
        rate
    }
}
</script>
<style lang="scss" scoped>
    .book-info{
        font-size: 14px;
        .thumb{
            position: relative;
            width: 100%;
            height: 450rpx;
            overflow: hidden;
            color: #fff;
            .back{
                width: 100%;
                height:100%;
                filter: blur(5px)
            }
            .front{
                position: absolute;
                left: 0;
                top:0;
                width: 100%;
                height: 100%;
                text-align: center;
                img{
                    width: 250rpx;
                    height: 300rpx;
                    margin-top: 20px;
                }
                .title{
                    font-size: 16px;
                }
            }
        }
        .row{
            display: flex;
            justify-content: space-between;
            padding: 10rpx 20rpx;
            .lh-50{
                display: inline-block;
                line-height: 50rpx;
            }
            .left{
                display: flex;
                .avatar{
                    width: 50rpx;
                    height: 50rpx;
                    border-radius: 50%;
                }
            }
            .right{
                display: flex;
            }
        }
        .badge{
            display: inline-block;
            margin:5px;
            padding:5px;
            border-radius: 10px;
            border:1px #EA5A49 solid;
            color:#EA5A49;
        }
        .summary{
            padding:0 15px;
            margin-top:10px;
            p{
                text-indent: 2em;
                text-align: justify;
                font-size:14px;
            }
        }
    }
</style>

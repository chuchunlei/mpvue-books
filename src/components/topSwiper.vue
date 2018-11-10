<template>
    <div class="swiper-container" v-if="tops.length">
        <swiper :indicator-dots=true
                indicator-active-color="#EA5A49"
                :autoplay=true
                :circular=true>
            <swiper-item class="slider" mode="aspectFit" :key="index" v-for="(top,index) in chunkTops">
                <div @click="toDetail(img)" :key="i" v-for="(img,i) in top">
                    <img :src="img.image" />
                </div>
            </swiper-item>
        </swiper>
    </div>
</template>
<script>

export default {
    props:{
        "tops":{
            type:Array,
            required:true
        }
    },
    computed:{
        chunkTops(){
            let tops = this.tops;
            return [tops.slice(0,3),tops.slice(3,6),tops.slice(6)]
        }
    },
    methods: {
        toDetail(img) {
            this.$router.push({
                path:'/pages/detail/main',
                query:{
                    id:img.id,
                    title:img.title
                }
            })
            // wx.navigateTo({
            //     url: `/pages/detail/main?id=${img.id}&title=${img.title}`
            // })
        }
    }
}
</script>
<style scoped lang="scss">
    .swiper-container{
        .slider{
            display:flex;
            justify-content: space-around;
            height: 250rpx;
            margin-top: 10px;
            div{
                width: 30%;
                height: 250rpx;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
</style>

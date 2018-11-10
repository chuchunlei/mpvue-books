<template>
    <div class="card" v-if="bookinfo.id">
        <div class="weui-panel__bd">
          <navigator :url="url" class="weui-media-box weui-media-box_appmsg" hover-class="weui-cell_active">
            <div @click.stop='preview' class="weui-media-box__hd weui-media-box__hd_in-appmsg">
              <image class="weui-media-box__thumb" :src="bookinfo.image" />
            </div>
            <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
              <div class="weui-media-box__title text-primary">
                  <div class="left text-hidden">{{bookinfo.title}}</div>
                  <div class="right">
                      <rate :rate="bookinfo.rate"></rate>
                      {{bookinfo.rate}}
                  </div>
              </div>
              <div class="weui-media-box__desc">
                  <div class="left text-hidden">{{bookinfo.author}}</div>
                  <div class="right">浏览量:{{bookinfo.count}}</div>
              </div>
              <div class="weui-media-box__desc">
                  <div class="left text-hidden">{{bookinfo.publisher}}</div>
                  <div class="right">{{bookinfo.user_info.nickName}}</div>
              </div>
            </div>
          </navigator>
        </div>
    </div>
</template>

<script>
import rate from '@/components/rate.vue'

export default {
    props:{
        bookinfo:{
            type:Object,
            required:true
        }
    },
    components:{
        rate
    },
    computed:{
        url(){
            return `/pages/detail/main?id=${this.bookinfo.id}&title=${this.bookinfo.title}`
        }
    },
    methods:{
        preview(){
            wx.previewImage({
                urls:[this.bookinfo.image]
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .card{
        border-top:1px solid #eee;
        .weui-media-box__title, .weui-media-box__desc{
            display: flex;
            justify-content: space-between;
            .right{
                display: flex;
            }
        }
    }
</style>


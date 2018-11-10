<template>
    <div class="rate">        
        ☆☆☆☆☆
        <div class="cover" :style="style">★★★★★</div>
    </div>
</template>

<script>
export default {
    props:{
        rate:{
            type:Number,
            required:true
        }
    },
    computed:{
        style(){
            return `width:${((this.rate)/10*100)}%`
        }
    }
    
}
</script>

<style lang="scss">
    .rate{
        position: relative;
        .cover{
            position: absolute;
            left: 0;
            top: 0;
            overflow: hidden;
            z-index: 1000
        }
    }
</style>

<template>
    <div class="year-progress">
        <progress :percent="percent" color="#ea5a49" active=true show-info />
        {{year}}已经过去{{overDays}}天
    </div>
</template>

<script>
export default {
    //计算出一年的天数
    //过了多少天
    computed:{
        year(){
            return new Date().getFullYear();
        },
        getYearOfDays(){
            let year = new Date().getFullYear();
            if(year%400 === 0){
                return 366;
            }else if(year%4 === 0 && year%100 !== 0){
                return 366;
            }else{
                return 365;
            }
        },
        overDays(){
            let start = new Date();
            start.setMonth(0);
            start.setDate(1);
            let disTime = new Date().getTime() - start.getTime();
            return ((disTime/1000/60/60/24)+1).toFixed(0);
        },
        percent(){
            return ((this.overDays/this.getYearOfDays)*100).toFixed(1)
        }
    }


}
</script>

<style lang="scss" scoped>
    .year-progress{
        width: 80%;
        margin: 20rpx auto;
    }
</style>

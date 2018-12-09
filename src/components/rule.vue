<template>
    <div>
        <mybackground />
        <button class="homebutton">活动时间</button>
        <p class="timerule">{{time}}</p>
        <button class="homebutton">活动说明</button>
        <p class="ruletext" v-html="rule"></p>
        <myfooter where="rule" />
    </div>
</template>

<script>
    export default {
        name: "rule",
        data() {
            return {
                time:'',
                rule:''
            }
        },
        created() {
            var that = this
            this.$http.post('http://sgh2.clarkwan.com/api/notice')
                .then(function (res) {
                    that.time = res.data.data.time
                    that.rule = res.data.data.content
                })
        },
    }
</script>

<style scoped>
    .homebutton {
        display: block;
        border: red solid 1px;
        color: white;
        width: 95%;
        margin-top: 10px;
        height: 50px;
        border-radius: 5px;
        margin-left: 10px;
        background-color: rgb(237, 96, 45);
    }

    .timerule {
        background-color: white;
        width: 95%;
        text-align: center;
        margin-left: 10px;
        border-radius: 5px;
    }

    .ruletext {
        background-color: white;
        width: 95%;
        margin-left: 10px;
        border-radius: 5px;
        padding: 10px 0 30px 5px;
        word-break: break-all;
    }
</style>
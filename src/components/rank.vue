<template>
    <div>
        <mybackground />
        <button class="homebutton">排行榜</button>
        <div v-for="rank in ranks" class="rank">
            <p>{{rank.num}}</p>
            <p>{{rank.name}}</p>
            <p>得分：{{rank.mark}}</p>
        </div>
        <myfooter where="rank" />
    </div>
</template>

<script>
    export default {
        name: "rank",
        data() {
            return {
                time:'',
                rule:'',
                ranks:[]
            }
        },
        created() {
            if (this.$route.query.mark != undefined) {
                alert('恭喜你本次得分'+ this.$route.query.mark +'分')
            }
            var that = this
            this.$http.post('http://sgh2.clarkwan.com/api/question/rankingList')
                .then(function (res) {
                    console.log(res)
                    for (let i = 0; i <= res.data.data.length; i++) {
                        var obj = Object.assign({},res.data.data[i])
                        obj.name = res.data.data[i].name
                        obj.num = i + 1
                        obj.mark= res.data.data[i].grade
                        that.$set(that.ranks, i, obj)
                    }
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
        height: 50px;
        border-radius: 5px;
        margin-left: 10px;
        background-color: rgb(237, 96, 45);
    }

    .rank {
        display: flex;
        justify-content: space-around;
    }
</style>
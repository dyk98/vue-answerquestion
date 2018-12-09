<template>
    <div>
        <mybackground/>
        <div>
            <p class="back" @click="goback">
                <返回
            </p>
        </div>
        <div v-for="question in questions">
            <p>题目{{question.index}}:{{question.question}}</p>
            <input type="radio" :name="question.index" value="a" :class="question.num">{{question.option_a}}
            <input type="radio" :name="question.index" value="b" :class="question.num">>{{question.option_b}}
            <input type="radio" :name="question.index" value="c" :class="question.num">>{{question.option_c}}
            <input type="radio" :name="question.index" value="d" :class="question.num">>{{question.option_d}}
        </div>
        <button class="overanswer homebutton" @click="giveanswer">提交答案</button>
    </div>
</template>

<script>
    export default {
        name: "answer",
        created() {
            var that = this
            this.$http.post('http://sgh2.clarkwan.com/api/question/index')
                .then(function (res) {
                    console.log(res)
                    for (let i = 0; i <= res.data.data.num; i++) {
                        var obj = Object.assign({}, res.data.data.question[i])
                        obj.question = res.data.data.question[i].question
                        obj.index = i + 1
                        obj.opion_a = res.data.data.question[i].option_a
                        obj.opion_b = res.data.data.question[i].option_b
                        obj.opion_c = res.data.data.question[i].option_c
                        obj.opion_d = res.data.data.question[i].option_d
                        switch (res.data.data.question[i].true_option) {
                            case 0:
                                obj.true_option = 'a'
                                break;
                            case 1:
                                obj.true_option = 'b'
                                break;
                            case 2:
                                obj.true_option = 'c'
                                break;
                            case 3:
                                obj.true_option = 'd'
                                break;

                        }
                        //obj.true_option = res.data.data.question[i].true_option
                        obj.num = 'answer' + i + ''
                        that.$set(that.questions, i, obj)
                    }
                })
        },
        data() {
            return {
                questions: [],
                phone: this.$route.query.phone,
                name: this.$route.query.name,
                mark: 0,
            }
        },
        methods: {
            goback() {
                //console.log(this.phone)
                this.$router.push('/')
            },
            giveanswer() {
                if (this.phone == undefined) {
                    alert('请从正式渠道进入')
                } else {
                    var that = this;
                    for (let i = 0; i <= this.questions.length; i++) {
                        var obj = document.getElementsByClassName('answer' + i + '');
                        for (var u = 0; u < obj.length; u++) {
                            if (obj[u].checked) {
                                if (obj[u].value == that.questions[i].true_option) {
                                    that.mark++
                                }
                            }
                        }
                    }
                    this.$http.get('http://sgh2.clarkwan.com/api/question/getUserinfo', {
                        params: {
                            mobile: that.phone,
                            name: that.name,
                            grade: that.mark
                        }
                    })
                        .then(function (res) {
                            console.log(res)
                            if(res.data.status == 1) {
                                that.$router.push('/rank?mark='+ that.mark +'')
                            }
                        })
                }

                //console.log(this.answer)
            },
        },
    }
</script>

<style scoped>
    .back {
        font-size: 17px;
        color: white;
        margin-left: 10px;
        margin-top: 5px;
        background-color: rgb(237, 96, 45);
        text-align: center;
        width: 90px;
        border-radius: 5px;
    }

    .overanswer {
        border: 1px solid black;
    }

    .homebutton {
        display: block;
        border: red solid 1px;
        color: white;
        width: 95%;
        margin-top: 20px;
        height: 50px;
        border-radius: 5px;
        margin-left: 10px;
        background-color: rgb(237, 96, 45);
        margin-bottom: 30px;
    }
</style>
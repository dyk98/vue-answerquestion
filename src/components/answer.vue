<template>
    <div>
        <mybackground/>
        <div>
            <p class="back" @click="goback">
                <返回
            </p>
        </div>
        <div class="padding">
            <div v-if="countdown >= 0">倒计时:{{countdown}}</div>
            <div v-for="question in questions" v-if="question.index == questionnum" class="questionall">
                <p>题目{{question.index}}:{{question.question}}</p>
                A:<input type="radio" :name="question.index" value="a" :class="question.num" checked>{{question.option_a}}
                B:<input type="radio" :name="question.index" value="b" :class="question.num">{{question.option_b}}
                C:<input type="radio" :name="question.index" value="c" :class="question.num">{{question.option_c}}
                D:<input type="radio" :name="question.index" value="d" :class="question.num">{{question.option_d}}
            </div>
            <div v-if="questionnum == 0">
                <button class="overanswer homebutton" @click="startanswer">开始作答</button>
                <p class="timerule">共20道题，每道题限时20秒，若回答正确则进入下题，若回答错误则提示正确答案</p>
            </div>
            <button class="overanswer homebutton" @click="nextquestion" v-if="questionnum != 20 && questionnum!= 0">
                下一题
            </button>
            <button class="overanswer homebutton" @click="giveanswer" v-if="questionnum == 20">提交答案</button>
            <p class="timerule" v-if="ontips">{{tips}}</p>
        </div>

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
                questionnum: 0,
                tips: '',
                ontips: false,
                haveclick: false,
                countdown: 20,
            }
        },
        methods: {
            startanswer() {
                this.questionnum++
                let clock = window.setInterval(() => {
                    this.countdown--
                    if (this.countdown <= 0) {     //当倒计时小于0时清除定时器
                        this.$options.methods.nextquestion.bind(this)()
                    }
                }, 1000)
            },
            nextquestion() {
                if (this.haveclick == true) {
                    this.questionnum++
                    this.haveclick = false
                    this.ontips = false
                    this.countdown = 20
                    var clock = window.setInterval(() => {
                        this.countdown--
                        if (this.countdown <= 0) {     //当倒计时小于0时清除定时器
                            this.$options.methods.nextquestion()
                            window.clearInterval(clock)
                        }
                    }, 1000)
                    window.clearInterval(clock)
                } else {
                    var i = this.questionnum - 1
                    var obj = document.getElementsByClassName('answer' + i + '')
                    for (var u = 0; u < obj.length; u++) {
                        obj[u].disabled = true
                        if (obj[u].checked) {
                            if (obj[u].value == this.questions[i].true_option) {
                                this.countdown = 20
                                this.mark++
                                this.questionnum++
                                this.haveclick = false
                                this.ontips = false
                                window.clearInterval(clock)
                            } else {
                                this.ontips = true
                                this.tips = '该题正确答案为' + this.questions[i].true_option + ''
                                this.haveclick = true
                            }
                        }
                    }
                }
            },
            goback() {
                //console.log(this.phone)
                this.$router.push('/')
            },
            giveanswer() {
                if (this.phone == undefined) {
                    alert('请从正式渠道进入')
                } else {
                    var that = this;
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

    .padding {
        padding-top: 20%;
    }

    .questionall {
        padding-left: 10px;
    }

    .timerule {
        background-color: white;
        width: 95%;
        text-align: center;
        margin-left: 10px;
        border-radius: 5px;
    }
</style>
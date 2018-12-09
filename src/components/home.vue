<template>
    <div style="text-align: center">
        <mybackground/>

        <button class="homebutton">已经有{{joinnum}}人参与此活动</button>
        <button class="homebutton">分享我的快乐</button>
        <button class="homebutton">技术支持：{{company}}</button>
        <button class="homebutton" @click="startanswer">开始答题</button>
        <div class="userinfo">
            <div>
                <p>请输入姓名：</p>
                <input class="usermsg" type="text" placeholder="姓名必填" v-model="username">
            </div>
            <div>
                <p>请输入手机号：</p>
                <input class="usermsg" type="number" placeholder="手机号必填" v-model="userphone">
            </div>
        </div>
        <myfooter where="home"/>
    </div>
</template>

<script>
    function isPoneAvailable($poneInput) {
        var myreg = /^[1][3,4,5,7,8,6][0-9]{9}$/;
        if (!myreg.test($poneInput)) {
            return false;
        } else {
            return true;
        }
    }

    export default {
        name: "home",
        data() {
            return {
                joinnum: '11763',
                company: '宁夏远拓网络科技有限公司',
                username: '',
                userphone: ''
            }
        },
        created() {
            var that = this
            this.$http.post('http://sgh2.clarkwan.com/api/notice')
                .then(function (res) {
                    that.joinnum = res.data.data.num
                })
        },
        methods: {
            startanswer() {
                var that = this
                if (this.userphone == '') {
                    alert('请先输入手机号')
                } else {
                    if (isPoneAvailable(this.userphone)) {
                        if (that.username == '') {
                            alert('请输入姓名')
                        } else {
                            if (that.username <2 || that.username >4) {
                                alert(请输入正确姓名)
                            } else {
                                this.$http.get('http://sgh2.clarkwan.com/api/question/checkNum', {
                                    params: {
                                        mobile: that.userphone
                                    }
                                })
                                    .then(function (res) {
                                        console.log(res)
                                        if (res.data.msg == "可作答") {
                                            that.$router.push('/answer?name=' + that.username + '&phone=' + that.userphone + '')
                                        } else {
                                            alert('您今日已回答过问题，请明日再来')
                                        }
                                    })
                            }
                        }

                    } else {
                        alert('请输入正确手机号')
                    }
                }
            }
        }
    }
</script>

<style scoped>
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
    }

    .usermsg {
        height: 30px;
        border-radius: 6px;
        border: none;
        width: 50%;
        color: rgba(0, 0, 0, 0.8);
        font-size: 16px;
        text-align: center;
    }
</style>
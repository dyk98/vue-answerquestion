<template>
    <div>
        <div class="margin"></div>
        <div class="footer">
            <router-link to="/">
                <div>
                    <img :src="activehome" alt="" v-if="where == 'home' " class="tabbar">
                    <img :src="home" alt="" class="tabbar" v-else>
                </div>
            </router-link>
            <router-link to="/rule">
                <div>
                    <img :src="activerule" alt="" class="tabbar" v-if="where == 'rule'">
                    <img :src="rule" alt="" class="tabbar" v-else>
                </div>
            </router-link>
            <router-link to="rank">
                <div>
                    <img :src="activerank" alt="" class="tabbar" v-if="where == 'rank'">
                    <img :src="rank" alt="" class="tabbar" v-else>
                </div>
            </router-link>
        </div>
    </div>

</template>

<script>
    export default {
        name: "myfooter",
        data() {
            return {
                activehome: 'static/activehome.png',
                home: 'static/home.png',
                activehome: 'static/activehome.png',
                rule: 'static/rule.png',
                activerule: 'static/activerule.png',
                rank: 'static/rank.png',
                activerank: 'static/activerank.png',
            }
        },
        props: {
            where: {
                default: 'home'
            }
        },
    }
</script>

<style scoped>
    .tabbar {
        width: 40px;
        height: 40px;
    }

    .footer {
        display: flex;
        justify-content: space-around;
        background-color: #fdf4d0;
        position: fixed;
        width: 100%;
        bottom: 0;
    }

    .margin {
        margin-top: 50px;
    }
</style>
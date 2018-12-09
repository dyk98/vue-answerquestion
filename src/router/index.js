import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import rule from '@/components/rule'
import rank from '@/components/rank'
import answer from '@/components/answer'
import myfooter from '@/components/common/myfooter'
import mybackground from '@/components/common/mybackground'


Vue.component('myfooter', myfooter)

Vue.component('mybackground', mybackground)

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: home
        }, {
            path: '/rule',
            name: 'rule',
            component: rule
        }, {
            path: '/rank',
            name: 'rank',
            component: rank
        }, {
            path: '/answer',
            name: 'answer',
            component: answer
        },
    ]
})

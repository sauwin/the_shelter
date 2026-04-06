import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../views/HomePage.vue'
import HostPage from '../views/HostPage.vue'
import JoinPage from '../views/JoinPage.vue'
import Game from '../views/Game.vue'
import GameOver from '../views/GameOver.vue'

const routes = [
    {path: '/', name: 'home', component: HomePage},
    {path: '/host', name: "host", component: HostPage},
    {path: '/join', name: 'join', component: JoinPage},
    {path: '/game/:code', name: 'game', component: Game},
    {path: '/gameover', name: 'gameover', component: GameOver}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
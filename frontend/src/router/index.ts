import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../views/HomePage.vue'
import HostPage from '../views/HostPage.vue'
import JoinPage from '../views/JoinPage.vue'
import Lobby from '../views/Lobby.vue'
import GameOver from '../views/GameOver.vue'

const routes = [
    {path: '/', name: 'home', component: HomePage},
    {path: '/host', name: "host", component: HostPage},
    {path: '/join', name: 'join', component: JoinPage},
    {path: '/lobby/:code', name: 'lobby', component: Lobby},
    {path: '/gameover', name: 'gameover', component: GameOver}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
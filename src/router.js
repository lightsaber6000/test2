import { createRouter, createWebHistory } from 'vue-router'

import BaseRouter from './router/BaseRouter'

const routes = [...BaseRouter]

export default createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    history: createWebHistory(),
    routes,
})

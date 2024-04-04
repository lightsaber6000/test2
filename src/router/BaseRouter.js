import store from '@/store'

export default [
    {
        path: '/:catchAll(.*)',
        name: '404',
        component: () => import('@/views/404.vue'),
    },
    {
        path: '/auth',
        name: 'auth',
        component: () => import('@/views/AuthView.vue'),
        beforeEnter: (to, from, next) => {
            if (store.getters.get_user_auth.token) {
                next('/')
            } else {
                next()
            }
        },
    },
    {
        path: '/',
        name: 'main',
        component: () => import('@/views/MainView.vue'),
        beforeEnter: (to, from, next) => {
            if (!store.getters.get_user_auth.token) {
                next('/auth')
            } else {
                next()
            }
        },
    },
]

import store from '@/store'

export default [
    {
        path: '/:catchAll(.*)',
        name: '404',
        component: () => import('@/views/404.vue'),
        meta: {
            title: '404',
        },
    },
    {
        path: '/auth',
        name: 'auth',
        component: () => import('@/views/AuthView.vue'),
        meta: {
            title: 'Главн',
        },
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
        meta: {
            title: 'Главн',
        },
        beforeEnter: (to, from, next) => {
            if (!store.getters.get_user_auth.token) {
                next('/auth')
            } else {
                next()
            }
        },
    },
]

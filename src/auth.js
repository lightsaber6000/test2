import store from '@/store'
import setToken from '@/api/set-token'

export default {
    install(app) {
        const access = localStorage.getItem('access-token')
        const refresh = localStorage.getItem('refresh-token')
        const email = localStorage.getItem('email')
        if (access) {
            store.commit('UPDATE_USER_AUTH', { access, refresh })
            store.commit('UPDATE_USER_DATA', { email })
            setToken(access, refresh, email)
        }
    },
}

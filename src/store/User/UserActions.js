import login from '@/api/auth/login.api'
import refresh from '@/api/auth/refresh.api'
import setToken from '@/api/set-token'
import removeToken from '@/api/remove-token'

import store from '@/store'
import router from '@/router'

export default {
    setUserAuth(state, options) {
        return login(options)
            .then(({ data }) => {
                const { access, refresh } = data
                setToken(access, refresh, options.email)
                store.commit('UPDATE_USER_AUTH', { access, refresh })
                store.commit('UPDATE_USER_DATA', { email: options.email })
                return data
            })
            .catch((response) => {
                return response
            })
    },
    setUserLogout() {
        removeToken()
        router.replace({ path: `/auth` })
        store.commit('UPDATE_USER_AUTH', { access: '', refresh: '' })
        store.commit('UPDATE_USER_DATA', { email: '' })
    },
    refreshUserAuth(state, token) {
        return refresh(token)
            .then(({ data }) => {
                const { access } = data
                setToken(access, refresh)
                store.commit('UPDATE_USER_AUTH', { access, refresh: token })
                return data
            })
            .catch(({ response }) => {
                return response
            })
    },
}

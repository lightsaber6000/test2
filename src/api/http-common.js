import axios from 'axios'
import store from '../store'
import router from '../router'

const HTTP = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
})

HTTP.interceptors.response.use(
    (response) => {
        return Promise.resolve(response)
    },
    async ({ response }) => {
        const status_code = response.status
        const code = response?.data?.code
        if (status_code === 401 && code === 'token_not_valid') {
            try {
                await store.dispatch('refreshUserAuth', store.getters.get_user_auth.refresh)
                response.config.headers.Authorization = HTTP.defaults.headers.common.Authorization
                return HTTP(response.config)
            } catch (error) {
                store.dispatch('setUserLogout')
                return Promise.reject(error)
            }
        }
        switch (true) {
            case status_code === 404:
                router.push('/404')
                break
            case status_code > 499 && status_code < 700:
                alert('Внутренняя ошибка сервера')
                break
            case status_code === 403: {
                alert('Ошибка 403: доступ запрещён')
                break
            }
            case status_code === 409: {
                alert('Ошибка 409: конфликт с состоянием сервера')
                break
            }
            default:
                break
        }
        return Promise.reject(response)
    },
)

export default HTTP

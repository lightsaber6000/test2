import HTTP from '@/api/http-common'

const removeToken = () => {
    localStorage.removeItem('access-token')
    localStorage.removeItem('refresh-token')
    localStorage.removeItem('email')
    HTTP.defaults.headers.common.Authorization = ''
    localStorage.removeItem('sentFirebaseMessagingToken')
}

export default removeToken

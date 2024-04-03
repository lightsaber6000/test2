import HTTP from '@/api/http-common'

export default (access_token, refresh_token, email = null) => {
    HTTP.defaults.headers.common.Authorization = `JWT ${access_token}`
    localStorage.setItem('access-token', access_token)
    localStorage.setItem('refresh-token', refresh_token)
    if (email) localStorage.setItem('email', email)
}

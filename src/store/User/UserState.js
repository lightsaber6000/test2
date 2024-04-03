export default {
    auth: {
        token: localStorage.getItem('access-token') || '',
        refresh: localStorage.getItem('refresh-token') || '',
    },
    userData: {
        email: localStorage.getItem('email') || '',
    },
}

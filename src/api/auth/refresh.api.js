import HTTP from '@/api/http-common'

export default (refresh) => HTTP.post('/api/user/jwt/refresh/', { refresh })

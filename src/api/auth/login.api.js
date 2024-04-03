import HTTP from '@/api/http-common'

export default (data) => HTTP.post('/api/user/jwt/create/', data)

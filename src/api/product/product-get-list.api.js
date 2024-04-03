import HTTP from '@/api/http-common'

export default (params) => {
    return HTTP.get(`/api/product/`, { params })
}

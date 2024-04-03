import Vuex from 'vuex'

import UserModule from './store/User/UserModule'

export default new Vuex.Store({
    modules: {
        UserModule,
    },
})

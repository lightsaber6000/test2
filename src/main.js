import { createApp } from 'vue'

import router from './router'
import store from './store'
import auth from './auth'
import clickOutside from './clickOutside'

import App from './App.vue'

import '@/assets/styles/main.sass'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(auth)

app.use(clickOutside)

app.mount('#app')

export { app }

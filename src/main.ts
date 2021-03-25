import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import './router/permission'

import store from './store'

import '@/styles/reset.css'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import vuetify from './plugins/vuetify'

const app = createApp(App)

// app.use(ElementPlus)
// app.provide('$message', ElMessage)

app.use(store)
app.use(router)
app.use(vuetify)

app.mount('#app')

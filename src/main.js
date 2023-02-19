import { createApp } from 'vue'
import {createPinia} from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import './style.css'
import './template'

import App from './App.vue'

import router from './router/index'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

import "nprogress/nprogress.css"

const app =createApp(App);
app.use(pinia);
app.use(router)
app.use(ElementPlus)
app.mount('#app')
// app.config.errorHandler = (err, instance, info) => {
//     // report error to tracking services
//   }

app.config.globalProperties.$filters={
    currencySymbol(value){
        return "৳" +value.toLocaleString();
    }
}

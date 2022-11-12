import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia';
import router from '@/router'
import App from './App.vue'

const pinia = createPinia()

/*
Registering pinia plugins: 
Adds a property "router" to all pinia store
markRaw macht alles was wir in den store machen non-reactive
Ziel: hier soll der router im store benutzbar gemacht werden
Danach kann mit mit this.router im store auf router zugreifen

Erklärung:
https://www.udemy.com/course/vue-js-3-composition-api/learn/lecture/32533406
*/
pinia.use(({ store }) => {
    store.router = markRaw(router)
})

createApp(App)
    .use(pinia)
    .use(router)
    .mount('#app')
import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

import mdiVue from 'mdi-vue/v3'
import {
    mdiHome,
    mdiClipboardTextOutline,
    mdiCalendarEdit,
    mdiCalendar,
    mdiTextBoxPlusOutline,
    mdiTextBoxOutline,
    mdiAccount,
    mdiLink,
    mdiLoading,
    mdiCheckboxBlankCircleOutline
}  from '@mdi/js'

import './styles/app.css'
import './assets/tailwind.css'

createApp(App)
    .use(router)
    .use(mdiVue, {
        icons: {
            mdiHome,
            mdiClipboardTextOutline,
            mdiCalendarEdit,
            mdiCalendar,
            mdiTextBoxPlusOutline,
            mdiTextBoxOutline,
            mdiAccount,
            mdiLink,
            mdiLoading,
            mdiCheckboxBlankCircleOutline
            

        }
    })
    .mount('#app')

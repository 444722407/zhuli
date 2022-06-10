import { createApp } from 'vue'
import App from './App.vue'
import './app.css'
import VConsole from 'vconsole';
import {createI18n} from 'vue-i18n'
import {lang}  from './lang'

if(process.env.NODE_ENV === "development"){
  
  const vConsole = new VConsole();
  window.VConsole = vConsole;
}
const i18n = createI18n({
  locale: 'en',
  messages:lang
})

createApp(App).use(i18n).mount('#app')

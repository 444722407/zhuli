import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/swiper-bundle.min.css'
import './app.css'
import VConsole from 'vconsole';
import {createI18n} from 'vue-i18n'
import lang  from './lang'
import { createRouter,createWebHashHistory } from 'vue-router'
import Index from './views/index'
import Test from './views/test'
 const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes:[
    { path: '/index', component: Index },
    { path: '/test', component: Test },
    { path: '/', redirect:"/index" },
  ], 
})


if(process.env.NODE_ENV === "development"){
  const vConsole = new VConsole();
  window.VConsole = vConsole;
}


const i18n = createI18n({
  locale: 'null',
  messages:lang
})
const app = createApp(App);
app.use(i18n)
app.use(router)
app.mount('#app')


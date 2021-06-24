import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import installElementPlus from './plugins/element.js'
import installI18n from './plugins/i18n.js'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

const app = createApp(App);
// installElementPlus(app);
installI18n(app);
app.config.productionTip = false;
app
    .use(Antd)
    .use(store)
    .use(router)
    .mount('#app')

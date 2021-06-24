import { createI18n } from 'vue-i18n'
import messages from '../utils/i18n'
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import zhEn from 'ant-design-vue/es/locale/en_US';

const i18n = createI18n({
    locale: zhCN.locale,
    fallbackLocale: zhEn.locale,
    messages,
})
  
export default (app) => {
    app.use(i18n)
}
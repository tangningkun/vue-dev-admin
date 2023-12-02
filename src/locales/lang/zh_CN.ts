import { genMessage } from '../helper';
import antdLocale from 'ant-design-vue/es/locale/zh_CN';

// const modules = import.meta.globEager('./zh-CN/**/*.ts');
const modules: any = import.meta.glob('./zh-CN/**/*.ts', { eager: true }); //globEager('./zh-CN/**/*.ts');
export default {
    message: {
        ...genMessage(modules, 'zh-CN'),
        antdLocale,
    },
};

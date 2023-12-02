import { genMessage } from '../helper';
import antdLocale from 'ant-design-vue/es/locale/en_US';

const modules: any = import.meta.glob('./en/**/*.ts', { eager: true }); //globEager('./en/**/*.ts');
export default {
    message: {
        ...genMessage(modules, 'en'),
        antdLocale,
    },
    dateLocale: null,
    dateLocaleName: 'en',
};

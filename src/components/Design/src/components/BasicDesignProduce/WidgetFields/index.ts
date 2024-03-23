/**
 * @ Author: TANGNK
 * @ Create Time: 2024-02-26 17:16:50
 * @ Modified by: TANGNK
 * @ Modified time: 2024-03-04 17:33:27
 * @ Description:
 */

import { isStringEmpty } from '/@/utils/is';

const comps = {};
const modules: any = import.meta.glob('./**/*.{vue,tsx}', { eager: true });

for (const path in modules) {
    const name: string = modules[path].default.name;
    //TODO:只取组件名称以【DesignWidget】开头的组件
    if (!isStringEmpty(name) && name.startsWith('DesignWidget')) {
        comps[name] = modules[path].default;
    }
}
console.log('comps', comps);
export default comps;

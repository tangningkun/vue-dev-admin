import { resolve } from 'path';
import { theme } from 'ant-design-vue';
/**
 * less global variable
 */
// (dark = false
export function generateModifyVars(dark = false) {
    const { defaultAlgorithm, darkAlgorithm, defaultSeed } = theme;
    let mapToken = defaultAlgorithm(defaultSeed);
    if (dark) {
        mapToken = darkAlgorithm(defaultSeed);
    }
    const result = {
        ...mapToken,
        hack: `true; @import (reference) "${resolve('src/styles/config.less')}";`,
    };
    return result;
}

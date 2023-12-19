import { resolve } from 'path';
import { theme } from 'ant-design-vue';
/**
 * less global variable
 */
// (dark = false
export function generateModifyVars(dark = false) {
    const { defaultAlgorithm, darkAlgorithm, compactAlgorithm, defaultSeed } = theme;
    let mapToken = defaultAlgorithm(defaultSeed);
    if (dark) {
        mapToken = darkAlgorithm(defaultSeed);
    }
    const compactToken = compactAlgorithm(defaultSeed);

    const result = {
        ...mapToken,
        fontSize: compactToken.fontSize,
        fontFamily: compactToken.fontFamily,
        hack: `true; @import (reference) "${resolve('src/styles/config.less')}";`,
    };
    return result;
}

import { generateAntColors, primaryColor } from '../config/themeConfig';
import { resolve } from 'path';
import { theme } from 'ant-design-vue';
/**
 * less global variable
 */
// (dark = false
export function generateModifyVars(dark = false) {
    const palettes = generateAntColors(primaryColor);

    const primaryColorObj: Record<string, string> = {};

    for (let index = 0; index < 10; index++) {
        primaryColorObj[`primary-${index + 1}`] = palettes[index];
    }
    const { defaultAlgorithm, darkAlgorithm, defaultSeed } = theme;
    let mapToken = defaultAlgorithm(defaultSeed);
    if (dark) {
        mapToken = darkAlgorithm(defaultSeed);
    }
    const result = {
        ...mapToken,
        hack: `true; @import (reference) "${resolve('src/styles/config.less')}";`,
    };
    // console.log('generateModifyVars', result);
    return result;
}

import { generateAntColors, primaryColor } from '../config/themeConfig';
import { resolve } from 'path';
import { theme } from 'ant-design-vue';
import convertLegacyToken from 'ant-design-vue/lib/theme/convertLegacyToken';
/**
 * less global variable
 */
// (dark = false
export function generateModifyVars(dark = false) {
    const palettes = generateAntColors(primaryColor);
    const primary = palettes[5];

    const primaryColorObj: Record<string, string> = {};

    for (let index = 0; index < 10; index++) {
        primaryColorObj[`primary-${index + 1}`] = palettes[index];
    }
    const { defaultAlgorithm, darkAlgorithm, defaultSeed } = theme;
    let mapToken = defaultAlgorithm(defaultSeed);
    if (dark) {
        mapToken = darkAlgorithm(defaultSeed);
    }
    // console.log('mapToken', mapToken);
    const convertLegacyTokenFun = convertLegacyToken as any;
    const modifyVars = convertLegacyTokenFun.default(mapToken);

    console.log('modifyVars', modifyVars);
    const result = {
        ...modifyVars,
        // // Used for global import to avoid the need to import each style file separately
        // // reference:  Avoid repeated references
        hack: `true; @import (reference) "${resolve('src/styles/config.less')}";`,
        'primary-color': primary,
        ...primaryColorObj,
        'info-color': primary,
        'processing-color': primary,
        'success-color': '#55D187', //  Success color
        'error-color': '#ED6F6F', //  False color
        'warning-color': '#EFBD47', //   Warning color
        // 'border-color-base': '#EEEEEE',
        'font-size-base': '14px', //  Main font size
        'border-radius-base': '2px', //  Component/float fillet
        'link-color': primary, //   Link color
        'app-content-background': '#fafafa', //   Link color
    };
    // console.log('generateModifyVars', result);
    return result;
}

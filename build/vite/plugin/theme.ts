/**
 * Vite plugin for website theme color switching
 * https://github.com/anncwb/vite-plugin-theme
 */
import type { PluginOption } from 'vite';
import path from 'path';
import { viteThemePlugin, antdDarkThemePlugin, mixLighten, mixDarken, tinycolor } from 'vite-plugin-theme';
import { getThemeColors, generateColors } from '../../config/themeConfig';
import { generateModifyVars } from '../../generate/generateModifyVars';

export function configThemePlugin(): PluginOption[] {
    const colors = generateColors({
        mixDarken,
        mixLighten,
        tinycolor,
    });
    const plugin = [
        viteThemePlugin({
            colorVariables: [...getThemeColors(), ...colors],
        }),
        antdDarkThemePlugin({
            preloadFiles: [
                // path.resolve(process.cwd(), 'node_modules/ant-design-vue/dist/antd.less'),
                //path.resolve(process.cwd(), 'node_modules/ant-design-vue/dist/antd.dark.less'),
                path.resolve(process.cwd(), 'src/styles/index.less'),
            ],
            // filter: (id) => (isBuild ? !id.endsWith('antd.less') : true),
            darkModifyVars: {
                ...generateModifyVars(true),
            },
        }),
    ];

    return plugin as PluginOption[];
}

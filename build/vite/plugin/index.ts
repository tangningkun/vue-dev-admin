import { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';
import vueJsx from '@vitejs/plugin-vue-jsx';
import VitePluginCertificate from 'vite-plugin-mkcert';
/**
 * * 扩展setup插件，支持在script标签中使用name属性
 * usage: <script setup name="MyComp"></script>
 */
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import { configVisualizerConfig } from './visualizer';
import { configHtmlPlugin } from './html';
import { configUnocssPlugin } from './unocss';
import { configResolverPlugin } from './resolver';
import { configMockPlugin } from './mock';
import { configCompressPlugin } from './compress';
import { configImageminPlugin } from './imagemin';
import { configPwaConfig } from './pwa';
// import { configStyleImportPlugin } from './styleImport';
import { configSvgIconsPlugin } from './svgSprite';
import { configThemePlugin } from './theme';
// import { configIconPlugin } from './icon';

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
    const {
        VITE_USE_IMAGEMIN /*是否启用图像压缩 */,
        VITE_USE_MOCK /*是否打开MOCK */,
        VITE_LEGACY /*是否兼容旧版浏览器 */,
        VITE_BUILD_COMPRESS /* 是否启用gzip或brotli压缩*/,
        VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE /* 使用压缩时是否删除源文件*/,
    } = viteEnv;

    const vitePlugins: (PluginOption | PluginOption[])[] = [
        vue(),

        vueJsx(),

        VueSetupExtend(),

        VitePluginCertificate({
            source: 'coding',
        }),
    ];

    //unocss
    vitePlugins.push(configUnocssPlugin());

    // @vitejs/plugin-legacy
    VITE_LEGACY && isBuild && vitePlugins.push(legacy());

    // vite-plugin-mock
    VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild));

    // vite-plugin-html
    vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));

    // vite-plugin-svg-icons
    vitePlugins.push(configSvgIconsPlugin(isBuild));

    // vite-plugin-style-import
    // vitePlugins.push(configStyleImportPlugin());

    //unplugin-vue-components 自动导入UI库
    vitePlugins.push(configResolverPlugin());

    //unplugin-icons/vite 自动导入图标
    // vitePlugins.push(configIconPlugin());

    // rollup-plugin-visualizer
    vitePlugins.push(configVisualizerConfig(viteEnv));

    // vite-plugin-theme
    vitePlugins.push(configThemePlugin(isBuild));

    if (isBuild) {
        // vite-plugin-imagemin
        VITE_USE_IMAGEMIN && vitePlugins.push(configImageminPlugin());

        // rollup-plugin-gzip
        vitePlugins.push(configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE));

        // vite-plugin-pwa
        vitePlugins.push(configPwaConfig(viteEnv));
    }

    return vitePlugins;
}

import { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
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

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
    const {} = viteEnv;

    const vitePlugins: (PluginOption | PluginOption[])[] = [
        vue(),

        vueJsx(),

        VueSetupExtend(),

        VitePluginCertificate({
            source: 'coding',
        }),
    ];

    //unplugin-vue-components NaiveUi
    vitePlugins.push(configResolverPlugin());

    // vite-plugin-html
    vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));

    //unocss
    vitePlugins.push(configUnocssPlugin());

    // rollup-plugin-visualizer
    vitePlugins.push(configVisualizerConfig(viteEnv));

    // vite-plugin-mock
    vitePlugins.push(configMockPlugin(isBuild));

    return vitePlugins;
}

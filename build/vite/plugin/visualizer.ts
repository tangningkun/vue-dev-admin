/**
 * rollup打包分析插件
 * https://github.com/btd/rollup-plugin-visualizer
 */
import { visualizer } from 'rollup-plugin-visualizer';
import { PluginOption } from 'vite';
import { isReportMode } from '../../utils';

export function configVisualizerConfig(env: ViteEnv) {
    const { VITE_BUILD_COMPRESS } = env;

    const plugins: PluginOption[] = [];
    if (isReportMode()) {
        const compressList = VITE_BUILD_COMPRESS.split(',');
        plugins.push(
            visualizer({
                filename: './node_modules/.cache/visualizer/stats.html', //分析图生成的文件名
                open: true, //如果存在本地服务端口，将在打包后自动展示\
                gzipSize: compressList.includes('gzip'),
                brotliSize: compressList.includes('brotli')
            })
        );
    }
    return plugins;
}

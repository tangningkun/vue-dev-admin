/* eslint-disable no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ConfigEnv, loadEnv, UserConfig } from 'vite';
import { wrapperEnv, pathResolve } from './build/utils';
import { createVitePlugins } from './build/vite/plugin';
import { createProxy } from './build/vite/proxy';
import pkg from './package.json';
import dayjs from 'dayjs';
import { OUTPUT_DIR } from './build/constant';

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
    pkg: { dependencies, devDependencies, name, version },
    lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
};

export default ({ command, mode, ssrBuild }: ConfigEnv): UserConfig => {
    console.log('command==>', command);
    console.log('mode==>', mode);
    console.log('ssrBuild==>', ssrBuild);
    const root = process.cwd(); //根目录
    const env = loadEnv(mode, root); // loadEnv读取的布尔类型是一个字符串。此函数可以转换为布尔类型
    const viteEnv = wrapperEnv(env);
    const isBuild = command === 'build';
    //端口号|公共路径|代理
    const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv;

    return {
        /**
         * 在开发或生产中使用的基础公共路径
         * Base public path when served in development or production.
         * @default '/'
         */
        base: VITE_PUBLIC_PATH,
        /**
         * Project root directory. Can be an absolute path, or a path relative from
         * the location of the config file itself.
         * 项目根目录。可以是绝对路径，还是相对路径
         * 配置文件本身的位置。
         * @default process.cwd()
         */
        root,
        /**
         * Array of vite plugins to use.
         * vite插件数组。
         */
        plugins: createVitePlugins(viteEnv, isBuild),
        /**
         * Configure resolver
         * 配置解析器
         */
        resolve: {
            alias: [
                // /@/xxxx => src/xxxx
                {
                    find: /\/@\//,
                    replacement: pathResolve('src') + '/'
                },
                // /#/xxxx => types/xxxx
                {
                    find: /\/#\//,
                    replacement: pathResolve('types') + '/'
                },
                {
                    find: 'devextreme/ui',
                    replacement: 'devextreme/esm/ui'
                }
            ]
        },
        server: {
            https: false,
            // 默认为'127.0.0.1'，如果将此设置为 `0.0.0.0` 或者 `true` 将监听所有地址，包括局域网和公网地址
            host: true,
            //项目端口号
            port: VITE_PORT,
            /**自动打开浏览器页面 */
            open: true,
            // 从.env加载代理配置
            proxy: createProxy(VITE_PROXY)
        },
        /**
         * 转换选项传递给esbuild。
         * 或设置为' false '禁用esbuild。
         */
        esbuild: {
            drop: VITE_DROP_CONSOLE ? ['console', 'debugger'] : []
        },
        build: {
            target: 'es2015',
            cssTarget: 'chrome80',
            outDir: OUTPUT_DIR,
            // minify: 'terser',
            /**
             * 当 minify=“minify:'terser'” 解开注释
             * Uncomment when minify="minify:'terser'"
             */
            // terserOptions: {
            //   compress: {
            //     keep_infinity: true,
            //     drop_console: VITE_DROP_CONSOLE,
            //   },
            // },
            // Turning off brotliSize display can slightly reduce packaging time
            reportCompressedSize: false,
            chunkSizeWarningLimit: 2000
        },
        define: {
            __APP_INFO__: JSON.stringify(__APP_INFO__)
        },
        css: {
            preprocessorOptions: {
                //define global scss variable
                scss: {
                    javascriptEnabled: true,
                    additionalData: `@import '/@/styles/variables.scss';`
                }
            }
        }
    };
};

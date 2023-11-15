import type { PluginOption } from 'vite';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';

export function configResolverPlugin() {
    const plugins: PluginOption[] = [];
    plugins.push(
        // 按需引入NaiveUi且自动创建组件声明
        Components({
            dts: true,
            resolvers: [NaiveUiResolver()],
        })
    );
    return plugins;
}

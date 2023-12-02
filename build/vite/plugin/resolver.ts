import type { PluginOption } from 'vite';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

export function configResolverPlugin() {
    const plugins: PluginOption[] = [];
    plugins.push(
        // 按需引入ant-design-vue且自动创建组件声明
        Components({
            dts: true,
            resolvers: [AntDesignVueResolver({ importStyle: false })],
        })
    );
    return plugins;
}

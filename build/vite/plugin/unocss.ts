import type { PluginOption } from 'vite';
import { presetUno, presetAttributify, presetIcons } from 'unocss';
import Unocss from 'unocss/vite';

export function configUnocssPlugin() {
    const plugins: PluginOption[] = [];
    plugins.push(
        Unocss({
            presets: [presetUno(), presetAttributify(), presetIcons()],
        })
    );
    return plugins;
}

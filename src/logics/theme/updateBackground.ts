import { colorIsDark, lighten, darken } from '/@/utils/color';
import { useAppStore } from '/@/store/modules/app';
import { ThemeEnum } from '/@/enums/appEnum';
import { setCssVar } from './util';
import { generateAntColors, primaryColor } from '../../../build/config/themeConfig';

const THEME_PRIMARY_COLOR_VAR = '--theme-primary-color';

const HEADER_BG_COLOR_VAR = '--header-bg-color';
const HEADER_BG_HOVER_COLOR_VAR = '--header-bg-hover-color';
const HEADER_MENU_ACTIVE_BG_COLOR_VAR = '--header-active-menu-bg-color';

const SIDER_DARK_BG_COLOR = '--sider-dark-bg-color';
const SIDER_DARK_DARKEN_BG_COLOR = '--sider-dark-darken-bg-color';
const SIDER_LIGHTEN_BG_COLOR = '--sider-dark-lighten-bg-color';

/**
 * 更改顶部Header的背景色
 * @param color
 */
export function updateThemePrimaryColor(color?: string) {
    const appStore = useAppStore();
    const darkMode = appStore.getDarkMode === ThemeEnum.DARK;
    if (!color) {
        if (darkMode) {
            const palettes = generateAntColors(primaryColor);
            const primary = palettes[5];
            color = primary;
        } else {
            color = appStore.getProjectConfig.themeColor;
        }
    }
    // 背景颜色
    setCssVar(THEME_PRIMARY_COLOR_VAR, color);

    appStore.setProjectConfig({
        themeColor: color,
    });
}

/**
 * 更改顶部Header的背景色
 * @param color
 */
export function updateHeaderBgColor(color?: string) {
    const appStore = useAppStore();
    const darkMode = appStore.getDarkMode === ThemeEnum.DARK;
    if (!color) {
        if (darkMode) {
            color = '#151515';
        } else {
            color = appStore.getHeaderSetting.bgColor;
        }
    }
    // 背景颜色
    setCssVar(HEADER_BG_COLOR_VAR, color);

    // 悬停颜色
    const hoverColor = lighten(color!, 6);
    setCssVar(HEADER_BG_HOVER_COLOR_VAR, hoverColor);
    setCssVar(HEADER_MENU_ACTIVE_BG_COLOR_VAR, hoverColor);

    // 确定颜色值的深度并自动切换主题
    const isDark = colorIsDark(color!);

    appStore.setProjectConfig({
        headerSetting: {
            theme: isDark || darkMode ? ThemeEnum.DARK : ThemeEnum.LIGHT,
        },
    });
}

/**
 * 更改左侧Menu的背景色
 * @param color  bg color
 */
export function updateSidebarBgColor(color?: string) {
    const appStore = useAppStore();

    // if (!isHexColor(color)) return;
    const darkMode = appStore.getDarkMode === ThemeEnum.DARK;
    if (!color) {
        if (darkMode) {
            color = '#212121';
        } else {
            color = appStore.getMenuSetting.bgColor;
        }
    }
    setCssVar(SIDER_DARK_BG_COLOR, color);
    setCssVar(SIDER_DARK_DARKEN_BG_COLOR, darken(color!, 6));
    setCssVar(SIDER_LIGHTEN_BG_COLOR, lighten(color!, 5));

    //只有#ffffff是浅色
    //只有当背景色为#fff时，菜单的主题才会更改为浅色
    const isLight = ['#fff', '#ffffff'].includes(color!.toLowerCase());

    appStore.setProjectConfig({
        menuSetting: {
            theme: isLight && !darkMode ? ThemeEnum.LIGHT : ThemeEnum.DARK,
        },
    });
}

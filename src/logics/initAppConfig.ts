/**
 * 应用配置
 */
import type { ProjectConfig } from '/#/config';

import { PROJ_CFG_KEY } from '/@/enums/cacheEnum';
import projectSetting from '/@/settings/projectSetting';

import { updateHeaderBgColor, updateSidebarBgColor, updateThemePrimaryColor } from '/@/logics/theme/updateBackground';
import { updateColorWeak } from '/@/logics/theme/updateColorWeak';
import { updateGrayMode } from '/@/logics/theme/updateGrayMode';
import { updateDarkTheme } from '/@/logics/theme/dark';

import { useAppStore } from '/@/store/modules/app';

import { useLocaleStore } from '/@/store/modules/locale';

import { getCommonStoragePrefix, getStorageShortName } from '/@/utils/env';

import { primaryColor } from '../../build/config/themeConfig';

import { Persistent } from '/@/utils/cache/persistent';
import { deepMerge } from '/@/utils';
import { ThemeEnum } from '/@/enums/appEnum';

/**
 * 初始项目配置
 */
export async function initAppConfigStore() {
    debugger;
    const localeStore = useLocaleStore();
    const appStore = useAppStore();
    let projCfg: ProjectConfig = Persistent.getLocal(PROJ_CFG_KEY) as ProjectConfig;
    projCfg = deepMerge(projectSetting, projCfg || {});
    const darkMode = appStore.getDarkMode;
    const {
        colorWeak,
        grayMode,
        themeColor,

        headerSetting: { bgColor: headerBgColor } = {},
        menuSetting: { bgColor } = {},
    } = projCfg;
    try {
        if (themeColor && themeColor !== primaryColor) {
            updateThemePrimaryColor(themeColor);
        } else {
            updateThemePrimaryColor(primaryColor);
        }

        grayMode && updateGrayMode(grayMode);
        colorWeak && updateColorWeak(colorWeak);
    } catch (error) {}
    appStore.setProjectConfig(projCfg);

    // if (appStore.getProjectConfig.algorithm.length === 0) {
    //     appStore.setProjectConfig({
    //         algorithm: [theme.defaultAlgorithm, theme.compactAlgorithm],
    //     });
    // }
    // init dark mode
    await updateDarkTheme(darkMode);
    if (darkMode === ThemeEnum.DARK) {
        updateHeaderBgColor();
        updateSidebarBgColor();
    } else {
        headerBgColor && updateHeaderBgColor(headerBgColor);
        bgColor && updateSidebarBgColor(bgColor);
    }

    //TODO:初始化语言存储
    localeStore.initLocale();

    setTimeout(() => {
        clearObsoleteStorage();
    }, 16);
}

/**
 *随着版本的不断迭代，localStorage中存储的缓存密钥将越来越多。
 *此方法用于删除无用的密钥
 */
export function clearObsoleteStorage() {
    const commonPrefix = getCommonStoragePrefix();
    const shortPrefix = getStorageShortName();

    [localStorage, sessionStorage].forEach((item: Storage) => {
        Object.keys(item).forEach((key) => {
            if (key && key.startsWith(commonPrefix) && !key.startsWith(shortPrefix)) {
                item.removeItem(key);
            }
        });
    });
}

import type { MenuSetting } from '/#/config';

import { computed, unref, ref } from 'vue';

import { useAppStore } from '/@/store/modules/app';

import { SIDE_BAR_MINI_WIDTH, SIDE_BAR_SHOW_TITLE_MINI_WIDTH } from '/@/enums/appEnum';
import { MenuModeEnum, MenuTypeEnum, TriggerEnum } from '/@/enums/menuEnum';
import { useFullContent } from '/@/hooks/web/useFullContent';

const mixSideHasChildren = ref(false);

export function useMenuSetting() {
    const { getFullContent: fullContent } = useFullContent();
    const appStore = useAppStore();

    const getShowSidebar = computed(() => {
        return unref(getSplit) || (unref(getShowMenu) && unref(getMenuMode) !== MenuModeEnum.HORIZONTAL && !unref(fullContent));
    });

    const getCollapsed = computed(() => appStore.getMenuSetting.collapsed);
    /**
     * 菜单类型
     */
    const getMenuType = computed(() => appStore.getMenuSetting.type);
    /**
     * 菜单模式
     */
    const getMenuMode = computed(() => appStore.getMenuSetting.mode);
    /**
     * 菜单是否固定
     */
    const getMenuFixed = computed(() => appStore.getMenuSetting.fixed);
    /**
     * 菜单是否显示
     */
    const getShowMenu = computed(() => appStore.getMenuSetting.show);
    /**
     * 菜单是否隐藏
     */
    const getMenuHidden = computed(() => appStore.getMenuSetting.hidden);
    /**
     * 菜单宽度
     */
    const getMenuWidth = computed(() => appStore.getMenuSetting.menuWidth);
    /**
     * 折叠触发器位置
     */
    const getTrigger = computed(() => appStore.getMenuSetting.trigger);

    /**
     * 菜单主题枚举
     */
    const getMenuTheme = computed(() => appStore.getMenuSetting.theme);
    /**
     * 是否分离
     */
    const getSplit = computed(() => appStore.getMenuSetting.split);

    const getMenuBgColor = computed(() => appStore.getMenuSetting.bgColor);

    const getMixSideTrigger = computed(() => appStore.getMenuSetting.mixSideTrigger);

    const getCanDrag = computed(() => appStore.getMenuSetting.canDrag);

    const getAccordion = computed(() => appStore.getMenuSetting.accordion);

    const getMixSideFixed = computed(() => appStore.getMenuSetting.mixSideFixed);

    const getTopMenuAlign = computed(() => appStore.getMenuSetting.topMenuAlign);

    const getCloseMixSidebarOnChange = computed(() => appStore.getMenuSetting.closeMixSidebarOnChange);

    const getIsSidebarType = computed(() => unref(getMenuType) === MenuTypeEnum.SIDEBAR);

    const getIsTopMenu = computed(() => unref(getMenuType) === MenuTypeEnum.TOP_MENU);

    const getCollapsedShowTitle = computed(() => appStore.getMenuSetting.collapsedShowTitle);

    const getShowTopMenu = computed(() => {
        return unref(getMenuMode) === MenuModeEnum.HORIZONTAL || unref(getSplit);
    });

    const getShowHeaderTrigger = computed(() => {
        if (unref(getMenuType) === MenuTypeEnum.TOP_MENU || !unref(getShowMenu) || unref(getMenuHidden)) {
            return false;
        }

        return unref(getTrigger) === TriggerEnum.HEADER;
    });

    const getIsHorizontal = computed(() => {
        return unref(getMenuMode) === MenuModeEnum.HORIZONTAL;
    });

    const getIsMixSidebar = computed(() => {
        return unref(getMenuType) === MenuTypeEnum.MIX_SIDEBAR;
    });

    const getIsMixMode = computed(() => {
        return unref(getMenuMode) === MenuModeEnum.INLINE && unref(getMenuType) === MenuTypeEnum.MIX;
    });

    const getRealWidth = computed(() => {
        if (unref(getIsMixSidebar)) {
            return unref(getCollapsed) && !unref(getMixSideFixed) ? unref(getMinWidthValue) : unref(getMenuWidth);
        }
        return unref(getCollapsed) ? unref(getMinWidthValue) : unref(getMenuWidth);
    });
    //获取最小宽度
    const getMinWidthValue = computed(() => {
        const { collapsedShowTitle } = appStore.getMenuSetting;
        return collapsedShowTitle ? SIDE_BAR_SHOW_TITLE_MINI_WIDTH : SIDE_BAR_MINI_WIDTH;
    });
    //获取计算内容宽度
    const getCalcContentWidth = computed(() => {
        const width =
            unref(getIsTopMenu) || !unref(getShowMenu) || (unref(getSplit) && unref(getMenuHidden))
                ? 0
                : unref(getIsMixSidebar)
                ? (unref(getCollapsed) ? SIDE_BAR_MINI_WIDTH : SIDE_BAR_SHOW_TITLE_MINI_WIDTH) + (unref(getMixSideFixed) && unref(mixSideHasChildren) ? unref(getRealWidth) : 0)
                : unref(getRealWidth);

        return `calc(100% - ${unref(width)}px)`;
    });

    // 设置菜单配置
    function setMenuSetting(menuSetting: Partial<MenuSetting>): void {
        appStore.setProjectConfig({ menuSetting });
    }

    function toggleCollapsed() {
        setMenuSetting({
            collapsed: !unref(getCollapsed),
        });
    }

    return {
        /**  设置菜单配置 */
        setMenuSetting,
        toggleCollapsed,
        getMenuFixed,
        getRealWidth,
        getMenuType,
        getMenuMode,
        getShowMenu,
        getCollapsed,
        getMinWidthValue,
        getCalcContentWidth,
        getMenuWidth,
        getTrigger,
        getSplit,
        getMenuTheme,
        getCanDrag,
        getCollapsedShowTitle,
        getIsHorizontal,
        getIsSidebarType,
        getAccordion,
        getShowTopMenu,
        getShowHeaderTrigger,
        getTopMenuAlign,
        getMenuHidden,
        getIsTopMenu,
        getMenuBgColor,
        getShowSidebar,
        getIsMixMode,
        getIsMixSidebar,
        getCloseMixSidebarOnChange,
        getMixSideTrigger,
        getMixSideFixed,
        mixSideHasChildren,
    };
}

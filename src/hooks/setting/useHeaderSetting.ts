import type { HeaderSetting } from '/#/config';
import { computed, unref } from 'vue';
import { useAppStore } from '/@/store/modules/app';
import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
import { useRootSetting } from '/@/hooks/setting/useRootSetting';
import { useFullContent } from '/@/hooks/web/useFullContent';
import { MenuModeEnum } from '/@/enums/menuEnum';

/**
 * @description setHeaderSetting 页眉配置
 * @description getShowDoc 显示文件按钮
 * @description getShowSearch 显示搜索
 * @description getHeaderTheme 主题
 * @description getUseLockPage 是否显示锁屏
 * @description getShowFullScreen 是否全屏
 * @description getShowNotice 显示消息中心按钮
 * @description getShowBread 显示显示面包屑
 * @description getShowContent 显示内容
 * @description getShowHeaderLogo 获取显示页眉Logo
 * @description getShowHeader 是否显示
 * @description getFixed 是否固定
 * @description getShowMixHeaderRef 获取显示混合页眉
 * @description getShowFullHeaderRef
 * @description getShowInsetHeaderRef 显示插入页眉
 * @description getUnFixedAndFull
 * @description getHeaderBgColor 背景颜色
 * @returns
 */
export function useHeaderSetting() {
    const { getFullContent } = useFullContent();
    const appStore = useAppStore();

    const getShowFullHeaderRef = computed(() => {
        return !unref(getFullContent) && unref(getShowMixHeaderRef) && unref(getShowHeader) && !unref(getIsTopMenu) && !unref(getIsMixSidebar);
    });

    const getUnFixedAndFull = computed(() => !unref(getFixed) && !unref(getShowFullHeaderRef));
    //显示插入页眉
    const getShowInsetHeaderRef = computed(() => {
        const need = !unref(getFullContent) && unref(getShowHeader);
        return (need && !unref(getShowMixHeaderRef)) || (need && unref(getIsTopMenu)) || (need && unref(getIsMixSidebar));
    });

    const { getMenuMode, getSplit, getShowHeaderTrigger, getIsSidebarType, getIsMixSidebar, getIsTopMenu } = useMenuSetting();
    const { getShowBreadCrumb, getShowLogo } = useRootSetting();
    //获取显示混合页眉
    const getShowMixHeaderRef = computed(() => !unref(getIsSidebarType) && unref(getShowHeader));
    //显示文件按钮
    const getShowDoc = computed(() => appStore.getHeaderSetting.showDoc);
    //主题
    const getHeaderTheme = computed(() => appStore.getHeaderSetting.theme);
    //是否显示
    const getShowHeader = computed(() => appStore.getHeaderSetting.show);
    //是否固定
    const getFixed = computed(() => appStore.getHeaderSetting.fixed);
    //背景颜色
    const getHeaderBgColor = computed(() => appStore.getHeaderSetting.bgColor);
    //显示搜索
    const getShowSearch = computed(() => appStore.getHeaderSetting.showSearch);
    //是否显示锁屏
    const getUseLockPage = computed(() => appStore.getHeaderSetting.useLockPage);
    //是否全屏
    const getShowFullScreen = computed(() => appStore.getHeaderSetting.showFullScreen);
    //显示消息中心按钮
    const getShowNotice = computed(() => appStore.getHeaderSetting.showNotice);
    //显示显示面包屑
    const getShowBread = computed(() => {
        return unref(getMenuMode) !== MenuModeEnum.HORIZONTAL && unref(getShowBreadCrumb) && !unref(getSplit);
    });
    //获取显示页眉徽标
    const getShowHeaderLogo = computed(() => {
        return unref(getShowLogo) && !unref(getIsSidebarType) && !unref(getIsMixSidebar);
    });
    //显示内容
    const getShowContent = computed(() => {
        return unref(getShowBread) || unref(getShowHeaderTrigger);
    });

    //页眉配置
    function setHeaderSetting(headerSetting: Partial<HeaderSetting>) {
        appStore.setProjectConfig({ headerSetting });
    }
    return {
        /**页眉配置 */
        setHeaderSetting,
        /**显示文件按钮 */
        getShowDoc,
        /**显示搜索 */
        getShowSearch,
        /**主题 */
        getHeaderTheme,
        /**是否显示锁屏 */
        getUseLockPage,
        /**是否全屏 */
        getShowFullScreen,
        /**显示消息中心按钮 */
        getShowNotice,
        /**显示显示面包屑 */
        getShowBread,
        /**显示内容 */
        getShowContent,
        /**获取显示页眉Logo */
        getShowHeaderLogo,
        /**是否显示页眉 */
        getShowHeader,
        /**是否固定 */
        getFixed,
        /**获取显示混合页眉 */
        getShowMixHeaderRef,
        /** */
        getShowFullHeaderRef,
        /**显示插入页眉 */
        getShowInsetHeaderRef,
        /** */
        getUnFixedAndFull,
        /**背景颜色 */
        getHeaderBgColor,
    };
}

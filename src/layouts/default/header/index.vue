<template>
    <a-layout-header :class="getHeaderClass">
        <!-- left start -->
        <div :class="`${prefixCls}-left`">
            <!-- logo -->
            <app-logo v-if="getShowHeaderLogo || getIsMobile" :class="`${prefixCls}-logo`" :theme="getHeaderTheme" :style="getLogoWidth" />
            <layout-trigger v-if="(getShowContent && getShowHeaderTrigger && !getSplit && !getIsMixSidebar) || getIsMobile" :theme="getHeaderTheme" :sider="false" />
            <LayoutBreadcrumb v-if="getShowContent && getShowBread" :theme="getHeaderTheme" />
        </div>
        <!-- left end -->

        <!-- menu start -->
        <div v-if="getShowTopMenu && !getIsMobile" :class="`${prefixCls}-menu`">
            <LayoutMenu :is-horizontal="true" :theme="getHeaderTheme" :split-type="getSplitType" :menu-mode="getMenuMode" />
        </div>
        <!-- menu-end -->
        <!-- action-start  -->
        <div :class="`${prefixCls}-action`">
            <!-- <AppSearch v-if="getShowSearch" :class="`${prefixCls}-action__item `" /> -->

            <ErrorAction v-if="getUseErrorHandle" :class="`${prefixCls}-action__item error-action`" />

            <Notify v-if="getShowNotice" :class="`${prefixCls}-action__item notify-item`" />

            <FullScreen v-if="getShowFullScreen" :class="`${prefixCls}-action__item fullscreen-item`" />

            <AppLocalePicker v-if="getShowLocalePicker" :reload="true" :show-text="false" :class="`${prefixCls}-action__item`" />

            <UserDropDown :theme="getHeaderTheme" />

            <SettingDrawer v-if="getShowSetting" :class="`${prefixCls}-action__item`" />
        </div>
        <!-- action-end  -->
    </a-layout-header>
</template>

<script lang="ts" setup name="LayoutHeader">
    import { unref, computed } from 'vue';
    import { propTypes } from '/@/utils/propTypes';
    import { AppLogo, AppLocalePicker } from '/@/components/Application';
    import LayoutMenu from '../menu/index.vue';
    import LayoutTrigger from '../trigger/index.vue';
    import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting';
    import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
    import { useRootSetting } from '/@/hooks/setting/useRootSetting';
    import { MenuModeEnum, MenuSplitTypeEnum } from '/@/enums/menuEnum';
    import { SettingButtonPositionEnum } from '/@/enums/appEnum';
    import { Notify, FullScreen, UserDropDown, LayoutBreadcrumb, ErrorAction } from './components';
    import { useAppInject } from '/@/hooks/web/useAppInject';
    import { useDesign } from '/@/hooks/web/useDesign';
    import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent';
    import { useLocale } from '/@/locales/useLocale';

    const props = defineProps({
        fixed: propTypes.bool,
    });
    const SettingDrawer = createAsyncComponent(() => import('/@/layouts/default/setting/index.vue'), {
        loading: true,
    });

    const { prefixCls } = useDesign('layout-header');
    const { getShowTopMenu, getShowHeaderTrigger, getSplit, getIsMixMode, getMenuWidth, getIsMixSidebar } = useMenuSetting();
    const { getUseErrorHandle, getShowSettingButton, getSettingButtonPosition } = useRootSetting();
    const { getHeaderTheme, getShowFullScreen, getShowNotice, getShowContent, getShowBread, getShowHeaderLogo, getShowHeader } = useHeaderSetting(); //getShowSearch
    const { getIsMobile } = useAppInject();
    const { getShowLocalePicker } = useLocale();

    const getHeaderClass = computed(() => {
        const theme = unref(getHeaderTheme);
        return [
            prefixCls,
            {
                [`${prefixCls}--fixed`]: props.fixed,
                [`${prefixCls}--mobile`]: unref(getIsMobile),
                [`${prefixCls}--${theme}`]: theme,
            },
        ];
    });

    const getShowSetting = computed(() => {
        if (!unref(getShowSettingButton)) {
            return false;
        }
        const settingButtonPosition = unref(getSettingButtonPosition);

        if (settingButtonPosition === SettingButtonPositionEnum.AUTO) {
            return unref(getShowHeader);
        }
        return settingButtonPosition === SettingButtonPositionEnum.HEADER;
    });

    const getLogoWidth = computed(() => {
        if (!unref(getIsMixMode) || unref(getIsMobile)) {
            return {};
        }
        const width = unref(getMenuWidth) < 180 ? 180 : unref(getMenuWidth);
        return { width: `${width}px` };
    });

    const getSplitType = computed(() => {
        return unref(getSplit) ? MenuSplitTypeEnum.TOP : MenuSplitTypeEnum.NONE;
    });

    const getMenuMode = computed(() => {
        return unref(getSplit) ? MenuModeEnum.HORIZONTAL : null;
    });
</script>
<style lang="less">
    @header-trigger-prefix-cls: ~'@{namespace}-layout-header-trigger';
    @header-prefix-cls: ~'@{namespace}-layout-header';
    @breadcrumb-prefix-cls: ~'@{namespace}-layout-breadcrumb';
    @logo-prefix-cls: ~'@{namespace}-app-logo';

    .@{header-prefix-cls} {
        display: flex;
        height: @header-height !important;
        padding: 0 !important;
        margin-left: -1px;
        line-height: @header-height !important;
        color: @white;
        background-color: @white;
        align-items: center;
        justify-content: space-between;

        &--mobile {
            .@{breadcrumb-prefix-cls},
            .error-action,
            .notify-item,
            .fullscreen-item {
                display: none;
            }

            .@{logo-prefix-cls} {
                min-width: unset;
                padding-right: 0;

                &__title {
                    display: none;
                }
            }
            .@{header-trigger-prefix-cls} {
                padding: 0 4px 0 8px !important;
            }
            .@{header-prefix-cls}-action {
                padding-right: 4px;
            }
        }

        &--fixed {
            position: fixed;
            top: 0;
            left: 0;
            z-index: @layout-header-fixed-z-index;
            width: 100%;
        }

        &-logo {
            height: @header-height;
            min-width: 192px;
            padding: 0 10px;
            font-size: 14px;

            img {
                width: @logo-width;
                height: @logo-width;
                margin-right: 2px;
            }
        }

        &-left {
            display: flex;
            height: 100%;
            align-items: center;

            .@{header-trigger-prefix-cls} {
                display: flex;
                height: 100%;
                padding: 1px 10px 0;
                cursor: pointer;
                align-items: center;

                .anticon {
                    font-size: 16px;
                }

                &.light {
                    &:hover {
                        background-color: @header-light-bg-hover-color;
                    }

                    svg {
                        fill: #000;
                    }
                }

                &.dark {
                    &:hover {
                        background-color: @header-dark-bg-hover-color;
                    }
                }
            }
        }

        &-menu {
            height: 100%;
            min-width: 0;
            flex: 1;
            align-items: center;
        }

        &-action {
            display: flex;
            min-width: 180px;
            // padding-right: 12px;
            align-items: center;

            &__item {
                display: flex !important;
                height: @header-height;
                padding: 0 2px;
                font-size: 1.2em;
                cursor: pointer;
                align-items: center;

                .ant-badge {
                    height: @header-height;
                    line-height: @header-height;
                }

                .ant-badge-dot {
                    top: 10px;
                    right: 2px;
                }
            }

            span[role='img'] {
                padding: 0 8px;
            }
        }

        &--light {
            background-color: @white !important;
            border-bottom: 1px solid @header-light-bottom-border-color;
            border-left: 1px solid @header-light-bottom-border-color;

            .@{header-prefix-cls}-logo {
                color: @colorText;

                &:hover {
                    background-color: @header-light-bg-hover-color;
                }
            }

            .@{header-prefix-cls}-action {
                &__item {
                    color: @colorText;

                    .app-iconify {
                        padding: 0 10px;
                        font-size: 16px !important;
                    }

                    &:hover {
                        background-color: @header-light-bg-hover-color;
                    }
                }

                &-icon,
                span[role='img'] {
                    color: @colorText;
                }
            }
        }

        &--dark {
            background-color: @header-dark-bg-color !important;
            // border-bottom: 1px solid @colorBorderSecondary;
            border-left: 1px solid @colorBorderSecondary;
            .@{header-prefix-cls}-logo {
                &:hover {
                    background-color: @header-dark-bg-hover-color;
                }
            }

            .@{header-prefix-cls}-action {
                &__item {
                    .app-iconify {
                        padding: 0 10px;
                        font-size: 16px !important;
                    }

                    .ant-badge {
                        span {
                            color: @white;
                        }
                    }

                    &:hover {
                        background-color: @header-dark-bg-hover-color;
                    }
                }
            }
        }
    }
</style>

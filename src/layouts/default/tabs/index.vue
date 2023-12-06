<template>
    <div :class="getWrapClass">
        <a-tabs type="editable-card" size="small" :animated="false" :hide-add="true" :tab-bar-gutter="3" :active-key="activeKeyRef" @change="handleChange" @edit="handleEdit">
            <template v-for="item in getTabsState" :key="item.query ? item.fullPath : item.path">
                <a-tab-pane :closable="!(item && item.meta && item.meta.affix)">
                    <template #tab>
                        <TabContent :tab-item="item" />
                    </template>
                </a-tab-pane>
            </template>

            <template v-if="getShowRedo || getShowQuick" #rightExtra>
                <TabRefresh v-if="getShowRedo" />
                <TabContent v-if="getShowQuick" is-extra :tab-item="router.currentRoute.value" />
                <FoldButton v-if="getShowFold" />
            </template>
        </a-tabs>
    </div>
</template>
<script lang="ts" setup name="MultipleTabs">
    import type { RouteLocationNormalized, RouteMeta } from 'vue-router';

    import { computed, unref, ref } from 'vue';

    import TabContent from './components/TabContent.vue';
    import FoldButton from './components/FoldButton.vue';
    import TabRefresh from './components/TabRefresh.vue';

    import { useGo } from '/@/hooks/web/usePage';

    import { useMultipleTabStore } from '/@/store/modules/multipleTab';
    import { useUserStore } from '/@/store/modules/user';

    import { initAffixTabs, useTabsDrag } from './useMultipleTabs';
    import { useDesign } from '/@/hooks/web/useDesign';
    import { useMultipleTabSetting } from '/@/hooks/setting/useMultipleTabSetting';

    import { REDIRECT_NAME } from '/@/router/constant';
    import { listenerRouteChange } from '/@/logics/mitt/routeChange';

    import { useRouter } from 'vue-router';

    const affixTextList = initAffixTabs();
    const activeKeyRef = ref('');

    useTabsDrag(affixTextList);

    const tabStore = useMultipleTabStore();
    const userStore = useUserStore();
    const router = useRouter();

    const { prefixCls } = useDesign('multiple-tabs');
    const go = useGo();
    const { getShowQuick, getShowRedo, getShowFold } = useMultipleTabSetting();

    const getTabsState = computed(() => {
        return tabStore.getTabList.filter((item) => !item.meta?.hideTab);
    });

    const unClose = computed(() => unref(getTabsState).length === 1);

    const getWrapClass = computed(() => {
        return [
            prefixCls,
            {
                [`${prefixCls}--hide-close`]: unref(unClose),
            },
        ];
    });

    listenerRouteChange((route) => {
        const { name } = route;
        if (name === REDIRECT_NAME || !route || !userStore.getToken) {
            return;
        }

        const { path, fullPath, meta = {} } = route;
        const { currentActiveMenu, hideTab } = meta as RouteMeta;
        const isHide = !hideTab ? null : currentActiveMenu;
        const p = isHide || fullPath || path;
        if (activeKeyRef.value !== p) {
            activeKeyRef.value = p as string;
        }

        if (isHide) {
            const findParentRoute = router.getRoutes().find((item) => item.path === currentActiveMenu);

            findParentRoute && tabStore.addTab(findParentRoute as unknown as RouteLocationNormalized);
        } else {
            tabStore.addTab(unref(route));
        }
    });

    function handleChange(activeKey: any) {
        activeKeyRef.value = activeKey;
        go(activeKey, false);
    }

    // Close the current tab
    function handleEdit(targetKey: string) {
        // Added operation to hide, currently only use delete operation
        if (unref(unClose)) {
            return;
        }

        tabStore.closeTabByKey(targetKey, router);
    }
</script>
<style lang="less">
    @prefix-cls: ~'@{namespace}-multiple-tabs';

    // html[data-theme='dark'] {
    //     .@{prefix-cls} {
    //         .ant-tabs-tab {
    //             // border: 1px solid @colorBorderSecondary;
    //             border: 1px solid @colorBorderSecondary;
    //         }
    //     }
    // }

    // html[data-theme='light'] {
    //     .@{prefix-cls} {
    //         .ant-tabs-tab:not(.ant-tabs-tab-active) {
    //             border: 1px solid @colorBorderSecondary;
    //         }
    //     }
    // }

    .@{prefix-cls} {
        z-index: 10;
        height: @multiple-height + 2;
        line-height: @multiple-height + 2;
        background-color: @colorBgBase;
        border-bottom: 1px solid @colorBorderSecondary;

        .ant-tabs-small {
            height: @multiple-height;

            .ant-tabs-tab {
                padding-left: 16px !important;
                border-radius: 2px 2px 0 0 !important;
            }
        }

        .ant-tabs.ant-tabs-card {
            .ant-tabs-nav {
                padding-top: 2px;
                height: @multiple-height;
                margin: 0;
                background-color: @colorBgBase;
                border: 0;
                box-shadow: none;

                .ant-tabs-nav-container {
                    height: @multiple-height;
                    padding-top: 2px;
                }

                .ant-tabs-tab {
                    height: calc(@multiple-height - 2px);
                    padding-right: 12px;
                    line-height: calc(@multiple-height - 2px);
                    color: @colorText;
                    background-color: @colorBgBase;
                    transition: none;

                    &:hover {
                        .ant-tabs-tab-remove {
                            opacity: 1;
                        }
                    }

                    .ant-tabs-tab-remove {
                        width: 8px;
                        height: 28px;
                        font-size: 12px;
                        color: inherit;
                        opacity: 0;
                        transition: none;
                        margin-left: 2px;
                        margin-right: -4px;

                        &:hover {
                            svg {
                                width: 0.8em;
                            }
                        }
                    }

                    svg {
                        fill: @colorText;
                    }
                }

                .ant-tabs-tab:not(.ant-tabs-tab-active) {
                    &:hover {
                        color: @themePrimaryColor;
                    }
                }

                .ant-tabs-tab-active {
                    position: relative;
                    padding-left: 18px;
                    background-color: @themePrimaryColor !important;
                    border: 0;
                    transition: none;

                    span {
                        color: @white !important;
                    }

                    .ant-tabs-tab-remove {
                        opacity: 1;
                    }

                    svg {
                        width: 0.7em;
                        fill: @white;
                    }
                }
            }

            .ant-tabs-nav > div:nth-child(1) {
                padding: 0 6px;

                .ant-tabs-tab {
                    margin-right: 3px !important;
                }
            }
        }

        .ant-tabs-tab:not(.ant-tabs-tab-active) {
            .anticon-close {
                font-size: 12px;

                svg {
                    width: 0.6em;
                }
            }
        }

        .ant-dropdown-trigger {
            display: inline-flex;
        }

        &--hide-close {
            .ant-tabs-tab-remove {
                opacity: 0 !important;
            }
        }

        &-content {
            &__extra-quick,
            &__extra-redo,
            &__extra-fold {
                display: inline-block;
                width: 36px;
                height: @multiple-height;
                line-height: @multiple-height;
                color: @colorTextSecondary;
                text-align: center;
                cursor: pointer;
                border-left: 1px solid @colorBorderSecondary;

                &:hover {
                    color: @colorText;
                }

                span[role='img'] {
                    transform: rotate(90deg);
                }
            }

            &__extra-redo {
                span[role='img'] {
                    transform: rotate(0deg);
                }
            }

            &__info {
                display: inline-block;
                width: 100%;
                height: @multiple-height - 2;
                padding-left: 0;
                margin-left: -10px;
                font-size: 12px;
                cursor: pointer;
                user-select: none;
            }
        }
    }

    .ant-tabs-dropdown-menu {
        &-title-content {
            display: flex;
            align-items: center;

            .@{prefix-cls} {
                &-content__info {
                    width: auto;
                    margin-left: 0;
                    line-height: 28px;
                }
            }
        }

        &-item-remove {
            margin-left: auto;
        }
    }

    .multiple-tabs__dropdown {
        min-width: 136px !important;
    }
</style>

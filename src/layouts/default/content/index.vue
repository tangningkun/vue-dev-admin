<template>
    <div v-loading="getOpenPageLoading && getPageLoading" :class="[prefixCls, getLayoutContentMode]">
        <PageLayout />
    </div>
</template>
<script lang="ts" name="LayoutContent" setup>
    import PageLayout from '/@/layouts/page/index.vue';
    import { useDesign } from '/@/hooks/web/useDesign';
    import { useRootSetting } from '/@/hooks/setting/useRootSetting';
    import { useTransitionSetting } from '/@/hooks/setting/useTransitionSetting';
    import { useContentViewHeight } from './useContentViewHeight';

    const { prefixCls } = useDesign('layout-content');
    const { getOpenPageLoading } = useTransitionSetting();
    const { getLayoutContentMode, getPageLoading } = useRootSetting();
    useContentViewHeight();
</script>
<style lang="less">
    @prefix-cls: ~'@{namespace}-layout-content';

    .@{prefix-cls} {
        position: relative;
        flex: 1 1 auto;
        min-height: 0;

        &.fixed {
            width: 1200px;
            margin: 0 auto;
        }

        &-loading {
            position: absolute;
            top: 200px;
            z-index: @page-loading-z-index;
        }

        .ant-tabs-nav-list {
            .ant-tabs-tab {
                width: 4rem;
                border-radius: 2px 2px 0 0;

                .ant-tabs-tab-btn {
                    text-align: center;
                    width: 100%;
                    font-size: 13px;
                }
            }
        }
    }
</style>

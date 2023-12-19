<template>
    <div v-if="getIsShowPlaceholderDom" :style="getPlaceholderDomStyle"></div>
    <div :style="getWrapStyle" :class="getClass">
        <LayoutHeader v-if="getShowInsetHeaderRef" />
        <MultipleTabs v-if="getShowTabs" />
    </div>
</template>
<script lang="ts" name="MultipleHeader" setup>
    import { useDesign } from '/@/hooks/web/useDesign';
    import LayoutHeader from './index.vue';
    import MultipleTabs from '../tabs/index.vue';
    import { unref, computed, CSSProperties } from 'vue';
    import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
    import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting';
    import { useMultipleTabSetting } from '/@/hooks/setting/useMultipleTabSetting';
    import { useFullContent } from '/@/hooks/web/useFullContent';
    import { useAppInject } from '/@/hooks/web/useAppInject';
    import { useLayoutHeight } from '../content/useContentViewHeight';

    const HEADER_HEIGHT = 48; //头部高度
    const TABS_HEIGHT = 32; //标签高度

    const { prefixCls } = useDesign('layout-multiple-header');

    const { setHeaderHeight } = useLayoutHeight();

    const { getCalcContentWidth, getSplit } = useMenuSetting();

    const { getIsMobile } = useAppInject(); //是否手机端

    const { getFixed, getShowInsetHeaderRef, getShowFullHeaderRef, getHeaderTheme, getShowHeader } = useHeaderSetting();

    const { getFullContent } = useFullContent();

    const { getShowMultipleTab } = useMultipleTabSetting();

    const getShowTabs = computed(() => {
        return unref(getShowMultipleTab) && !unref(getFullContent);
    });

    const getIsShowPlaceholderDom = computed(() => {
        return unref(getFixed) || unref(getShowFullHeaderRef);
    });

    const getWrapStyle = computed((): CSSProperties => {
        const style: CSSProperties = {};
        if (unref(getFixed)) {
            style.width = unref(getIsMobile) ? '100%' : unref(getCalcContentWidth);
        }
        if (unref(getShowFullHeaderRef)) {
            style.top = `${HEADER_HEIGHT}px`;
        }
        return style;
    });

    const getIsFixed = computed(() => {
        return unref(getFixed) || unref(getShowFullHeaderRef);
    });

    const getPlaceholderDomStyle = computed((): CSSProperties => {
        let height = 0;
        if ((unref(getShowFullHeaderRef) || !unref(getSplit)) && unref(getShowHeader) && !unref(getFullContent)) {
            height += HEADER_HEIGHT;
        }
        if (unref(getShowMultipleTab) && !unref(getFullContent)) {
            height += TABS_HEIGHT;
        }
        setHeaderHeight(height);
        return {
            height: `${height}px`,
            'min-height': `${height}px`,
        };
    });

    const getClass = computed(() => {
        return [prefixCls, `${prefixCls}--${unref(getHeaderTheme)}`, { [`${prefixCls}--fixed`]: unref(getIsFixed) }];
    });
</script>
<style lang="less" scoped>
    @prefix-cls: ~'@{namespace}-layout-multiple-header';

    .@{prefix-cls} {
        transition: width 0.2s;
        flex: 0 0 auto;

        &--dark {
            margin-left: -1px;
        }

        &--fixed {
            position: fixed;
            top: 0;
            z-index: @multiple-tab-fixed-z-index;
            width: 100%;
        }
    }
</style>

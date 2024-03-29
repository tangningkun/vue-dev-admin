<template>
    <div v-if="getMenuFixed && !getIsMobile" v-show="showClassSideBarRef" :style="getHiddenDomStyle"></div>
    <a-layout-sider
        v-show="showClassSideBarRef"
        ref="sideRef"
        breakpoint="lg"
        collapsible
        :class="getSiderClass"
        :width="getMenuWidth"
        :collapsed="getCollapsed"
        :collapsed-width="getCollapsedWidth"
        :theme="getMenuTheme"
        :trigger="getTrigger"
        v-bind="getTriggerAttr"
        @breakpoint="onBreakpointChange"
    >
        <template v-if="getShowTrigger" #trigger>
            <LayoutTrigger />
        </template>
        <LayoutMenu :theme="getMenuTheme" :menu-mode="getMode" :split-type="getSplitType" />
        <DragBar ref="dragBarRef" />
    </a-layout-sider>
</template>
<script lang="ts" setup name="LayoutSideBar">
    import { computed, ref, unref, CSSProperties, h } from 'vue';

    import LayoutMenu from '../menu/index.vue';
    import LayoutTrigger from '/@/layouts/default/trigger/index.vue';

    import { MenuModeEnum, MenuSplitTypeEnum } from '/@/enums/menuEnum';

    import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
    import { useTrigger, useDragLine, useSiderEvent } from './useLayoutSider';
    import { useAppInject } from '/@/hooks/web/useAppInject';
    import { useDesign } from '/@/hooks/web/useDesign';

    import DragBar from './DragBar.vue';

    const dragBarRef = ref<ElRef>(null);
    const sideRef = ref<ElRef>(null);

    // const { getCollapsed, getMenuWidth, getSplit, getMenuTheme, getRealWidth, getMenuHidden, getMenuFixed, getIsMixMode, toggleCollapsed } = useMenuSetting();
    const { getCollapsed, getMenuWidth, getSplit, getMenuTheme, getRealWidth, getMenuHidden, getMenuFixed, getIsMixMode } = useMenuSetting();
    const { prefixCls } = useDesign('layout-sideBar');

    const { getIsMobile } = useAppInject();

    const { getTriggerAttr, getShowTrigger } = useTrigger(getIsMobile);

    useDragLine(sideRef, dragBarRef);

    const { getCollapsedWidth, onBreakpointChange } = useSiderEvent();

    const getMode = computed(() => {
        return unref(getSplit) ? MenuModeEnum.INLINE : null;
    });

    const getSplitType = computed(() => {
        return unref(getSplit) ? MenuSplitTypeEnum.LEFT : MenuSplitTypeEnum.NONE;
    });

    const showClassSideBarRef = computed(() => {
        return unref(getSplit) ? !unref(getMenuHidden) : true;
    });

    const getSiderClass = computed(() => {
        return [
            prefixCls,
            {
                [`${prefixCls}--fixed`]: unref(getMenuFixed),
                [`${prefixCls}--mix`]: unref(getIsMixMode) && !unref(getIsMobile),
            },
        ];
    });

    const getHiddenDomStyle = computed((): CSSProperties => {
        const width = `${unref(getRealWidth)}px`;
        return {
            width: width,
            overflow: 'hidden',
            flex: `0 0 ${width}`,
            maxWidth: width,
            minWidth: width,
            transition: 'all 0.2s',
        };
    });

    // 在此处使用计算量可能会导致sider异常
    // andv 更新后，如果trigger插槽可用，则此处代码可废弃
    const getTrigger = h(LayoutTrigger);
</script>
<style lang="less">
    @prefix-cls: ~'@{namespace}-layout-sideBar';

    .@{prefix-cls} {
        z-index: @layout-sider-fixed-z-index;

        &--fixed {
            position: fixed !important;
            top: 0;
            left: 0;
            height: 100%;
        }

        &--mix {
            top: @header-height;
            height: calc(100% - @header-height);
        }

        &.ant-layout-sider-dark {
            background-color: @sider-dark-bg-color;

            .ant-layout-sider-trigger {
                color: darken(@white, 25%);
                background-color: @trigger-dark-bg-color;

                &:hover {
                    color: @white;
                    background-color: @trigger-dark-hover-bg-color;
                }
            }
        }

        &:not(.ant-layout-sider-dark) {
            // box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);

            .ant-layout-sider-trigger {
                color: @colorText;
                border-top: 1px solid @colorBorderSecondary;
            }
        }

        .ant-layout-sider-zero-width-trigger {
            top: 40%;
            z-index: 10;
        }

        & .ant-layout-sider-trigger {
            height: 36px;
            line-height: 36px;
        }
    }
</style>

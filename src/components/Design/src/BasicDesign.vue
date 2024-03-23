<!--
 * @ Author: TANGNK
 * @ Create Time: 2024-02-01 17:26:03
 * @ Modified by: TANGNK
 * @ Modified time: 2024-03-04 13:56:22
 * @ Description:
 -->
<template>
    <div ref="wrapRef" :class="prefixCls" h-full w-full>
        <div :class="`${prefixCls}-tab`" :style="tableftStyle">
            <BasicDesignWidget :designer="designer" />
        </div>
        <div :class="`${prefixCls}-tab-arrow`" @click="tabLeftClick">
            <Icon :icon="tabLeftIcon" size="12" />
        </div>
        <div :class="`${prefixCls}-content`" m-l-1 m-r-1>
            <a-layout>
                <a-layout-header></a-layout-header>
                <a-divider />
                <a-layout-content p-2>
                    <BasicDesignProduce :designer="designer" />
                </a-layout-content>
            </a-layout>
        </div>
        <div :class="`${prefixCls}-attribute-arrow`" @click="tabRightClick">
            <Icon :icon="tabRightIcon" size="12" />
        </div>
        <div :class="`${prefixCls}-attribute`" :style="tabRightStyle">
            <BasicDesignAttribute />
        </div>
    </div>
</template>
<script lang="ts" setup name="BasicDesign">
    import { useDesign } from '/@/hooks/web/useDesign';
    //  import { useI18n } from '/@/hooks/web/useI18n';
    import BasicDesignWidget from './components/BasicDesignWidget/index.vue';
    import BasicDesignAttribute from './components/BasicDesignAttribute/index.vue';
    import BasicDesignProduce from './components/BasicDesignProduce/index.vue';
    import Icon from '/@/components/Icon/index';
    // import { createDesignContext, SymbolKey } from './hooks/useBasicDesignContext';
    import { ref, unref } from 'vue';
    const designLeftIcon = 'ant-design:caret-left-outlined';
    const designRightIcon = 'ant-design:caret-right-outlined';
    const tabLeftIcon = ref(designLeftIcon);
    const tabRightIcon = ref(designRightIcon);
    const isTabLeft = ref<boolean>(true);
    const isTabRight = ref<boolean>(true);
    const tableftStyle = ref({ display: 'flex' });
    const tabRightStyle = ref({ display: 'flex' });

    function tabLeftClick() {
        isTabLeft.value = !isTabLeft.value;
        if (isTabLeft.value) {
            tabLeftIcon.value = designLeftIcon;
            tableftStyle.value.display = 'flex';
        } else {
            tabLeftIcon.value = designRightIcon;
            tableftStyle.value.display = 'none';
        }
    }

    function tabRightClick() {
        isTabRight.value = !isTabRight.value;
        if (isTabRight.value) {
            tabLeftIcon.value = designRightIcon;
            tabRightStyle.value.display = 'flex';
        } else {
            tabLeftIcon.value = designLeftIcon;
            tabRightStyle.value.display = 'none';
        }
    }

    const props = defineProps({
        designConfig: {
            type: Object,
        },
    });
    // createDesignContext(SymbolKey, { name: 'basic-design' });

    const { designConfig } = unref(props);
    console.log('designConfig', designConfig);
    // const { t } = useI18n();
    const { prefixCls } = useDesign('basic-design');

    const designer = ref({ widgetList: [] });
</script>

<style lang="less">
    @prefix-cls: ~'@{namespace}-basic-design';
    @prefix-cls_tab: ~'@{prefix-cls}_tab';
    @prefix-cls_content: ~'@{prefix-cls}_content';
    @prefix-cls_attribute: ~'@{prefix-cls}_attribute';
    .@{prefix-cls} {
        font-size: ~'@{fontSize}px';
        font-family: @fontFamily;
        display: flex;

        .ant-empty-normal {
            margin-block: 0;
        }

        ul {
            padding: 0;
        }

        &-tab {
            z-index: 1;
            background-color: @sider-dark-bg-color;
            // width: 330px;
            padding: 0.5rem;
            border: 1px solid @colorBorderSecondary;
            height: 100%;

            .ant-tabs {
                height: 100%;
            }

            // .ant-tabs-nav-wrap {
            //     justify-content: center;
            // }

            .ant-tabs-content-holder {
                overflow-y: auto;

                .ant-tabs-content {
                    width: 305px;
                }
            }
        }

        &-tab-arrow {
            z-index: 2;
            border-radius: 0 0.75rem 0.75rem 0;
            width: 0.75rem;
            height: 3rem;
            line-height: 3rem;
            align-self: center;
            margin-left: -1px;
            background-color: var(--sider-dark-bg-color);
            border-right: 1px solid @colorBorderSecondary;
            border-top: 1px solid @colorBorderSecondary;
            border-bottom: 1px solid @colorBorderSecondary;

            svg {
                color: @colorPrimary;
            }
        }

        &-content {
            z-index: 1;
            background-color: @sider-dark-bg-color;
            flex: 1;
            border: 1px solid @colorBorderSecondary;
            height: 100%;

            .ant-layout {
                height: 100%;
                background-color: @sider-dark-bg-color;

                .ant-layout-header {
                    background-color: @sider-dark-bg-color;
                    line-height: 36px;
                    height: 36px;
                    padding-inline: 20px;
                }

                .ant-divider {
                    margin: 8px 0;
                    margin-bottom: 0;
                }

                .ant-layout-content {
                    height: 100%;
                }
            }
        }

        &-attribute {
            z-index: 1;
            background-color: @sider-dark-bg-color;
            min-width: 330px;
            padding: 0.5rem;
            border: 1px solid @colorBorderSecondary;

            .ant-tabs {
                height: 100%;
            }

            // .ant-tabs-nav-wrap {
            //     justify-content: center;
            // }

            .ant-tabs-content-holder {
                overflow-y: auto;

                .ant-tabs-content {
                    width: 305px;
                }
            }
        }

        &-attribute-arrow {
            z-index: 2;
            border-radius: 0.75rem 0 0 0.75rem;
            width: 0.75rem;
            height: 3rem;
            line-height: 3rem;
            align-self: center;
            margin-right: -1px;
            background-color: var(--sider-dark-bg-color);
            border-left: 1px solid @colorBorderSecondary;
            border-top: 1px solid @colorBorderSecondary;
            border-bottom: 1px solid @colorBorderSecondary;

            svg {
                color: @colorPrimary;
            }
        }

        .field-widget-item {
            display: inline-flex;
            height: 32px;
            line-height: 32px;
            width: 125px;
            margin: 5px;
            cursor: move;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            background-color: @sider-dark-bg-color;
            border: 1px solid @colorBorderSecondary;
            border-radius: ~'@{borderRadius}px';
            padding: 0 8px;

            .dev-svg-icon {
                margin-top: 8px;
            }
        }
    }
</style>

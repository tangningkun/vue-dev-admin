<!--
 * @ Author: TANGNK
 * @ Create Time: 2024-02-01 17:26:03
 * @ Modified by: TANGNK
 * @ Modified time: 2024-02-23 14:04:09
 * @ Description:
 -->

<template>
    <div ref="wrapRef" :class="prefixCls" h-full w-full>
        <div :class="`${prefixCls}-tab`" m-r-1>
            <BasicDesignWidget />
        </div>
        <div :class="`${prefixCls}-content`">
            <a-layout>
                <a-layout-header></a-layout-header>
                <a-divider />
                <a-layout-content p-2>
                    <BasicDesignProduce />
                </a-layout-content>
            </a-layout>
        </div>
        <div :class="`${prefixCls}-attribute`" m-l-1>
            <BasicDesignAttribute />
        </div>
    </div>
</template>
<script lang="ts" setup name="BasicDesign">
    import { useDesign } from '/@/hooks/web/useDesign';
    // import { useI18n } from '/@/hooks/web/useI18n';
    import BasicDesignWidget from './components/BasicDesignWidget/index.vue';
    import BasicDesignAttribute from './components/BasicDesignAttribute/index.vue';
    import BasicDesignProduce from './components/BasicDesignProduce/index.vue';
    // import { createDesignContext, SymbolKey } from './hooks/useBasicDesignContext';
    import { unref } from 'vue';

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
            background-color: @sider-dark-bg-color;
            width: 330px;
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

        &-content {
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

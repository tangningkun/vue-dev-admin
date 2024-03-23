<!--
 * @ Author: TANGNK
 * @ Create Time: 2024-02-23 09:57:05
 * @ Modified by: TANGNK
 * @ Modified time: 2024-03-04 18:16:37
 * @ Description:
 -->

<template>
    <div :class="prefixCls" h-full w-full>
        <a-form h-full>
            <template v-if="false">
                <div :class="`${prefixCls}-empty`" h-full w-full><a-empty :description="t('components.basic.design.produce.noWidgetHint')" :image="simpleImage" /> </div>
            </template>
            <div :class="`${prefixCls}-list`" h-full w-full>
                <draggable
                    item-key="id"
                    v-bind="{ group: 'dragGroup', ghostClass: 'ghost', animation: 300 }"
                    tag="transition-group"
                    handle=".drag-handler"
                    :list="designer.widgetList"
                    :component-data="{ name: 'fade' }"
                    :sort="false"
                    :move="onCheckMove"
                    @add="onDragAdd"
                    @update="onDragUpdate"
                    @end="onDragEnd"
                >
                    <template #item="{ element: widget, index }">
                        <div :key="widget.id">
                            <template v-if="widget.widgetType === WidgetTypeEnum.CNTR">
                                <component
                                    :is="getWidgetFieIdName(widget)"
                                    :key="widget.id"
                                    :widget="widget"
                                    :designer="designer"
                                    :parent-list="designer.widgetList"
                                    :index-of-parent-list="index"
                                    :parent-widget="null"
                                />
                            </template>
                            <template v-else>
                                <component
                                    :is="getWidgetFieIdName(widget)"
                                    :key="widget.id"
                                    :field="widget"
                                    :options="widget.options"
                                    :parent-list="designer.widgetList"
                                    :index-of-parent-list="index"
                                    :parent-widget="null"
                                    :design-state="true"
                                />
                            </template>
                        </div>
                    </template>
                </draggable>
            </div>
        </a-form>
    </div>
</template>
<script lang="ts">
    import { computed, defineComponent, unref } from 'vue';
    import { useDesign } from '/@/hooks/web/useDesign';
    import { useI18n } from '/@/hooks/web/useI18n';
    import { Empty } from 'ant-design-vue';
    import FieldComponents from './WidgetFields/index';
    import { useBasicDesignMethod } from '../../hooks/useBasicDesignMethod';
    import draggable from 'vue3-draggable-next';
    import { WidgetTypeEnum } from '../BasicDesignWidget/types';
    // const props = defineProps({ designer: { type: Object } });
    export default defineComponent({
        name: 'BasicDesignProduce',
        components: { ...FieldComponents, draggable },
        props: { designer: { type: Object } },
        setup(props) {
            const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
            const { t } = useI18n();

            const { prefixCls } = useDesign('basic-design-produce');
            const designer: any = computed(() => {
                const { designer } = unref(props);
                return designer;
            });
            console.log('BasicDesignProduce===>', designer);
            function getWidgetFieIdName(widget) {
                return 'design-widget-' + widget.type;
            }
            // watch(
            //     () => designer.value.widgetList,
            //     (newwidgetList) => {
            //         console.log('newwidgetList', newwidgetList);
            //         designer.value.widgetList = newwidgetList;
            //     },
            //     { deep: true }
            // );
            console.log(!designer.value);
            const { onCheckMove, onDragAdd, onDragUpdate, onDragEnd } = useBasicDesignMethod();

            return { prefixCls, simpleImage, t, WidgetTypeEnum, designer, onCheckMove, onDragAdd, onDragUpdate, onDragEnd, getWidgetFieIdName };
        },
    });
</script>
<style lang="less">
    @prefix-cls: ~'@{namespace}-basic-design-produce';

    .@{prefix-cls} {
        &-empty {
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;

            p {
                font-size: ~'@{fontSizeLG}px';
            }
        }

        &-list {
            // background: red;
        }
    }
</style>
../../hooks/useBasicDesignMethod./WidgetFields/basicFields/index

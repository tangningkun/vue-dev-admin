<!--
 * @ Author: TANGNK
 * @ Create Time: 2024-02-23 09:57:05
 * @ Modified by: TANGNK
 * @ Modified time: 2024-02-23 17:01:10
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
                    :list="widgetList"
                    item-key="id"
                    v-bind="{ group: 'dragGroup', ghostClass: 'ghost', animation: 300 }"
                    tag="transition-group"
                    :component-data="{ name: 'fade' }"
                    handle=".drag-handler"
                >
                    <!-- :move="checkMove" @end="onDragEnd" @add="onDragAdd" @update="onDragUpdate" -->
                    <template #item="{ element: widget, index }"> {{ widget }}-----{{ index }}</template>
                </draggable>
            </div>
        </a-form>
    </div>
</template>
<script lang="ts" setup name="BasicDesignProduce">
    import { computed, unref } from 'vue';
    import { useDesign } from '/@/hooks/web/useDesign';
    const { prefixCls } = useDesign('basic-design-produce');
    import { useI18n } from '/@/hooks/web/useI18n';
    import { Empty } from 'ant-design-vue';
    import draggable from 'vuedraggable';
    const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
    const { t } = useI18n();
    const props = defineProps({ designer: { type: Object } });

    const designer = computed(() => {
        const { designer } = unref(props);
        return designer;
    });
    console.log(designer);
    const widgetList = [];
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

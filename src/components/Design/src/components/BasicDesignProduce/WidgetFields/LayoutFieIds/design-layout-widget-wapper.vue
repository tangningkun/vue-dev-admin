<template>
    <div :class="prefixCls" m-b-2 p-1>
        <slot></slot>
    </div>
</template>
<script lang="ts" setup name="design-layout-widget-wapper">
    import { computed, unref } from 'vue';
    import { useDesign } from '/@/hooks/web/useDesign';

    defineOptions({
        name: 'DesignLayoutWidgetWapper',
    });

    const props = defineProps({
        designer: { type: Object },
    });
    const designer: any = computed(() => {
        const { designer } = unref(props);
        return designer;
    });
    const { prefixCls } = useDesign('basic-design-layout-widget-wapper');
</script>
<style lang="less">
    @prefix-cls: ~'@{namespace}-basic-design-layout-widget-wapper';
    .@{prefix-cls} {
        position: relative;
        border: 1px dashed @colorBorder;
        // background-color: @colorPrimaryBg;
        overflow: hidden;
        min-height: 48px;
        min-width: 48px;

        .action {
            border: 2px solid @colorErrorBorder;
        }
    }
</style>

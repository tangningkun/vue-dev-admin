<template>
    <div :class="prefixCls">
        <!-- <span> {{ title }}</span> -->
        <a-tooltip>
            <template #title> {{ title }}</template>
            {{ title }}
        </a-tooltip>
        <a-select v-bind="getBindValue" :class="`${prefixCls}-select`" :disabled="disabled" size="small" :options="options" @change="handleChange" />
    </div>
</template>
<script lang="ts" setup name="SelectItem">
    import { PropType, computed } from 'vue';

    import { useDesign } from '/@/hooks/web/useDesign';
    import { baseHandler } from '../handler';
    import { HandlerEnum } from '../enum';

    const props = defineProps({
        event: {
            type: Number as PropType<HandlerEnum>,
        },
        disabled: {
            type: Boolean,
        },
        title: {
            type: String,
        },
        def: {
            type: [String, Number] as PropType<string | number>,
        },
        initValue: {
            type: [String, Number] as PropType<string | number>,
        },
        options: {
            type: Array as PropType<LabelValueOptions>,
            default: () => [],
        },
    });
    const { prefixCls } = useDesign('setting-select-item');
    const getBindValue = computed(() => {
        return props.def ? { value: props.def, defaultValue: props.initValue || props.def } : {};
    });

    function handleChange(e: ChangeEvent) {
        props.event && baseHandler(props.event, e);
    }
</script>
<style lang="less" scoped>
    @prefix-cls: ~'@{namespace}-setting-select-item';

    .@{prefix-cls} {
        display: flex;
        justify-content: space-between;
        margin: 16px 0;
        // color: @colorText;

        &-select {
            width: 126px;
        }
    }
</style>

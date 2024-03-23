<template>
    <div>
        <a-form-item :label="options.label">
            <a-input placeholder="input placeholder" />
        </a-form-item>
    </div>
</template>
<script lang="ts" name="design-widget-input" setup>
    import { computed, unref } from 'vue';

    defineOptions({
        name: 'DesignWidgetInput',
    });
    const props = defineProps({
        options: {
            type: Object,
        },
    });
    const options: any = computed(() => {
        const { options } = unref(props);
        return options;
    });
</script>
<style lang="less"></style>

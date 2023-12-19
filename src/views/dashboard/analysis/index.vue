<template>
    <div class="p-4">
        <a-space wrap>
            <a-button type="primary">Primary Button</a-button>
            <a-button>Default Button</a-button>
            <a-button type="dashed">Dashed Button</a-button>
            <a-button type="text">Text Button</a-button>
            <a-button type="link">Link Button</a-button>
        </a-space>

        <div :class="[`${prefixCls} p-5`]">123213</div>
    </div>
</template>
<script lang="ts" setup>
    import { ref } from 'vue';
    import { useDesign } from '/@/hooks/web/useDesign';
    const loading = ref(true);
    setTimeout(() => {
        loading.value = false;
    }, 1500);
    const { prefixCls } = useDesign('wrapper-analysis');
</script>
<style lang="less">
    @prefix-cls: ~'@{namespace}-wrapper-analysis';

    .@{prefix-cls} {
        width: 100px;
        height: 100px;
        background-color: @colorBgBase;
    }
</style>

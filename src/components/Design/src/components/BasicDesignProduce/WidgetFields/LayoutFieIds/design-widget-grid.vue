<template>
    <design-layout-widget-wapper>
        <a-row>
            <a-col :span="24">col</a-col>
        </a-row>
        <a-row>
            <a-col :span="12">col-12</a-col>
            <a-col :span="12">col-12</a-col>
        </a-row>
    </design-layout-widget-wapper>
</template>
<script lang="ts" setup name="design-widget-grid">
    defineOptions({
        name: 'DesignWidgetGrid',
    });
</script>
<style lang="less"></style>

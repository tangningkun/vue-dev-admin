<!--
 * @ Author: TANGNK
 * @ Create Time: 2024-02-18 14:29:56
 * @ Modified by: TANGNK
 * @ Modified time: 2024-02-23 14:30:38
 * @ Description:
 -->
<template>
    <a-tabs v-model:activeKey="attributeKey" :centered="true">
        <a-tab-pane key="componentTab" :tab="t('components.basic.design.attr.componentAttribute')">
            <a-empty :description="t('components.basic.design.com.underImplementation')" :image="simpleImage" />
        </a-tab-pane>
        <a-tab-pane key="formTab" :tab="t('components.basic.design.attr.formAttribute')" force-render>
            <a-empty :description="t('components.basic.design.com.underImplementation')" :image="simpleImage" />
        </a-tab-pane>
    </a-tabs>
</template>
<script lang="ts" setup name="BasicDesignAttribute">
    import { ref } from 'vue';
    import { Empty } from 'ant-design-vue';
    import { useI18n } from '/@/hooks/web/useI18n';
    const { t } = useI18n();
    const attributeKey = ref('componentTab');
    const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
</script>
<style lang="less"></style>

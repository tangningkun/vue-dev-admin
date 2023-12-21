<template>
    <div p-b-4>
        <a-space wrap>
            <template v-for="item in getBindValue.item" :key="item.keyExpr">
                <Button v-bind="item"> {{ item.text }}</Button>
            </template>
        </a-space>
    </div>
</template>
<script lang="ts" setup name="BasicToolbar">
    import { computed, unref, useAttrs } from 'vue';
    import { toolbarProps } from './props';
    import { Button } from '/@/components/DevExpress/Toolbar';

    defineOptions({
        //不自动继承 attribute
        inheritAttrs: false,
    });
    const props = defineProps(toolbarProps);
    const attrs = useAttrs();

    const getBindValue = computed(() => ({ ...unref(attrs), ...props } as Recordable));
</script>
<style lang="less"></style>

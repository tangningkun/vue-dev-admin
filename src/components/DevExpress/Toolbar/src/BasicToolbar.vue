<template>
    <div p-b-4>
        <a-space wrap>
            <template v-for="item in getBindValue.item" :key="item.keyExpr">
                <Button v-bind="item"> {{ item.text }}</Button>
            </template>

            <Dropdown :v-if="isToList" :drop-menu-list="exportButtons" :trigger="['click']" placement="bottom">
                <Button pre-icon="mdi:file-export-outline" post-icon="gridicons:dropdown" :customize-loading="false"> {{ t('components.basic.button.exportDaraGrid') }}</Button>
            </Dropdown>
            <Dropdown :v-if="isToList" :drop-menu-list="settingButton" :trigger="['click']" placement="bottom">
                <Button pre-icon="lets-icons:table-settings" post-icon="gridicons:dropdown" :customize-loading="false"> {{ t('components.basic.button.evenMore') }}</Button>
            </Dropdown>
        </a-space>
    </div>
</template>
<script lang="ts" setup name="BasicToolbar">
    import { computed, unref, useAttrs } from 'vue';
    import { toolbarProps } from './props';
    import { Button } from '/@/components/DevExpress/Toolbar';
    import { DropMenu, Dropdown } from '/@/components/Dropdown';
    import { useI18n } from '/@/hooks/web/useI18n';

    const { t } = useI18n();

    defineOptions({
        //不自动继承 attribute
        inheritAttrs: false,
    });
    const props = defineProps(toolbarProps);
    const attrs = useAttrs();

    const listAction = computed(() => {
        const { listAction } = unref(props);
        return listAction;
    });

    const exportButtons: Array<DropMenu> = [
        {
            event: 'exportSelect',
            icon: 'mdi:file-export-outline',
            text: t('components.basic.button.exportSelect'),
            onClick: async () => {
                const { customExportSelect } = unref(listAction);
                await customExportSelect();
            },
        },
        {
            event: 'exportPage',
            icon: 'mdi:file-export-outline',
            text: t('components.basic.button.exportPage'),
            onClick: async () => {
                const { customExportPage } = unref(listAction);
                await customExportPage();
            },
        },
        {
            event: 'exportAll',
            icon: 'mdi:file-export-outline',
            text: t('components.basic.button.exportAll'),
            onClick: async () => {
                const { customExportAll } = unref(listAction);
                await customExportAll();
            },
        },
    ];

    const settingButton: Array<DropMenu> = [
        {
            event: 'dataGridSetting',
            icon: 'fluent:settings-20-regular',
            text: t('components.basic.button.dataGridSetting'),
            onClick: async () => {
                console.log('dataGridSetting');
            },
        },
        {
            event: 'columnChooser',
            icon: 'mdi:table-settings',
            text: t('components.basic.button.columnChooser'),
            onClick: async () => {
                const { showColumnChooser } = unref(listAction);
                await showColumnChooser();
            },
        },
        {
            event: 'clearFilter',
            icon: 'tdesign:filter-clear',
            text: t('components.basic.button.clearFilter'),
            onClick: async () => {
                const { clearFilter } = unref(listAction);
                await clearFilter();
            },
        },
    ];

    const getBindValue = computed(() => ({ ...unref(attrs), ...props } as Recordable));
</script>
<style lang="less"></style>

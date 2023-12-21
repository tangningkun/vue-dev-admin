<template>
    <div class="p-4">
        <BasicToolbar :item="buttons" />
        <a-tabs v-model:activeKey="activeKey">
            <a-tab-pane key="waitTab" :tab="t('components.basic.tab.wait')">
                <BasicDataGrid @register="waitRegister" />
            </a-tab-pane>
            <a-tab-pane key="doneTab" :tab="t('components.basic.tab.done')" force-render>
                <BasicDataGrid @register="doneRegister" />
            </a-tab-pane>
        </a-tabs>
    </div>
</template>
<script lang="ts" setup>
    import { ref, reactive } from 'vue';
    import { BasicDataGrid, CustomizeColumns, useDataGrid } from '/@/components/DevExpress/DataGrid';
    import { BasicToolbar } from '/@/components/DevExpress/Toolbar';
    import CustomStore from 'devextreme/data/custom_store';
    import { ToolbarButtonProps } from '/@/components/DevExpress/Toolbar/src/types/toolbar-button';
    import { useI18n } from '/@/hooks/web/useI18n';

    const { t } = useI18n();

    const activeKey = ref('waitTab');

    const buttons: Array<ToolbarButtonProps> = reactive([
        {
            keyExpr: 'add',
            text: t('button.index.add'),
            preIcon: 'material-symbols:add',
            customizeClick: () => {
                console.log('新增');
            },
        },
        {
            keyExpr: 'edit',
            text: t('button.index.edit'),
            preIcon: 'akar-icons:edit',
            customizeClick: () => {
                console.log('编辑');
            },
        },
        {
            keyExpr: 'del',
            text: t('button.index.del'),
            preIcon: 'material-symbols:delete',
            customizeClick: () => {
                console.log('删除');
            },
        },
    ]);

    function isNotEmpty(value) {
        return value !== undefined && value !== null && value !== '';
    }

    const store = new CustomStore({
        key: 'OrderNumber',
        load(loadOptions) {
            let params = '?';
            ['skip', 'take', 'requireTotalCount', 'requireGroupCount', 'sort', 'filter', 'totalSummary', 'group', 'groupSummary'].forEach((i) => {
                if (i in loadOptions && isNotEmpty(loadOptions[i])) {
                    params += `${i}=${JSON.stringify(loadOptions[i])}&`;
                }
            });
            params = params.slice(0, -1);
            return fetch(`https://js.devexpress.com/Demos/WidgetsGalleryDataService/api/orders${params}`)
                .then((response) => response.json())
                .then((data) => ({
                    data: data.data,
                    totalCount: data.totalCount,
                    summary: data.summary,
                    groupCount: data.groupCount,
                }))
                .catch(() => {
                    throw new Error('Data Loading Error');
                });
        },
    });

    const dataSource = store;
    const dataSource1 = store;
    const columns: Array<CustomizeColumns> = [
        {
            dataField: 'OrderNumber',
            caption: 'OrderNumber',
            dataType: 'string',
        },
        {
            dataField: 'OrderDate',
            caption: 'OrderDate',
            dataType: 'string',
        },
        {
            dataField: 'StoreCity',
            caption: 'StoreCity',
            dataType: 'string',
        },
        {
            dataField: 'StoreState',
            caption: 'StoreState',
            dataType: 'string',
        },
        {
            dataField: 'Employee',
            caption: 'Employee',
            dataType: 'string',
        },
        {
            dataField: 'SaleAmount',
            caption: 'SaleAmount',
            dataType: 'string',
        },
    ];
    const columns1: Array<CustomizeColumns> = [
        {
            dataField: 'OrderNumber',
            caption: 'OrderNumber',
            dataType: 'string',
        },
        {
            dataField: 'OrderDate',
            caption: 'OrderDate',
            dataType: 'string',
        },
        {
            dataField: 'StoreCity',
            caption: 'StoreCity',
            dataType: 'string',
        },
        {
            dataField: 'StoreState',
            caption: 'StoreState',
            dataType: 'string',
        },
        {
            dataField: 'Employee',
            caption: 'Employee',
            dataType: 'string',
        },
        {
            dataField: 'SaleAmount',
            caption: 'SaleAmount',
            dataType: 'string',
        },
    ];
    const [waitRegister] = useDataGrid({
        dataSource: dataSource,
        customizeColumn: columns,
    });

    const [doneRegister] = useDataGrid({
        dataSource: dataSource1,
        customizeColumn: columns1,
    });
</script>
<style lang="less"></style>

<template>
    <div class="p-2">
        <BasicToolbar :item="buttonRef" :list-action="actionDataGridRef" :is-to-list="true" />
        <a-tabs v-model:activeKey="activeKey" @tab-click="tabClickFun()">
            <a-tab-pane key="waitTab" :tab="t('components.basic.tab.wait')">
                <BasicDataGrid @register="waitRegister" />
            </a-tab-pane>
            <a-tab-pane key="doneTab" :tab="t('components.basic.tab.done')" force-render>
                <BasicDataGrid @register="doneRegister" />
            </a-tab-pane>
        </a-tabs>
    </div>
</template>
<script lang="ts" setup name="TabDataGrid">
    import { ref } from 'vue';
    import { BasicDataGrid, CustomizeColumns, DataGridActionType, useDataGrid } from '/@/components/DevExpress/DataGrid';
    import { BasicToolbar } from '/@/components/DevExpress/Toolbar';
    import CustomStore from 'devextreme/data/custom_store';
    import { ToolbarButtonProps } from '/@/components/DevExpress/Toolbar/src/types/toolbar-button';
    import { useI18n } from '/@/hooks/web/useI18n';

    const { t } = useI18n();

    const activeKey = ref('waitTab');

    const actionDataGridRef = ref<DataGridActionType>();

    const waitButtons: Array<ToolbarButtonProps> = [
        {
            keyExpr: 'add',
            text: t('components.basic.button.add'),
            preIcon: 'material-symbols:add',
            customizeClick: async () => {
                await waitDataGrid.showColumnChooser();
                console.log('wait-新增');
            },
        },
        {
            keyExpr: 'edit',
            text: t('components.basic.button.edit'),
            preIcon: 'akar-icons:edit',
            customizeClick: async () => {
                const instance = await waitDataGrid.instance();
                instance.showColumnChooser();
                console.log('wait-编辑');
            },
        },
        {
            keyExpr: 'del',
            text: t('components.basic.button.del'),
            preIcon: 'material-symbols:delete',
            customizeClick: () => {
                console.log('wait-删除');
            },
        },
    ];
    const doneButtons: Array<ToolbarButtonProps> = [
        {
            keyExpr: 'edit',
            text: t('components.basic.button.edit'),
            preIcon: 'akar-icons:edit',
            customizeClick: async () => {
                console.log('done-编辑');
            },
        },
    ];

    const buttonRef = ref<Array<ToolbarButtonProps>>(waitButtons);

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

    const [waitRegister, waitDataGrid] = useDataGrid({
        dataSource: dataSource,
        customizeColumn: columns,
        customizeEnableTabPane: true,
    });

    const [doneRegister, doneDateGrid] = useDataGrid({
        dataSource: dataSource1,
        customizeColumn: columns1,
        customizeEnableTabPane: true,
    });
    actionDataGridRef.value = waitDataGrid;
    const tabClickFun = async () => {
        //TODO:执行相反操作 执行点击事件时，值未改动
        if (activeKey.value === 'waitTab') {
            const doneInstance = await doneDateGrid.instance();
            doneInstance.refresh();
            buttonRef.value = doneButtons;
            actionDataGridRef.value = doneDateGrid;
        } else {
            const waitInstance = await waitDataGrid.instance();
            waitInstance.refresh();
            buttonRef.value = waitButtons;
            actionDataGridRef.value = waitDataGrid;
        }
    };
</script>
<style lang="less"></style>

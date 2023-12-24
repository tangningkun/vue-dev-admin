<!--  -->
<template>
    <div class="p-4">
        <BasicToolbar :item="buttons" />
        <BasicDataGrid @register="register" />
    </div>
</template>

<script lang="ts" setup name="BasicDataGrid">
    import { reactive } from 'vue';
    import { BasicDataGrid, CustomizeColumns, useDataGrid } from '/@/components/DevExpress/DataGrid';
    import { BasicToolbar } from '/@/components/DevExpress/Toolbar';
    import CustomStore from 'devextreme/data/custom_store';
    import { RowDblClickEvent } from 'devextreme/ui/data_grid';
    import { ToolbarButtonProps } from '/@/components/DevExpress/Toolbar/src/types/toolbar-button';
    import { useI18n } from '/@/hooks/web/useI18n';

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
    const { t } = useI18n();

    const dataSource = store;
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
    // ,customExportAll,customExportPage,customExportSelect
    const [register, { instance, getSelectedRowsData }] = useDataGrid({
        dataSource: dataSource,
        customizeColumn: columns,
        onRowDblClick,
    });

    async function getSelectRowList() {
        const data = await getSelectedRowsData();
        console.log('getSelectRowList', data);
    }

    async function getInstance() {
        const result = await instance();
        console.log('getInstance', result);
        console.log('buttons', buttons);
    }

    const DeleteDemo = async () => {
        const result = await instance();
        result.refresh();
    };

    //#endregion

    //#region DataGrid事件
    /**
     * datagrid双击事件
     * @param e
     */
    function onRowDblClick(e: RowDblClickEvent) {
        console.log('onRowDblClick', e);
    }

    //#endregion

    const buttons: Array<ToolbarButtonProps> = reactive([
        {
            keyExpr: 'add',
            text: t('components.basic.button.add'),
            preIcon: 'material-symbols:add',
            customizeClick: getSelectRowList,
        },
        {
            keyExpr: 'edit',
            text: t('components.basic.button.edit'),
            preIcon: 'akar-icons:edit',
            customizeClick: getInstance,
        },
        {
            keyExpr: 'del',
            text: t('components.basic.button.del'),
            preIcon: 'material-symbols:delete',
            customizeClick: DeleteDemo,
        },
    ]);
</script>

<style lang="less"></style>

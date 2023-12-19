<!--  -->
<template>
    <div class="p-4">
        <BasicToolbar />
        <BasicDataGrid @register="register" />
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref } from 'vue';
    import { BasicDataGrid, CustomizeColumns, useDataGrid } from '/@/components/DevExpress/DataGrid';
    import { BasicToolbar } from '/@/components/DevExpress/Toolbar';
    import CustomStore from 'devextreme/data/custom_store';
    import { RowDblClickEvent } from 'devextreme/ui/data_grid';

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

    export default defineComponent({
        name: 'Basic',
        components: { BasicDataGrid },
        setup() {
            const dataGridHelightRef = ref(null);
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

            const [register, { instance, getSelectedRowsData }] = useDataGrid({
                dataSource: dataSource,
                customizeColumn: columns,
            });

            /**
             *  获得选中事件
             */
            async function getSelectRowList() {
                const data = await getSelectedRowsData();
                console.log('getSelectRowList', data);
            }

            /**
             *  获得选中事件
             */
            async function getInstance() {
                const result = await instance();
                console.log('getInstance', result);
            }
            //#region 按钮
            // const AddDemo = () => {
            //   console.log('新增');
            // };
            // const EditDemo = () => {
            //   console.log('编辑');
            // };
            const DeleteDemo = async () => {
                const result = await instance();
                result.refresh();
            };

            const buttons = [
                {
                    tabIndex: 0,
                    text: '新增',
                    onClick: getSelectRowList,
                },
                {
                    tabIndex: 1,
                    text: '编辑',
                    onClick: getInstance,
                },
                {
                    tabIndex: 2,
                    text: '删除',
                    onClick: DeleteDemo,
                },
            ];
            //#endregion

            //#region DataGrid事件
            /**
             * datagrid双击事件
             * @param e
             */
            function onRowDblClick(e: RowDblClickEvent) {
                console.log('onRowDblClick', e);
            }

            function onContentReady(e: any) {
                console.log('defult');
                //分页、查询、筛选、刷新后清空选中
                e.component.clearSelection();
            }
            //#endregion

            return {
                register,
                onRowDblClick,
                onContentReady,
                buttons,
                dataSource,
                columns,
                dataGridHelightRef,
            };
        },
    });
</script>

<style lang="less"></style>

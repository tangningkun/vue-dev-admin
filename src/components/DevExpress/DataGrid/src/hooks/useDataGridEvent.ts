import { error } from '/@/utils/log';
import { ContentReadyEvent } from 'devextreme/ui/data_grid';
import { ComputedRef, Ref, unref } from 'vue';
import { BasicDataGridProps } from '../types/data-grid';
import { isFunction } from '/@/utils/is';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import dayjs from 'dayjs';
import { DxDataGrid } from 'devextreme-vue';

// interface UseDxDataGridActionContext {
//     propsRef: ComputedRef<BasicDataGridProps>;
//     dataGridElRef: Ref<ComponentRef>;
// }

/**
 * 主要处理函数或方法
 * @param param0
 * @returns
 */
export function useDxDataGridEvent(propsRef: ComputedRef<BasicDataGridProps>, dataGridElRef: Ref<ComponentRef>) {
    /**
     * 处理onContentReady函数
     * @returns
     */
    function onCustomizeContentReady(): (e: ContentReadyEvent) => void {
        //#region 【处理onContentReady】
        const { isCloseEditClearSelection, customizeContentReady } = unref(propsRef);
        let newCustomizeContentReady: (e: ContentReadyEvent) => void;
        if (isCloseEditClearSelection) {
            // if (typeof customizeContentReady == 'function') {
            if (isFunction(typeof customizeContentReady)) {
                newCustomizeContentReady = (e: ContentReadyEvent) => {
                    //分页、查询、筛选、刷新后清空选中
                    e.component.clearSelection();
                    //调用原方法
                    customizeContentReady(e);
                };
            } else {
                newCustomizeContentReady = (e: ContentReadyEvent) => {
                    //分页、查询、筛选、刷新后清空选中
                    e.component.clearSelection();
                    //调用原方法
                };
            }
        } else if (typeof customizeContentReady === 'function') {
            newCustomizeContentReady = customizeContentReady;
        } else {
            newCustomizeContentReady = (_e: ContentReadyEvent) => {
                //调用原方法
            };
        }
        //#endregion

        return newCustomizeContentReady;
    }

    /**
     * 获取DataGrid的instance信息
     * @returns DataGrid
     */
    function instance(): Promise<any> {
        return new Promise(function (resolve, reject) {
            try {
                const dataGrid = unref(dataGridElRef);
                if (!dataGrid) {
                    return;
                }
                const result = (dataGrid as DxDataGrid).instance;
                resolve(result);
            } catch (err) {
                reject(err);
            }
        });
    }

    /**
     *
     * @returns 获取选中的数据信息
     */
    function getSelectedRowsData(): Promise<Array<any>> {
        return new Promise(async (resolve, reject) => {
            try {
                const dxDataGridInstance = await instance();
                const result = dxDataGridInstance.getSelectedRowsData();
                resolve(result);
            } catch (err) {
                reject(err);
            }
        });
    }

    //#region 【导出Excel事件】
    /**
     * 导出所有数据源
     */
    function customExportAll(): Promise<void> {
        return new Promise(async function (resolve, reject) {
            try {
                const { exportFileName } = unref(propsRef);
                const workbook = new Workbook();
                const fileName = exportFileName + dayjs().format('YYYY-MM-DD-HH-mm-ss');
                const worksheet = workbook.addWorksheet(fileName);
                const component = await instance();
                exportDataGrid({
                    component: component,
                    worksheet: worksheet,
                    customizeCell: function (options: any) {
                        const excelCell = options;
                        excelCell.font = { name: 'Arial', size: 12 };
                        excelCell.alignment = { horizontal: 'left' };
                    },
                }).then(function () {
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), `${fileName}.xlsx`);
                    });
                });
                component.cancel = true;
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    }
    /**
     * 导出选中数据源
     */
    function customExportSelect(): Promise<void> {
        return new Promise(async function (resolve, reject) {
            try {
                const { exportFileName } = unref(propsRef);
                const workbook = new Workbook();
                const fileName = exportFileName + dayjs().format('YYYY-MM-DD-HH-mm-ss');
                const worksheet = workbook.addWorksheet(fileName);
                const component = await instance();
                exportDataGrid({
                    component: component,
                    worksheet: worksheet,
                    selectedRowsOnly: true,
                    customizeCell: function (options: any) {
                        const excelCell = options;
                        excelCell.font = { name: 'Arial', size: 12 };
                        excelCell.alignment = { horizontal: 'left' };
                    },
                }).then(function () {
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), `${fileName}.xlsx`);
                    });
                });
                component.cancel = true;
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    }
    /**
     * 导出本页数据
     */
    function customExportPage(): Promise<void> {
        return new Promise(async function (resolve, reject) {
            try {
                let rowIndex = 1;
                const component = await instance();
                const { exportFileName } = unref(propsRef);
                const workbook = new Workbook();
                const fileName = exportFileName + dayjs().format('YYYY-MM-DD-HH-mm-ss');
                const worksheet = workbook.addWorksheet(fileName);
                const keys = component.getSelectedRowKeys();
                //ToDo:执行选中当前页数据
                component.selectAll();
                exportDataGrid({
                    component: component,
                    worksheet: worksheet,
                    selectedRowsOnly: true,
                    customizeCell: function (options: any) {
                        const { gridCell, excelCell } = options;
                        excelCell.font = { name: 'Arial', size: 12 };
                        excelCell.alignment = { horizontal: 'left' };
                        if (gridCell.column.dataField === 'DataGridXh') {
                            rowIndex = rowIndex + 1;
                        }
                        console.log('customizeCell=>options', options);
                    },
                }).then(function (res) {
                    console.log('exportDataGrid', res);
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), `${fileName}.xlsx`);
                    });
                });

                //ToDo:执行取消选中当前页数据
                component.deselectAll();
                component.selectRows(keys, true);
                component.cancel = true;
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    }
    //#endregion

    //#region
    /**
     * 清除查询的过滤器
     */
    function clearFilter(): Promise<void> {
        return new Promise(async function (resolve, reject) {
            try {
                const component = await instance();
                component.clearFilter();
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    }
    /**
     * 列筛选器
     */
    function showColumnChooser(): Promise<void> {
        return new Promise(async function (resolve, reject) {
            try {
                const component = await instance();
                component.showColumnChooser();
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    }

    //#endregion
    return {
        instance,
        getSelectedRowsData,
        onCustomizeContentReady,
        customExportAll,
        customExportSelect,
        customExportPage,
        clearFilter,
        showColumnChooser,
    };
}

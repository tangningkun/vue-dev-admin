import { DxDataGrid } from 'devextreme-vue';
import { Column, ContentReadyEvent, Editing } from 'devextreme/ui/data_grid_types';

//#region 【列配置信息】
export type CustomizeColumns = Column & { flag?: string };
//#endregion

//#region 【datagrid编辑事件】

export type CustomizeEditing = Editing;

//#endregion

//#region 【datagrid编辑事件】
export interface RemoteOperationsSetting {
    /**
     * 指定是否必须在服务器端执行筛选
     */
    filtering?: boolean;
    /**
     * 指定是否应在服务器端执行按组分页
     */
    groupPaging?: boolean;
    /**
     * 指定是否必须在服务器端执行分组
     */
    grouping?: boolean;
    /**
     * 指定是否必须在服务器端执行分页
     */
    paging?: boolean;
    /**
     * 指定是否必须在服务器端执行排序
     */
    sorting?: boolean;
    /**
     * 指定是否在服务器端计算摘要摘要
     */
    summary?: boolean;
}
//#endregion
export interface BasicDataGridProps extends DxDataGrid {
    //#region 【自定义属性】
    /**
     * 自定义编辑是否启用
     */
    customizeEnableEditing: boolean;
    /**
     * 自定义编辑模式
     * type:'batch' | 'cell' | 'row' | 'form' | 'popup'
     */
    customizeEditingMode: 'batch' | 'cell' | 'row' | 'form' | 'popup';
    /**
     * 自定义编辑事件属性
     */
    customizeEditing: CustomizeEditing;
    /**
     * 是否继承父级高度（父级高度-表单高度-padding高度）
     */
    customizeCanResizeParent: boolean;

    /**
     * 是否可以自适应高度
     */
    customizeResizeHeight?: boolean;

    /**
     * 设置水平或垂直滚动，也可以用于指定滚动区域的宽度和高度。
     * 建议为x设置一个数字，如果您想将其设置为true，
     * 您需要添加style.ant表td｛white-space:nowrap；｝。
     * @type object
     */
    customizeScroll?: { x?: number | true; y?: number };
    /**
     * 是否显示序号列
     */
    showIndexColumn: boolean;
    /**
     * 自定义列信息
     */
    // columns: any[];
    customizeColumn: Array<CustomizeColumns>;

    /**
     * 是否取消勾选
     */
    isCloseEditClearSelection: boolean;

    /**
     * 是否启用标签页
     */
    customizeEnableTabPane: boolean;

    /**
     * 导出文件名
     */
    exportFileName: string;
    //#endregion

    //#region 【自定义方法】

    /**
     * 重写
     * @param e
     * @returns
     */
    customizeContentReady: (e: ContentReadyEvent) => void;

    openModalOrDrawer: <T = any>(props?: boolean, data?: T, openOnSet?: boolean) => void;

    //#endregion
}

/**
 * 按钮点击事件配置信息
 */
export interface DataGridActionType {
    /**
     *
     */
    setProps: (props: Partial<BasicDataGridProps>) => Promise<void>;
    /**
     * 获取初始化信息
     */
    instance: () => Promise<any>;
    /**
     * 获取选中的网格信息
     */
    getSelectedRowsData: () => Promise<Array<any>>; //| Promise<Array<any>>;
    /**
     * 清除过滤器
     */
    clearFilter: () => Promise<void>;
    /**
     * 列选择器
     */
    showColumnChooser: () => Promise<void>;

    //#region 【自定义导出事件】
    /**
     * 导出所有数据源
     */
    customExportAll: () => Promise<void>;
    /**
     * 导出选中数据信息
     */
    customExportSelect: () => Promise<void>;
    /**
     * 导出当前页数据信息
     */
    customExportPage: () => Promise<void>;

    //#endregion
}

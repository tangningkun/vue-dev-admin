import type { PropType } from 'vue';
import { propTypes } from '/@/utils/propTypes';
import { DataSourceLikes } from './types/data-source';
import { CustomizeColumns, CustomizeEditing, RemoteOperationsSetting } from './types/data-grid';
import { ColumnFixing, FilterRow, HeaderFilter, Pager, Paging, Scrolling, Selection } from 'devextreme/ui/data_grid_types';
import { SearchMode } from '/@/enums/dataGrid';
// import { t } from '/@/hooks/web/useI18n';

/**
 * devextreme表单基本Props
 */
export const DataGridProps = {
    //#region 【自定义Props】

    /**
     * 取消编辑勾选
     * 分页、查询、筛选、刷新后清空选中
     */
    isCloseEditClearSelection: propTypes.bool.def(true),
    /**
     * 列信息
     */
    customizeColumn: {
        type: [Array] as PropType<Array<CustomizeColumns>>,
        default: () => [],
    },
    /**
     * 自定义编辑是否启用
     */
    customizeEnableEditing: propTypes.bool.def(false),
    /**
     * 自定义编辑模式
     * type:'batch' | 'cell' | 'row' | 'form' | 'popup'
     */
    customizeEditingMode: propTypes.oneOf(['batch', 'cell', 'row', 'form', 'popup']).def('batch'),
    /**
     * 自定义编辑事件属性
     */
    customizeEditing: { type: Object as PropType<CustomizeEditing> },

    /**
     * 是否自适应高度
     */
    customizeResizeHeight: propTypes.bool.def(true),
    /**
     * 是否继承父级高度（父级高度-表单高度-padding高度）
     */
    customizeCanResizeParent: propTypes.bool.def(false),
    /**
     *
     */
    customizeScroll: {
        type: Object as PropType<{ x: number | true; y: number }>,
        default: null,
    },
    /**
     *
     */
    customizeEnableTabPane: propTypes.bool.def(false),
    //#region 【打开抽屉与弹窗】

    /**
     * 给子界面打开事件
     */
    openModalOrDrawer: {
        type: Function as PropType<<T = any>(props?: boolean, data?: T, openOnSet?: boolean) => void>,
    },
    //#endregion

    //#endregion

    //#region 【DataGrid原始属性】

    /**
     * 指定提供键值以访问数据项的键属性（或多个属性）。
     * 每个键值必须是唯一的。此属性仅适用于 data 是简单数组的情况。
     */
    keyExpr: { type: String, default: undefined },
    /**
     *是否可以对列重新排序。
     */
    allowColumnReordering: propTypes.bool.def(true),
    /**
     * 是否可以调整列的大小。
     */
    allowColumnResizing: propTypes.bool.def(true),
    /**
     * 指定是否应缓存数据。
     */
    cacheEnabled: propTypes.bool.def(true),
    /**
     * 是否应根据内容调整其宽度。
     */
    columnAutoWidth: propTypes.bool.def(true),
    /**
     * 列固定设置为true时 列属性上的fix设置为true
     */
    // columnFixing: propTypes.bool.def(false),
    columnFixing: {
        type: Object as PropType<ColumnFixing>,
        default: {
            enable: true,
        },
    },
    /**
     * 是否应隐藏列以适应屏幕或容器大小。
     */
    columnHidingEnabled: propTypes.bool.def(false),
    /**
     * 最小的列宽度
     * 默认值设置为100
     */
    columnMinWidth: { type: Number, default: 100 },
    /**
     * 调整列的大小
     */
    columnResizingMode: propTypes.oneOf(['nextColumn', 'widget']).def('widget'),
    /**
     * 是否显示序号列
     */
    showIndexColumn: propTypes.bool.def(true),

    /**
     * 列宽
     */
    columnWidth: { type: [Number, String] as PropType<number | string>, default: undefined },

    /**
     * 数据源
     */
    dataSource: { type: Object as PropType<DataSourceLikes>, default: [] },
    // dataSource: { type: Object, default: [] },

    /**
     * 是否禁用
     */
    disabled: propTypes.bool.def(false),

    /**
     * 表格全局属性
     */
    elementAttr: { type: Object, default: {} },

    //#region  【过滤行|配置滚动。标题过滤器】

    /**
     * 过滤行
     */
    filterRow: {
        type: Object as PropType<FilterRow>,
        default: {
            applyFilter: 'auto', // 指定何时应用过滤器。
            applyFilterText: 'Apply filter', // 指定当用户在应用过滤器的按钮上暂停时显示的提示文本。
            betweenEndText: 'End', // 为编辑器指定一个占位符，该占位符在用户选择“介于”过滤器操作时指定范围的结尾。 默认值|ENd
            betweenStartText: 'Start', // 为编辑器指定一个占位符，该占位符在用户选择“介于”过滤器操作时指定范围的开始。 默认值|Start
            operationDescriptions: {},
            resetOperationText: 'Reset', // 在过滤器列表上指定用于重置操作的文本。
            showAllText: '(All)', // 为清除已应用的过滤器的项目指定文本。仅在过滤器行的单元格包含选择框时使用。
            showOperationChooser: true, // 指定打开过滤器列表的图标是否可见。
            visible: true, // 指定过滤器行是否可见。
        },
    },
    /**
     * 配置滚动。 配置固定
     */
    scrolling: {
        type: Object as PropType<Scrolling>,
        default: {
            /** 指定滚动模式。
             * standard|标准==> 用户仅滚动单个页面。仅当页面的所有行都不适合UI组件的高度时，滚动才可用。在此模式下，寻呼机执行主导航，
             * 而滚动辅助。如果禁用了分页，则UI组件会同时加载所有行，这会降低UI组件的性能。在这种情况下，建议您使用其他滚动模式。
             * Infinite|无线==>一旦滚动条达到其刻度的尽头，就会加载下一页。在这种模式下，用户从第一页到最后一页逐渐滚动数据。
             * 注:设置分组。当结合使用无限滚动和分组时，allowCollapsing属性为false
             * virtual、虚拟==>行进入视口时将被加载，并且在离开视口后将其删除。如果这些行需要时间来加载和呈现，
             * 它们将显示灰色框。渲染优化可以减少渲染时间并删除灰色框。在这种模式下，用户可以立即移动到任何页面。
             */
            mode: 'standard',
            /**
             * 指定列的呈现模式。当列保留在视口之外时应用。需要指定的columnWidth，
             * columnAutoWidth或width（对于所有列）属性。standard=标准 | virtual=虚拟
             * standard一次
             * 渲染所有已加载的行。
             * virtual
             * 仅渲染进入视口的那些行。如果pageSize大，则使用此模式。当前正在渲染的行可以显示为灰色框。
             */
            columnRenderingMode: 'standard',
            /**
             * 指定UI组件是否应加载相邻页面。仅在滚动时适用。模式是“虚拟”或“无限”。
             * 在虚拟和无限滚动模式下，页面按需加载。如果将此属性设置为true，则会提前加载相邻页面，
             * 以使滚动更流畅。此属性可能会降低旧设备的性能。
             */
            preloadEnabled: true,
            /**
             * 指定已加载行的呈现方式。
             * 类型:string|默认值:standard
             * 接受的值: 'standard' | 'virtual'
             * standard一次
             * 渲染所有已加载的行。
             * virtual
             * 仅渲染进入视口的那些行。如果pageSize大，则使用此模式。当前正在渲染的行可以显示为灰色框。
             */
            rowRenderingMode: 'standard',
            /**
             * 指定用户是否可以使用滑动手势滚动内容。仅在useNative为false时适用。
             */
            scrollByContent: false,
            /**
             * 指定用户是否可以使用滚动条滚动内容。仅在useNative为false时适用。
             */
            scrollByThumb: true,
            /**
             * 指定何时显示滚动条。仅在useNative为false时适用。
             * 类型:string|默认值:standard
             * 接受的值: 'always' | 'never' | 'onHover' | 'onScroll'
             * 滚动条有助于垂直和水平滚动内容。当所有行都不适合UI组件的高度时，
             * 垂直滚动可用。当所有列都不适合UI组件的宽度时，可以使用水平滚动，
             * 当列具有固定宽度或columnAutoWidth属性设置为true时，可能会发生水平滚动。
             */
            showScrollbar: 'always',
            /**
             * 指定UI组件应使用本机滚动还是模拟滚动。
             * 类型：Boolean | String
             * 默认值:auto
             */
            useNative: 'auto',
        },
    },
    /**
     * 配置标题过滤器功能。
     * 标题过滤器的弹出菜单列出所有列值。如果
     * 它们是数字或日期，则可以使用列的
     * headerFilter中的groupInterval属性对它们
     * 进行分组。您还可以使用dataSource属性为标题
     * 过滤器提供自定义数据源。
     */
    headerFilter: {
        type: Object as PropType<HeaderFilter>,
        default: {
            search: {
                enabled: true,
                mode: SearchMode.contains,
                timeout: 1000,
            },
            height: 352,
            visible: true,
            width: 252,
        },
    },
    /**
     * 勾选框
     *
     */
    selection: {
        type: Object as PropType<Selection>,
        default: {
            allowSelectAll: true,
            deferred: false,
            mode: 'multiple',
            selectAllMode: 'page',
            showCheckBoxesMode: 'always',
        },
    },

    //#endregion

    /**
     * 通知 DataGrid 服务器的数据处理操作。
     */
    remoteOperations: {
        type: [String, Boolean, Object] as PropType<string | boolean | PropType<RemoteOperationsSetting>>,
        default: true,
    },
    /**
     * 显示列线
     */
    showColumnLines: propTypes.bool.def(true),
    /**
     * 显示行线
     */
    showRowLines: propTypes.bool.def(true),
    /**
     * 显示边框
     */
    showBorders: propTypes.bool.def(true),
    /**
     * 斑马纹
     */
    rowAlternationEnabled: propTypes.bool.def(true),
    /**
     * 组件是否可见
     */
    visible: propTypes.bool.def(true),
    /**
     * 宽度
     */
    width: {
        // type: [Number, String, Function] as PropType<
        //   number | string | PropType<(...arg: any[]) => Promise<number | string>>
        // >,
        type: [Number, String] as PropType<number | string>,
        default: '100%',
    },

    //#region 【分页信息】
    /**
     * 分页
     */
    pager: {
        type: Object as PropType<Pager>,
        default: {
            allowedPageSizes: [5, 10, 20, 50, 100, 200, 500],
            // infoText: t(''),
            /**
             * 指定是否显示页面信息。
             * 类型： 布尔型
             * 默认值： false
             */

            displayMode: 'adaptive', //'adaptive' | 'compact' | 'full'
            showInfo: true,
            showNavigationButtons: false,
            showPageSizeSelector: false,
            visible: true,
        },
    },

    /**
     * 分页信息
     */
    paging: {
        type: Object as PropType<Paging>,
        default: {
            enabled: true,
            pageIndex: 0,
            pageSize: 20,
        },
    },

    //#endregion

    // type: [Number, String, Function] as PropType<
    //   number | string | PropType<(...arg: any[]) => Promise<number | string>>
    // >,
    /**
     * @deprecated
     * 高度属性暂不传递，F11控制页面全屏后会存在问题
     */
    height: {
        type: [Number, String] as PropType<number | string>,
        default: '100%',
    },

    //#region 【export导出配置】
    /**
     * 导出文件名
     */
    exportFileName: { type: String, default: '' },
    //#endregion

    //#endregion
};

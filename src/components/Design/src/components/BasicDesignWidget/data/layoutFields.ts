/**
 * 布局组件
 */
export const layoutFields: Array<any> = [
    {
        type: 'grid',
        category: 'container',
        icon: 'design-grid-field|svg',
        cols: [],
        options: {
            name: '',
            hidden: false,
            gutter: 12,
            colHeight: null, //栅格列统一高度属性，用于解决栅格列设置响应式布局浮动后被挂住的问题！！
            customClass: '', //自定义css类名
        },
    },
    {
        type: 'table',
        category: 'container',
        icon: 'design-table-field|svg',
        rows: [],
        options: {
            name: '',
            hidden: false,
            customClass: '', //自定义css类名
        },
    },
    {
        type: 'tab',
        category: 'container',
        icon: 'design-tab-field|svg',
        displayType: 'border-card',
        tabs: [],
        options: {
            name: '',
            hidden: false,
            customClass: '', //自定义css类名
        },
    },

    {
        type: 'card',
        category: 'container',
        icon: 'design-card-field|svg',
        widgetList: [],
        options: {
            name: '',
            label: 'card',
            hidden: false,
            folded: false,
            showFold: true,
            cardWidth: '100%',
            shadow: 'never',
            customClass: '',
        },
    },
    {
        type: 'grid-col',
        category: 'container',
        icon: 'grid-col',
        internal: true,
        widgetList: [],
        options: {
            name: '',
            hidden: false,
            span: 12,
            offset: 0,
            push: 0,
            pull: 0,
            responsive: false, //是否开启响应式布局
            md: 12,
            sm: 12,
            xs: 12,
            customClass: '', //自定义css类名
        },
    },

    {
        type: 'table-cell',
        category: 'container',
        icon: 'table-cell',
        internal: true,
        widgetList: [],
        merged: false,
        options: {
            name: '',
            cellWidth: '',
            cellHeight: '',
            colspan: 1,
            rowspan: 1,
            wordBreak: false, //是否自动换行
            customClass: '', //自定义css类名
        },
    },

    {
        type: 'tab-pane',
        category: 'container',
        icon: 'tab-pane',
        internal: true,
        widgetList: [],
        options: {
            name: '',
            label: '',
            hidden: false,
            active: false,
            disabled: false,
            customClass: '', //自定义css类名
        },
    },
];
/**
 * 新增属性
 * @param attribute
 */
export function addLayoutFields(attribute: any) {
    layoutFields.push(attribute);
}

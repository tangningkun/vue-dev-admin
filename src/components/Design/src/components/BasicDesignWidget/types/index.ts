/**
 * @ Author: TANGNK
 * @ Create Time: 2024-02-29 10:05:09
 * @ Modified by: TANGNK
 * @ Modified time: 2024-03-04 16:19:32
 * @ Description:
 */

/**
 * 表单组件类型
 */
export enum WidgetTypeEnum {
    CNTR = 'CNTR',
    ITEM = 'ITEM',
}

export enum TabTypeEnum {
    line = 'line',
    card = 'card',
    editableCard = 'editable-card',
}

/**
 * 组件属性
 */
export interface FieIdTypeAttr {
    //组件名称
    type: string;
    //组件图标
    icon: string;
    //组件所属类型
    widgetType: WidgetTypeEnum;
    //配置
    options: object;
    rows?: object[];
    cols?: object[];
    tabs?: object[];
    childList?: object[];
    merged?: boolean;
    internal?: boolean;
    tabType?: TabTypeEnum;
}

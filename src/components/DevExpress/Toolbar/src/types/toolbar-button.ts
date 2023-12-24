export type primaryType = 'primary' | 'ghost' | 'dashed' | 'link' | 'text' | 'default';
export interface ToolbarButtonProps {
    //#region <++++++++++++++++++++必要属性++++++++++++++++++>
    /**
     * 按钮键值(每个列表页面唯一)
     */
    keyExpr: string;
    /**
     * 按钮名称
     */
    text?: string;
    /**
     * 按钮点击事件
     */
    customizeClick?: Function;

    //#endregion

    //#region <++++++++++++++++++++非必要属性++++++++++++++++++>
    /**
     * 按钮类型
     */
    type?: primaryType;
    /**
     * 是否禁用
     */
    disabled?: boolean;
    /**
     * 是否显示
     */
    visible?: boolean;
    /**
     * 是否加载中图标
     */
    customizeLoading?: boolean;
    /**
     * 文本左侧图标
     */
    preIcon?: string;
    /**
     * 文本右侧图标
     */
    postIcon?: string;
    /**
     * 字体大小
     */
    iconSize?: number;
    //#endregion
}

import { primaryType, ToolbarButtonProps } from './types/toolbar-button';
import { propTypes } from '/@/utils/propTypes';
import { buildUUID } from '/@/utils/uuid';

export const toolbarProps = {
    item: { type: Array as PropType<Array<ToolbarButtonProps>>, default: [] },
};

export const buttonProps = {
    /**
     * 按钮键值(每个列表页面唯一)
     */
    keyExpr: propTypes.string.def(buildUUID()),
    /**
     * 按钮名称
     */
    // text: propTypes.string.def(''),
    /**
     * 按钮点击事件
     */
    customizeClick: { type: Function as PropType<(...args) => any>, default: null },
    /**
     * 按钮类型
     */
    type: { type: String as PropType<primaryType>, default: 'primary' },

    /**
     * 是否加载中图标
     */
    customizeLoading: propTypes.bool.def(true),
    /**
     * 是否显示
     */
    visible: propTypes.bool.def(true),
    /**
     * 是否禁用
     */
    disabled: propTypes.bool.def(false),
    /**
     * 按钮左侧图标
     */
    preIcon: { type: String },
    /**
     * 文本右侧图标
     */
    postIcon: { type: String },
    /**
     * 字体大小
     * @default: 14
     */
    iconSize: propTypes.number.def(14),
};

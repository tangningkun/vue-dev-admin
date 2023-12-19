export interface ToolbarButtonProps {
    /**
     * 是否禁用
     */
    disabled: boolean;
    /**
     * 是否显示
     */
    visible: boolean;
    /**
     * 按钮类型
     */
    type: 'primary' | 'ghost' | 'dashed' | 'link' | 'text' | 'default';
}

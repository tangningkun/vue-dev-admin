/**
 * @description: 菜单类型
 */
export enum MenuTypeEnum {
    // left menu
    SIDEBAR = 'sidebar',

    MIX_SIDEBAR = 'mix-sidebar',
    // mixin menu
    MIX = 'mix',
    // top menu
    TOP_MENU = 'top-menu',
}

// 折叠触发器位置
export enum TriggerEnum {
    // 不显示
    NONE = 'NONE',
    // 菜单底部
    FOOTER = 'FOOTER',
    // 头部
    HEADER = 'HEADER',
}

export type Mode = 'vertical' | 'vertical-right' | 'horizontal' | 'inline';
/**
 * 菜单模式
 */
export enum MenuModeEnum {
    VERTICAL = 'vertical',
    HORIZONTAL = 'horizontal',
    VERTICAL_RIGHT = 'vertical-right',
    INLINE = 'inline',
}

/**
 * 菜单拆分类型
 */
export enum MenuSplitTypeEnum {
    NONE,
    TOP,
    LEFT,
}
/**
 * TopMenuAlignEnum
 */
export enum TopMenuAlignEnum {
    CENTER = 'center',
    START = 'start',
    END = 'end',
}
/**
 * 混合边栏触发
 */
export enum MixSidebarTriggerEnum {
    HOVER = 'hover',
    CLICK = 'click',
}

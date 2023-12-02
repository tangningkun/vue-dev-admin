//侧栏最小宽度
export const SIDE_BAR_MINI_WIDTH = 48;
//侧栏展示小标题宽度
export const SIDE_BAR_SHOW_TITLE_MINI_WIDTH = 80;

/**
 * 内容宽度枚举
 */
export enum ContentEnum {
    // auto width 自适应宽度
    FULL = 'full',
    // fixed width 固定宽度
    FIXED = 'fixed',
}

/**
 * 菜单主题枚举
 * menu theme enum
 */
export enum ThemeEnum {
    DARK = 'dark',
    LIGHT = 'light',
}

/**
 * 设置按钮位置Enum
 */
export enum SettingButtonPositionEnum {
    AUTO = 'auto',
    HEADER = 'header',
    FIXED = 'fixed',
}

/**
 * 会话超时处理Enum
 */
export enum SessionTimeoutProcessingEnum {
    ROUTE_JUMP,
    PAGE_COVERAGE,
}

/**
 * 权限模式枚举
 */
export enum PermissionModeEnum {
    // role
    // 角色权限
    ROLE = 'ROLE',
    // black
    // 后端
    BACK = 'BACK',
    // route mapping
    // 路由映射
    ROUTE_MAPPING = 'ROUTE_MAPPING',
}

/**
 * Route switching animation
 * 路由切换动画
 */
export enum RouterTransitionEnum {
    ZOOM_FADE = 'zoom-fade',
    ZOOM_OUT = 'zoom-out',
    FADE_SIDE = 'fade-slide',
    FADE = 'fade',
    FADE_BOTTOM = 'fade-bottom',
    FADE_SCALE = 'fade-scale',
}

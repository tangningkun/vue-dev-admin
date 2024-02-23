import { provide, inject } from 'vue';

export const serverFieldsKey = Symbol('server-fields');
export const disableWidgetKey = Symbol('disable-widget'); //禁用插件
export const designConfig = Symbol('design-config');

export function createDesignContext(key, instance) {
    provide(key, instance);
}

export function useDesignContext(key) {
    return inject(key);
}

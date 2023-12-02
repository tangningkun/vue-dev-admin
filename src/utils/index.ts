import type { RouteLocationNormalized, RouteRecordNormalized } from 'vue-router';
import type { App, Plugin } from 'vue';

import { unref } from 'vue';
import { isObject } from '/@/utils/is';

export const noop = () => {};

/**
 * @description:  Set ui mount node
 */
export function getPopupContainer(node?: HTMLElement): HTMLElement {
    return (node?.parentNode as HTMLElement) ?? document.body;
}

/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
    let parameters = '';
    for (const key in obj) {
        parameters += key + '=' + encodeURIComponent(obj[key]) + '&';
    }
    parameters = parameters.replace(/&$/, '');
    return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters;
}

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
    let key: string;
    for (key in target) {
        src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
    }
    return src;
}

export function openWindow(url: string, opt?: { target?: TargetContext | string; noopener?: boolean; noreferrer?: boolean }) {
    const { target = '__blank', noopener = true, noreferrer = true } = opt || {};
    const feature: string[] = [];

    noopener && feature.push('noopener=yes');
    noreferrer && feature.push('noreferrer=yes');

    window.open(url, target, feature.join(','));
}

//动态使用hook
export function getDynamicProps<T, U>(props: T): Partial<U> {
    const ret: Recordable = {};
    const propskey = props as any;
    Object.keys(propskey).map((key) => {
        ret[key] = unref((props as Recordable)[key]);
    });

    return ret as Partial<U>;
}

export function getRawRoute(route: RouteLocationNormalized): RouteLocationNormalized {
    if (!route) {
        return route;
    }
    const { matched, ...opt } = route;
    return {
        ...opt,
        matched: (matched
            ? matched.map((item) => ({
                  meta: item.meta,
                  name: item.name,
                  path: item.path,
              }))
            : undefined) as RouteRecordNormalized[],
    };
}

export const withInstall = <T>(component: T, alias?: string) => {
    const comp = component as any;
    comp.install = (app: App) => {
        app.component(comp.name || comp.displayName, comp);
        if (alias) {
            app.config.globalProperties[alias] = comp;
        }
    };
    return comp as T & Plugin;
};

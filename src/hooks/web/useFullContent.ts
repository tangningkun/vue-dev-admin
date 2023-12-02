import { computed, unref } from 'vue';

import { useAppStore } from '/@/store/modules/app';

import { useRouter } from 'vue-router';

/**
 * @description: Full screen display content
 */
export const useFullContent = () => {
    const appStore = useAppStore();
    const router = useRouter();
    const { currentRoute } = router;

    // 是否在不显示菜单的情况下全屏显示内容
    const getFullContent = computed(() => {
        // 查询参数，当地址栏有一个完整的参数时，会显示全屏
        const route = unref(currentRoute);
        const query = route.query;
        // Reflect.has() 用于检查一个对象是否拥有某个属性 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/has
        if (query && Reflect.has(query, '__full__')) {
            return true;
        }
        // 返回到配置文件中的配置
        return appStore.getProjectConfig.fullContent;
    });

    return { getFullContent };
};

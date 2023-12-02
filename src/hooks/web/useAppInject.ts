import { useAppProviderContext } from '/@/components/Application';
import { computed, unref } from 'vue';

export function useAppInject() {
    const values = useAppProviderContext();

    return {
        /**
         * 是否手机端
         */
        getIsMobile: computed(() => unref(values.isMobile)),
    };
}

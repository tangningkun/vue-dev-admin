<script lang="ts">
    import { defineComponent, toRefs, ref } from 'vue';
    import { createAppProviderContext } from './useAppContext';
    import { prefixCls } from '/@/settings/designSetting';

    const props = {
        /**
         * class style prefix
         */
        prefixCls: { type: String, default: prefixCls },
    };

    export default defineComponent({
        name: 'AppProvider',
        inheritAttrs: false,
        props,
        setup(props, { slots }) {
            const isMobile = ref(false);
            const { prefixCls } = toRefs(props);
            // Inject variables into the global
            createAppProviderContext({ prefixCls, isMobile });
            return () => slots.default?.();
        },
    });
</script>

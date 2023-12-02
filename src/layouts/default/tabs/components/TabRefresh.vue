<template>
    <span :class="`${prefixCls}__extra-redo`" @click="handleRedo">
        <SyncOutlined :spin="loading" />
    </span>
</template>
<script lang="ts" setup name="TabRefresh">
    import { ref } from 'vue';
    import { SyncOutlined } from '@ant-design/icons-vue';
    import { useDesign } from '/@/hooks/web/useDesign';
    import { useTabs } from '/@/hooks/web/useTabs';

    const loading = ref(false);

    const { prefixCls } = useDesign('multiple-tabs-content');
    const { refreshPage } = useTabs();

    async function handleRedo() {
        loading.value = true;
        await refreshPage();
        setTimeout(() => {
            loading.value = false;
            // Animation execution time
        }, 1200);
    }
</script>

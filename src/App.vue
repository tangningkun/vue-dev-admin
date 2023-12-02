<template>
    <a-config-provider :theme="configTheme" w-full h-full>
        <AppProvider>
            <RouterView />
            <!-- <default-layout /> -->
        </AppProvider>
    </a-config-provider>
</template>

<script lang="ts" setup>
    import { watch, reactive } from 'vue';
    import { AppProvider } from '/@/components/Application';
    import { theme } from 'ant-design-vue';
    const { defaultAlgorithm, darkAlgorithm, compactAlgorithm } = theme;
    import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting';
    import { ThemeEnum } from './enums/appEnum';
    const { getHeaderTheme } = useHeaderSetting();
    const configTheme = reactive({
        algorithm: [defaultAlgorithm, compactAlgorithm],
    });

    changeConfigTheme(getHeaderTheme.value);
    /**
     * 监听头部主题转换
     */
    watch(
        () => getHeaderTheme,
        (newTheme) => {
            changeConfigTheme(newTheme.value);
        },
        { deep: true }
    );
    function changeConfigTheme(theme: ThemeEnum) {
        if (theme === ThemeEnum.DARK) {
            configTheme.algorithm = [darkAlgorithm, compactAlgorithm];
        } else {
            configTheme.algorithm = [defaultAlgorithm, compactAlgorithm];
        }
    }
</script>
<style lang="scss" scoped></style>

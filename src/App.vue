<template>
    <a-watermark content="VUE DEV Admin" w-full h-full>
        <a-config-provider :theme="configTheme" w-full h-full>
            <AppProvider>
                <RouterView />
            </AppProvider>
        </a-config-provider>
    </a-watermark>
</template>

<script lang="ts" setup>
    import { watch, reactive } from 'vue';
    import { AppProvider } from '/@/components/Application';
    import { useAppStore } from '/@/store/modules/app';
    import { theme } from 'ant-design-vue';
    import { ThemeEnum } from './enums/appEnum';
    const { defaultAlgorithm, darkAlgorithm, compactAlgorithm } = theme;
    const appStore = useAppStore();
    const configTheme = reactive({
        algorithm: [defaultAlgorithm, compactAlgorithm],
        token: {
            colorPrimary: appStore.projectConfig?.themeColor,
        },
    });
    settingConfigTheme(appStore.getDarkMode);
    /**
     * 监听头部主题转换
     */
    watch(
        () => appStore.getDarkMode,
        (newTheme) => {
            settingConfigTheme(newTheme);
        },
        { deep: true }
    );

    /**
     * 监听头部主题转换
     */
    watch(
        () => appStore.projectConfig?.themeColor,
        (newColor) => {
            configTheme.token.colorPrimary = newColor;
        },
        { deep: true }
    );

    /**
     * 改变项目主题
     * @param theme
     */
    function settingConfigTheme(theme: string) {
        if (theme === ThemeEnum.DARK) {
            configTheme.algorithm = [darkAlgorithm, compactAlgorithm];
        } else {
            configTheme.algorithm = [defaultAlgorithm, compactAlgorithm];
        }
    }
</script>
<style lang="scss" scoped></style>

<template>
    <a-config-provider :theme="theme1" w-full h-full>
        <AppProvider>
            <RouterView />
            <!-- <default-layout /> -->
        </AppProvider>
    </a-config-provider>
</template>

<script lang="ts" setup>
    import { AppProvider } from '/@/components/Application';
    import { theme } from 'ant-design-vue';
    import convertLegacyToken from 'ant-design-vue/lib/theme/convertLegacyToken';
    const { defaultAlgorithm, darkAlgorithm, compactAlgorithm, defaultSeed } = theme;
    const theme1 = {
        algorithm: [darkAlgorithm, compactAlgorithm],
    };
    console.log('defaultAlgorithm==>', defaultAlgorithm(defaultSeed));
    console.log('darkAlgorithm==>', darkAlgorithm(defaultSeed, defaultAlgorithm(defaultSeed)));
    const v3Token = convertLegacyToken(defaultAlgorithm(defaultSeed));
    console.log('v3Token==>', v3Token);
    const Darkv3Token = convertLegacyToken(darkAlgorithm(defaultSeed));
    console.log('v3Token==>', Darkv3Token);
    const aaa = { name: '张三', age: 13 };
    console.log({ ...aaa, name: '李四' });
</script>
<style lang="scss" scoped></style>

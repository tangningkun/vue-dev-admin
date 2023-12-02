<template>
    <a-layout :class="prefixCls">
        <LayoutFeatures />
        <LayoutHeader v-if="getShowFullHeaderRef" fixed />
        <a-layout :class="[layoutClass]">
            <LayoutSiderWrapper v-if="getShowSidebar || getIsMobile" />
            <a-layout :class="`${prefixCls}-main`">
                <LayoutMultipleHeader />
                <LayoutContent />
                <LayoutFooter />
            </a-layout>
        </a-layout>
    </a-layout>
</template>
<script lang="ts" setup name="DefaultLayout">
    import { computed, unref } from 'vue';

    import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent';

    import LayoutHeader from './header/index.vue';
    import LayoutContent from './content/index.vue';
    import LayoutSiderWrapper from './sider/index.vue';
    import LayoutMultipleHeader from './header/multiple-header.vue';

    import { useDesign } from '/@/hooks/web/useDesign';
    import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting';
    import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
    // import { useLockPage } from '/@/hooks/web/useLockPage';

    import { useAppInject } from '/@/hooks/web/useAppInject';

    const LayoutFeatures = createAsyncComponent(() => import('/@/layouts/default/feature/index.vue'));
    const LayoutFooter = createAsyncComponent(() => import('/@/layouts/default/footer/index.vue'));

    const { prefixCls } = useDesign('default-layout');
    const { getIsMobile } = useAppInject();
    const { getShowFullHeaderRef } = useHeaderSetting();
    const { getShowSidebar, getIsMixSidebar, getShowMenu } = useMenuSetting();

    // Create a lock screen monitor
    // const lockEvents = useLockPage();
    const layoutClass = computed(() => {
        const cls: string[] = ['ant-layout'];
        if (unref(getIsMixSidebar) || unref(getShowMenu)) {
            cls.push('ant-layout-has-sider');
        }
        return cls;
    });
</script>

<style lang="less">
    @prefix-cls: ~'@{namespace}-default-layout';

    .@{prefix-cls} {
        display: flex;
        width: 100%;
        min-height: 100%;
        background-color: @content-bg;
        flex-direction: column;

        > .ant-layout {
            min-height: 100%;
        }

        &-main {
            width: 100%;
            margin-left: 1px;
        }
    }
</style>

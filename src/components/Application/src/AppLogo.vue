<template>
    <div class="anticon" :class="getAppLogoClass" @click="goHome">
        <img src="../../../assets/images/logo.png" />
        <div v-show="showTitle" class="ml-2 truncate md:opacity-100" :class="getTitleClass">
            {{ title }}
        </div>
    </div>
</template>
<script lang="ts" name="AppLogo" setup>
    import { computed, unref } from 'vue';
    import { useGlobSetting } from '/@/hooks/setting';
    // import { useGo } from '/@/hooks/web/usePage';
    import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
    import { useDesign } from '/@/hooks/web/useDesign';
    // import { PageEnum } from '/@/enums/pageEnum';
    // import { useUserStore } from '/@/store/modules/user';

    const props = defineProps({
        /**
         * 当前父组件的主题
         */
        theme: { type: String, validator: (v: string) => ['light', 'dark'].includes(v) },
        /**
         * 是否显示标题
         */
        showTitle: { type: Boolean, default: true },
        /**
         * 菜单折叠时也会显示标题
         */
        alwaysShowTitle: { type: Boolean },
    });

    const { prefixCls } = useDesign('app-logo');
    const { getCollapsedShowTitle } = useMenuSetting();
    // const userStore = useUserStore();
    const { title } = useGlobSetting();

    const getAppLogoClass = computed(() => [prefixCls, props.theme, { 'collapsed-show-title': unref(getCollapsedShowTitle) }]);

    const getTitleClass = computed(() => [
        `${prefixCls}__title`,
        {
            'xs:opacity-0': !props.alwaysShowTitle,
        },
    ]);

    function goHome() {
        // useGo(userStore.getUserInfo.homePath || PageEnum.BASE_HOME);
    }
</script>
<style lang="less" scoped>
    @prefix-cls: ~'@{namespace}-app-logo';

    .@{prefix-cls} {
        display: flex;
        align-items: center;
        padding-left: 7px;
        cursor: pointer;
        transition: all 0.2s ease;

        &.light {
            border-bottom: 1px solid @colorBorderSecondary;
        }

        &.collapsed-show-title {
            padding-left: 20px;
        }

        &.light &__title {
            color: @themePrimaryColor;
        }

        &.dark &__title {
            color: @white;
        }

        &__title {
            font-size: 16px;
            font-weight: 700;
            transition: all 0.5s;
            line-height: normal;
        }
    }
</style>

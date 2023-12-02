<template>
    <a-dropdown placement="bottomLeft" :overlay-class-name="`${prefixCls}-dropdown-overlay`">
        <span :class="[prefixCls, `${prefixCls}--${theme}`]" class="flex">
            <img :class="`${prefixCls}__header`" :src="getUserInfo.avatar" />
            <span :class="`${prefixCls}__info hidden md:block`">
                <span :class="`${prefixCls}__name  `" class="truncate">
                    {{ getUserInfo.realName }}
                </span>
            </span>
        </span>

        <template #overlay>
            <a-menu @click="handleMenuClick">
                <DropMenuItem v-if="getShowDoc" key="doc" :text="t('layout.header.dropdownItemDoc')" icon="ion:document-text-outline" />
                <a-menu-divider v-if="getShowDoc" />
                <DropMenuItem v-if="getUseLockPage" key="lock" :text="t('layout.header.tooltipLock')" icon="ion:lock-closed-outline" />
                <DropMenuItem key="logout" :text="t('layout.header.dropdownItemLoginOut')" icon="ion:power-outline" />
            </a-menu>
        </template>
    </a-dropdown>
</template>
<script lang="ts" setup>
    import { computed } from 'vue';
    import { DOC_URL } from '/@/settings/siteSetting';
    import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting';
    import { useI18n } from '/@/hooks/web/useI18n';
    import { useDesign } from '/@/hooks/web/useDesign';
    import headerImg from '/@/assets/images/header.jpg';
    import { propTypes } from '/@/utils/propTypes';
    import { openWindow } from '/@/utils';
    import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent';
    import { useUserStore } from '/@/store/modules/user';

    type MenuEvent = 'logout' | 'doc' | 'lock';

    defineProps({
        theme: propTypes.oneOf(['dark', 'light']),
    });

    const DropMenuItem = createAsyncComponent(() => import('./DropMenuItem.vue'));

    const { prefixCls } = useDesign('header-user-dropdown');
    const { t } = useI18n();
    const { getShowDoc, getUseLockPage } = useHeaderSetting();
    const userStore = useUserStore();

    const getUserInfo = computed(() => {
        const { realName = '', avatar, desc } = userStore.getUserInfo || {};
        // const realName = 'Dev Admin';
        // const avatar = 'https://q1.qlogo.cn/g?b=qq&nk=190848757&s=640';
        // const desc = 'manager';
        return { realName, avatar: avatar || headerImg, desc };
    });

    /**
     *
     */
    function handleLock() {}
    /**
     * 退出登录
     */
    function handleLoginOut() {
        userStore.confirmLoginOut();
    }
    /**
     * 打开文档
     */
    function openDoc() {
        openWindow(DOC_URL);
    }

    function handleMenuClick(e: { key: MenuEvent }) {
        switch (e.key) {
            case 'logout':
                handleLoginOut();
                break;
            case 'doc':
                openDoc();
                break;
            case 'lock':
                handleLock();
                break;
            default:
                handleLoginOut();
                break;
        }
    }
</script>
<style lang="less">
    @prefix-cls: ~'@{namespace}-header-user-dropdown';

    .@{prefix-cls} {
        height: @header-height;
        padding: 0 0 0 10px;
        padding-right: 10px;
        overflow: hidden;
        font-size: 12px;
        cursor: pointer;
        align-items: center;

        img {
            width: 24px;
            height: 24px;
            margin-right: 12px;
        }

        &__header {
            border-radius: 50%;
        }

        &__name {
            font-size: 14px;
        }

        &--dark {
            &:hover {
                background-color: @header-dark-bg-hover-color;
            }
        }

        &--light {
            &:hover {
                background-color: @header-light-bg-hover-color;
            }

            .@{prefix-cls}__name {
                color: @text-color-base;
            }

            .@{prefix-cls}__desc {
                color: @header-light-desc-color;
            }
        }

        &-dropdown-overlay {
            .ant-dropdown-menu-item {
                min-width: 160px;
            }
        }
    }
</style>

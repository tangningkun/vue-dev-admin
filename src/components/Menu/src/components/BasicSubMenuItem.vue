<template>
    <BasicMenuItem v-if="!menuHasChildren(item) && getShowMenu" :class="prefixCls" v-bind="$props" />
    <a-sub-menu v-if="menuHasChildren(item) && getShowMenu" :key="`submenu-${item.path}`" :class="[theme]" popup-class-name="app-top-menu-popup">
        <template #title>
            <MenuItemContent v-bind="$props" :item="item" />
        </template>

        <template v-for="childrenItem in item.children || []" :key="childrenItem.path">
            <BasicSubMenuItem v-bind="$props" :item="childrenItem" />
        </template>
    </a-sub-menu>
</template>
<script lang="ts" setup name="BasicSubMenuItem">
    import type { Menu as MenuType } from '/@/router/types';
    import { computed } from 'vue';
    import { useDesign } from '/@/hooks/web/useDesign';
    import { itemProps } from '../props';
    import BasicMenuItem from './BasicMenuItem.vue';
    import MenuItemContent from './MenuItemContent.vue';

    const props = defineProps(itemProps);
    const { prefixCls } = useDesign('basic-menu-item');
    const getShowMenu = computed(() => !props.item.meta?.hideMenu);
    function menuHasChildren(menuTreeItem: MenuType): boolean {
        return !menuTreeItem.meta?.hideChildrenInMenu && Reflect.has(menuTreeItem, 'children') && !!menuTreeItem.children && menuTreeItem.children.length > 0;
    }
</script>

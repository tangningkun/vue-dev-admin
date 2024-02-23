<template>
    <a-button v-bind="getBindValue" @click="onClick">
        <template #default="data">
            <Icon v-if="preIcon && !iconLoading" :icon="preIcon" :size="iconSize" />
            <slot v-bind="data || {}"></slot>
            <Icon v-if="postIcon && !iconLoading" :icon="postIcon" :size="iconSize" />
        </template>
    </a-button>
</template>

<script lang="ts" setup name="BasicButton">
    import { computed, unref, useAttrs, ref } from 'vue';
    import Icon from '/@/components/Icon/src/Icon.vue';
    import { buttonProps } from '../props';
    import { isFunction } from '/@/utils/is';

    const iconLoading = ref(false);

    defineOptions({
        //不自动继承 attribute
        inheritAttrs: false,
    });
    const props = defineProps(buttonProps);

    // get component class
    const attrs = useAttrs();
    const { customizeClick, customizeLoading } = unref(props);

    function onClick() {
        if (isFunction(customizeClick)) {
            if (customizeLoading ?? false) {
                iconLoading.value = true;
                Promise.all([customizeClick()]).then(() => {
                    iconLoading.value = false;
                });
            } else {
                customizeClick();
            }
        }
    }

    // get inherit binding value
    const getBindValue = computed(() => ({
        ...unref(attrs),
        ...props,
        loading: unref(iconLoading),
    }));

    // const
</script>

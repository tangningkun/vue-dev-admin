<template>
    <BasicTitle v-if="!isDetail" :class="prefixCls">
        <slot name="title"></slot>
        {{ !$slots.title ? title : '' }}
    </BasicTitle>

    <div v-else :class="[prefixCls, `${prefixCls}--detail`]">
        <span :class="`${prefixCls}__twrap`">
            <span v-if="showDetailBack" @click="handleClose">
                <ArrowLeftOutlined :class="`${prefixCls}__back`" />
            </span>
            <span v-if="title">{{ title }}</span>
        </span>

        <span :class="`${prefixCls}__toolbar`">
            <slot name="titleToolbar"></slot>
        </span>
    </div>
</template>
<script lang="ts">
    import { defineComponent } from 'vue';
    import { BasicTitle } from '/@/components/Basic';
    import { ArrowLeftOutlined } from '@ant-design/icons-vue';

    import { useDesign } from '/@/hooks/web/useDesign';

    import { propTypes } from '/@/utils/propTypes';
    export default defineComponent({
        name: 'BasicDrawerHeader',
        components: { BasicTitle, ArrowLeftOutlined },
        props: {
            isDetail: propTypes.bool,
            showDetailBack: propTypes.bool,
            title: propTypes.string,
        },
        emits: ['close'],
        setup(_, { emit }) {
            const { prefixCls } = useDesign('basic-drawer-header');

            function handleClose() {
                emit('close');
            }

            return { prefixCls, handleClose };
        },
    });
</script>

<style lang="less">
    @prefix-cls: ~'@{namespace}-basic-drawer-header';
    @footer-height: 60px;
    .@{prefix-cls} {
        display: flex;
        height: 100%;
        align-items: center;

        &__back {
            padding: 0 12px;
            cursor: pointer;

            &:hover {
                color: @themePrimaryColor;
            }
        }

        &__twrap {
            flex: 1;
        }

        &__toolbar {
            padding-right: 50px;
        }
    }
</style>

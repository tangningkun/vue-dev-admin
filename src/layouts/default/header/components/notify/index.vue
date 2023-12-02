<template>
    <div :class="prefixCls">
        <a-popover title="" trigger="click" :overlay-class-name="`${prefixCls}__overlay`">
            <a-badge :count="count" dot :number-style="numberStyle">
                <BellOutlined />
            </a-badge>
            <template #content>
                <a-tabs>
                    <template v-for="item in listData" :key="item.key">
                        <a-tab-pane>
                            <template #tab>
                                {{ item.name }}
                                <span v-if="item.list.length !== 0">({{ item.list.length }})</span>
                            </template>
                            <!-- 绑定title-click事件的通知列表中标题是“可点击”的-->
                            <NoticeList v-if="item.key === '1'" :list="item.list" @title-click="onNoticeClick" />
                            <NoticeList v-else :list="item.list" />
                        </a-tab-pane>
                    </template>
                </a-tabs>
            </template>
        </a-popover>
    </div>
</template>
<script lang="ts">
    import { computed, defineComponent, ref } from 'vue';
    import { BellOutlined } from '@ant-design/icons-vue';
    import { tabListData, ListItem } from './data';
    import NoticeList from './NoticeList.vue';
    import { useDesign } from '/@/hooks/web/useDesign';
    // import { useMessage } from '/@/hooks/web/useMessage';

    export default defineComponent({
        components: { BellOutlined, NoticeList },
        setup() {
            const { prefixCls } = useDesign('header-notify');
            // const { createMessage } = useMessage();
            const listData = ref(tabListData);

            const count = computed(() => {
                let count = 0;
                for (let i = 0; i < tabListData.length; i++) {
                    count += tabListData[i].list.length;
                }
                return count;
            });

            function onNoticeClick(record: ListItem) {
                // createMessage.success('你点击了通知，ID=' + record.id);
                // 可以直接将其标记为已读（为标题添加删除线）,此处演示的代码会切换删除线状态
                record.titleDelete = !record.titleDelete;
            }

            return {
                prefixCls,
                listData,
                count,
                onNoticeClick,
                numberStyle: {},
            };
        },
    });
</script>
<style lang="less">
    @prefix-cls: ~'@{namespace}-header-notify';

    .@{prefix-cls} {
        padding-top: 2px;

        &__overlay {
            max-width: 360px;
            min-width: 300px;
        }

        .ant-tabs-content {
            width: 300px;
        }

        .ant-badge {
            font-size: 18px;

            .ant-badge-multiple-words {
                padding: 0 4px;
            }

            svg {
                width: 0.9em;
            }
        }
    }
</style>

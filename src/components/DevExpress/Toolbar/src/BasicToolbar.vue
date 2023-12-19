<template>
    <div p-b-4>
        <a-space wrap>
            <a-space>
                <a-button type="primary">Primary</a-button>
                <a-button>secondary</a-button>
                <a-dropdown>
                    <template #overlay>
                        <a-menu @click="handleMenuClick">
                            <a-menu-item key="1">1st item</a-menu-item>
                            <a-menu-item key="2">2nd item</a-menu-item>
                            <a-menu-item key="3">3rd item</a-menu-item>
                        </a-menu>
                    </template>
                    <a-button>
                        Actions
                        <DownOutlined />
                    </a-button>
                </a-dropdown>
            </a-space>
        </a-space>
    </div>
</template>
<script lang="ts" setup name="BasicToolbar">
    import { toolbarProps } from './props';
    import { DownOutlined } from '@ant-design/icons-vue';
    const props = defineProps({ toolbarProps });
    const handleMenuClick: MenuProps['onClick'] = (e) => {
        console.log('click', e);
    };
</script>
<style lang="less"></style>

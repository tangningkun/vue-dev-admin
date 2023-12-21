<template>
    <div ref="wrapRef" :class="getWrapperClass">
        <!-- 正文 -->
        <!-- 通过v-bing来转化定义props等数据 -->
        <DxDataGrid ref="dxDataGridElRef" v-bind="getBindValues">
            <!-- 处理列信息 开始 -->
            <template v-for="column in getViewColumns" :key="column.dataField">
                <DxColumn v-bind="column"> </DxColumn>
            </template>

            <!-- 处理序号 开始 -->
            <template #indexCellTemplate="{ data }">
                <span>{{ data.rowIndex + 1 }}</span>
            </template>
            <!-- 处理序号 结束 -->

            <!-- 处理列信息 结束 -->

            <!-- 处理Boolean类型的数据显示-开始 -->
            <template #booleanCellTemplate="{ data: BooleanData }">
                <span v-if="BooleanData.value">{{ BooleanData.column.trueText }}</span>
                <span v-else>{{ BooleanData.column.falseText }}</span>
            </template>
            <!-- 处理Boolean类型的数据显示-结束 -->

            <template v-for="item in Object.keys($slots)" #[item]="data" :key="item">
                <slot :name="item" v-bind="data || {}"></slot>
            </template>
            <!-- 配置工具栏 结束 -->
        </DxDataGrid>
        <!-- 分页下拉框 -->
        <DxSelectBox v-if="true" :value="getSelectPage" :class="`${prefixCls}_page`" :items="getAllowedPageSizes" :on-value-changed="onChangedPageSize" />
    </div>
</template>
<script lang="ts">
    import { computed, defineComponent, onMounted, ref, unref, toRaw } from 'vue';
    import { DataGridProps } from './props';
    import { DxDataGrid, DxEditing, DxToolbar, DxItem, DxColumn, DxColumnChooser, DxPager } from 'devextreme-vue/data-grid';
    import DxButton from 'devextreme-vue/button';
    import DxSelectBox from 'devextreme-vue/select-box';
    import { DataGridActionType, BasicDataGridProps } from './types/data-grid';
    import { useDxDataGridEvent } from './hooks/useDataGridEvent';
    import { omit } from 'lodash-es';
    import { createTableContext } from './hooks/useDataGridContext';
    import { useDesign } from '/@/hooks/web/useDesign';
    import { useCustomizeAttributes } from './hooks/useCustomizeAttributes';
    import { useDataGridColumns } from './hooks/useDataGridColumns';
    import { useDateGridScroll } from './hooks/useDateGridScroll';
    // import { isArray } from '/@/utils/is';

    export default defineComponent({
        name: 'DataGrid',
        components: {
            DxDataGrid,
            DxEditing,
            DxSelectBox,
            DxToolbar,
            DxItem,
            DxColumn,
            DxButton,
            DxPager,
            DxColumnChooser,
        },
        props: DataGridProps,
        emits: ['register'],
        setup(props, { attrs, emit, expose }) {
            const wrapRef = ref(null);
            const dxDataGridElRef = ref(null);
            const { prefixCls } = useDesign('basic-data-grid');

            //#region 【computed计算属性[getProps|getWrapperClass]】

            // 获取Props
            const dataGridPropsRef = ref<Partial<BasicDataGridProps>>();

            const getProps = computed(() => {
                return { ...props, ...attrs, ...unref(dataGridPropsRef) } as BasicDataGridProps;
            });

            const getWrapperClass = computed(() => {
                return [prefixCls];
            });

            //#endregion

            //#region 【hooks函数处理】

            async function setProps(props: Partial<BasicDataGridProps>): Promise<void> {
                dataGridPropsRef.value = { ...unref(dataGridPropsRef), ...props, ...attrs };
            }

            const { instance, getSelectedRowsData, onCustomizeContentReady, customExportAll, customExportSelect, customExportPage, clearFilter, showColumnChooser } = useDxDataGridEvent(
                getProps,
                dxDataGridElRef
            );

            const { customizeEditingMethods } = useCustomizeAttributes(getProps);

            const { getViewColumns } = useDataGridColumns(getProps);

            const { getAllowedPageSizes, getSelectPage, getPager, getPaging } = useDateGridScroll(getProps, dxDataGridElRef, wrapRef);

            const dataGridAction: DataGridActionType = {
                setProps,
                instance,
                getSelectedRowsData,
                customExportAll,
                customExportSelect,
                customExportPage,
                clearFilter,
                showColumnChooser,
                // emit,
            };

            //#endregion

            //#region 【处理v-bind绑定数据】
            /**
             * 处理绑定数据
             */
            const getBindValues = computed(() => {
                let propsData: Recordable = {
                    // customRow,
                    ...unref(getProps),
                    ...customizeEditingMethods(),
                    columns: toRaw(unref(getViewColumns)),
                    paging: unref(getPaging),
                    onContentReady: onCustomizeContentReady(),
                };
                // propsData = omit(propsData, 'pager');
                // propsData = omit(propsData, ['pager', 'paging']);
                propsData = omit(propsData);
                return propsData;
            });
            //#endregion

            //#region 【expose暴露方法】

            /**
             * createTableContext主要是依赖注入方法
             * expose =>主要实现暴露方法
             */
            createTableContext({ ...dataGridAction, wrapRef, getBindValues });

            expose(dataGridAction);
            //#endregion

            //#region 【Emit处理】

            // emit('register', dataGridAction, formActions);

            emit('register', dataGridAction);
            //#endregion

            //#region 【生命周期函数】

            onMounted(() => {});

            //#endregion

            //#region 【内部事件，不暴露】
            // 设置默认条数
            const onChangedPageSize = (e: any) => {
                const dataGridInstance = instance();
                dataGridInstance.pageSize(e.value);
            };
            //#endregion

            //#region

            //#endregion

            return { getAllowedPageSizes, dxDataGridElRef, getSelectPage, getPager, onChangedPageSize, wrapRef, prefixCls, getWrapperClass, getBindValues, getViewColumns };
        },
    });
</script>
<style lang="less">
    @prefix-cls: ~'@{namespace}-basic-data-grid';
    @prefix-cls-page: ~'@{namespace}-basic-data-grid_page';
    .@{prefix-cls} {
        font-size: ~'@{fontSize}px';
        font-family: @fontFamily;
        // .dx-scrollable-scroll {
        //     height: 15px !important;
        // }
        //x 轴

        .@{prefix-cls-page} {
            width: 79px;
            height: 26px;
            line-height: 26px;
            margin-left: 1rem;
            position: absolute;

            .dx-texteditor-input {
                height: 24px;
                line-height: 24px;
                min-height: 24px;
            }
        }

        .dx-scrollbar-horizontal.dx-scrollbar-hoverable {
            height: 12px !important;
        }

        .dx-scrollbar-horizontal .dx-scrollable-scroll {
            height: 12px !important;
            bottom: -2px;
        }
        //y 轴
        .dx-scrollbar-vertical.dx-scrollbar-hoverable {
            width: 12px !important;
        }

        .dx-scrollbar-vertical .dx-scrollable-scroll {
            width: 12px !important;
        }

        .dx-freespace-row {
            td {
                border-left: 0 solid #4d4d4d !important;
                border-right: 0 solid #4d4d4d !important;
            }

            .dx-pointer-events-none .dx-last-cell {
                border-left-width: 0 !important;
            }
        }

        .dx-pager {
            padding-left: 1rem;
            padding-right: 1rem;
        }
    }

    .dx-pointer-events-none .dx-last-cell {
        border-left-width: 1px !important;
    }

    .dx-widget {
        font-size: ~'@{fontSize}px' !important;
        font-family: @fontFamily !important;
    }
</style>

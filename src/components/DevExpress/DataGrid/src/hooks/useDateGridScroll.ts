import { Ref, ComputedRef, ref } from 'vue';
import { computed, unref, nextTick } from 'vue';
import { getViewportOffset } from '/@/utils/domUtils';
import { useWindowSizeFn } from '/@/hooks/event/useWindowSizeFn';
import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated';
import { useDebounceFn } from '@vueuse/core';
import { BasicDataGridProps } from '../types/data-grid';
import { isEmpty } from '/@/utils/is';

export function useDateGridScroll(propsRef: ComputedRef<BasicDataGridProps>, dataGridElRef: Ref<ComponentRef>, wrapRef: Ref<HTMLElement | null>) {
    const dataGridHeightRef: Ref<Nullable<number | string>> = ref(167);
    const dataGridPageSizeRef: Ref<Nullable<number>> = ref(20);

    // Greater than animation time 280
    const debounceRedoHeight = useDebounceFn(redoHeight, 100);

    const getCanResize = computed(() => {
        const { customizeResizeHeight, customizeScroll } = unref(propsRef);
        return customizeResizeHeight && !(customizeScroll || {}).y;
    });

    /**
     * 监听页面变化时 列表重新计算高度&页数
     */
    useWindowSizeFn(calcDataGridHeight, 280);

    function redoHeight() {
        nextTick(() => {
            calcDataGridHeight();
        });
    }
    /**
     * 设置高度
     * @param height
     */
    function setHeight(height: number) {
        dataGridHeightRef.value = height;
    }
    /**
     * 设置分页条数
     * @param height
     */
    function setPageSize(pageSize: number) {
        dataGridPageSizeRef.value = pageSize;
    }
    async function calcDataGridHeight() {
        const { customizeCanResizeParent, customizeEnableTabPane } = unref(propsRef);

        const dataGrid = unref(dataGridElRef);
        if (!dataGrid) {
            return;
        }

        const dataGridEl: HTMLElement = dataGrid.$el;
        if (!dataGridEl) {
            return;
        }

        dataGridEl!.style.height = 'unset';

        if (!unref(getCanResize)) {
            return;
        }
        await nextTick();
        // DataGrid height from bottom height-custom offset

        let dataGridActionEl: HTMLElement | null = null;
        const dateGridHeaderHeight = 65;
        const dateGridPagerHeight = 57;
        const paddingBottomHeight = 16;
        let bottomIncludeBody = 0;
        let rightIncludeBody = 0;

        if (unref(wrapRef) && customizeCanResizeParent) {
            /* empty */
            //TODO:使用场景暂无示例，暂不提供
        } else if (dataGridEl.offsetParent !== null) {
            const res = getViewportOffset(dataGridEl);
            bottomIncludeBody = res.bottomIncludeBody;
            rightIncludeBody = res.rightIncludeBody;
        } else {
            //TODO:Tab列表被隐藏 unref(wrapRef)
            const wrapRefEl = unref(wrapRef) as HTMLElement;
            const El = (wrapRefEl.parentElement as HTMLElement).parentElement as HTMLElement;
            dataGridActionEl = (El.querySelector('.ant-tabs-tabpane-active') as HTMLElement).querySelector('.dx-widget') as HTMLElement;
            const res = getViewportOffset(dataGridActionEl);
            bottomIncludeBody = res.bottomIncludeBody;
            rightIncludeBody = res.rightIncludeBody;
        }

        const height = bottomIncludeBody - paddingBottomHeight;

        setHeight(height);

        const loadingEl = (dataGridActionEl === null ? dataGridEl : dataGridActionEl).querySelector('.dx-loadpanel-content') as HTMLElement;
        if (loadingEl) {
            loadingEl.style.transform = `translate(${Math.floor((rightIncludeBody - 216) / 2)}px, ${Math.floor((height - 90) / 2)}px)`;
        }
        let pageElStyleBottom = 0;
        const pagerEl = (dataGridActionEl === null ? dataGridEl : dataGridActionEl).querySelector('.dx-datagrid-pager') as HTMLElement;
        const pagersEl = pagerEl.querySelector('.dx-pages') as HTMLElement;
        const pageEl = unref(wrapRef)?.querySelector('.dev-basic-data-grid_page') as HTMLElement;
        if (pagerEl && pagersEl && pageEl) {
            pageElStyleBottom = (pagerEl.offsetHeight - pagersEl.offsetHeight) / 2;
            if (customizeEnableTabPane) {
                pageEl.style.bottom = `${pageElStyleBottom}px`;
            } else {
                pageEl.style.bottom = `${paddingBottomHeight + pageElStyleBottom}px`;
            }
        }

        const pageSize = (height - dateGridHeaderHeight - dateGridPagerHeight) / (pageElStyleBottom > 7 ? 31 : 26);
        setPageSize(Math.floor(pageSize));
        (dataGridEl as HTMLElement)!.style.height = `${height}px`;
    }

    onMountedOrActivated(() => {
        calcDataGridHeight();
        nextTick(() => {
            debounceRedoHeight();
        });
    });
    const getScrollRef = computed(() => {
        const dataGridHeight = unref(dataGridHeightRef);
        const { customizeResizeHeight, customizeScroll } = unref(propsRef);
        return {
            x: 0,
            y: customizeResizeHeight ? dataGridHeight : null,
            ...customizeScroll,
        };
    });
    /**
     * 计算分页集合
     */
    const getPageSizes = computed(() => {
        const { pager } = unref(propsRef);
        const pageSizes = pager?.allowedPageSizes as Array<number>;
        const dataGridPageSize = unref(dataGridPageSizeRef);
        if (!isEmpty(dataGridPageSize) && !pageSizes.includes(dataGridPageSize)) {
            pageSizes.push(dataGridPageSize);
            pageSizes.sort(function (a: number, b: number) {
                return a - b;
            });
        }
        return pageSizes;
    });
    /**
     * 分页信息
     */
    const getPaging = computed(() => {
        const dataGridPageSize = unref(dataGridPageSizeRef);
        const { paging } = unref(propsRef);
        return {
            ...paging,
            pageSize: dataGridPageSize,
        };
    });

    const getPager = computed(() => {
        const { pager } = unref(propsRef);
        return {
            ...pager,
        };
    });

    /**
     * 计算当前页大小
     */
    const getSelectPage = computed(() => {
        const dataGridPageSize = unref(dataGridPageSizeRef);
        return dataGridPageSize;
    });
    return { getPageSizes, getSelectPage, getPager, getPaging, getScrollRef, redoHeight };
}

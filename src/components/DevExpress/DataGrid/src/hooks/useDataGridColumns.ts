import { cloneDeep } from 'lodash-es';
import { computed, ComputedRef, ref, Ref, unref, watch } from 'vue';
import { CustomizeColumns, BasicDataGridProps } from '../types/data-grid';
// import { INDEX_COLUMN_FLAG } from '/@/components/Table/src/const';
import { useI18n } from '/@/hooks/web/useI18n';
const { t } = useI18n();

export const INDEX_COLUMN_FLAG = 'INDEX';
/**
 * 重载列信息
 */
export function useDataGridColumns(propsRef: ComputedRef<BasicDataGridProps>) {
    const columnsRef = ref(unref(propsRef).customizeColumn) as unknown as Ref<Array<CustomizeColumns>>;

    const getViewColumns = computed(() => {
        const columns = cloneDeep(unref(columnsRef));
        handleIndexColumn(propsRef, columns);
        if (!columns) {
            return [];
        }
        return columns.map((column) => {
            column = handleColumnsItem(column);
            return column;
        });
    });

    watch(
        () => unref(propsRef).customizeColumn,
        (customizeColumn) => {
            columnsRef.value = customizeColumn;
        }
    );

    return {
        getViewColumns,
    };
}
function handleIndexColumn(propsRef: ComputedRef<BasicDataGridProps>, columns: Array<CustomizeColumns>) {
    const { showIndexColumn } = unref(propsRef);
    if (showIndexColumn) {
        const IndexColumn: CustomizeColumns = {
            flag: INDEX_COLUMN_FLAG,
            dataField: 'DataGridXh',
            width: 50,
            minWidth: 50,
            caption: t('routes.demo.devextreme.dataGrid.serialNumber'), //标题
            alignment: 'center',
            dataType: 'string',
            allowEditing: false,
            fixedPosition: 'left',
            fixed: true,
            allowFiltering: false,
            allowSorting: false,
            allowHeaderFiltering: false,
            allowReordering: false,
            cellTemplate: 'indexCellTemplate',
        };
        columns.unshift(IndexColumn);
    }
}

/**
 * 处理列明细信息
 * @param item
 * @returns
 */
function handleColumnsItem(item: CustomizeColumns): CustomizeColumns {
    if (item.flag === INDEX_COLUMN_FLAG) {
        return item;
    }
    item.caption = t(item.caption || '');
    // dataType:'string' | 'number' | 'date' | 'boolean' | 'object' | 'datetime';
    switch (item.dataType) {
        case 'string': {
            item.alignment = 'left';
            break;
        }
        case 'number': {
            item.alignment = 'right';
            break;
        }
        // case 'time': {
        //   item.alignment = 'right';
        //   item.format = 'HH:mm:ss';
        //   break;
        // }
        case 'date': {
            item.alignment = 'right';
            item.format = 'yyyy-MM-dd';
            item.minWidth = 180;
            break;
        }
        case 'datetime': {
            item.alignment = 'right';
            item.format = 'yyyy-MM-dd HH:mm:ss';
            item.minWidth = 180;
            break;
        }
        case 'boolean': {
            item.alignment = 'center';
            item.cellTemplate = 'booleanCellTemplate';
            break;
        }
        case 'object': {
            item.alignment = 'left';
            break;
        }
        default: {
            item.alignment = 'left';
            break;
        }
    }
    return item;
}

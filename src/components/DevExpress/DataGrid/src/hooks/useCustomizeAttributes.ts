import { ComputedRef, unref } from 'vue';
import { CustomizeEditing, BasicDataGridProps } from '../types/data-grid';
import { isEmpty } from '/@/utils/is';

interface Editing {
    /**
     * 自定义编辑是否启用
     */
    customizeEnableEditing: boolean;
    /**
     * 自定义编辑模式
     * type:'batch' | 'cell' | 'row' | 'form' | 'popup'
     */
    customizeEditingMode: 'batch' | 'cell' | 'row' | 'form' | 'popup';
    /**
     * 自定义编辑事件属性
     */
    customizeEditing: CustomizeEditing;
}

/**
 * 自定义编辑属性
 * @param getProps
 * @returns
 */
export function useCustomizeAttributes(getProps: ComputedRef<BasicDataGridProps>) {
    function customizeEditingMethods(): Editing {
        const { customizeEnableEditing, customizeEditingMode, customizeEditing } = unref(getProps);
        let newCustomizeEditing: CustomizeEditing = {};
        if (customizeEnableEditing) {
            /**
             * 返回新的编辑属性
             */
            if (!isEmpty(customizeEditing)) {
                newCustomizeEditing = {
                    allowAdding: true,
                    allowDeleting: true,
                    allowUpdating: true,
                    mode: customizeEditingMode,
                    newRowPosition: 'pageBottom',
                    useIcons: true, //是否使用图标
                };
            } else {
                newCustomizeEditing = customizeEditing;
            }
        }
        return {
            customizeEnableEditing: customizeEnableEditing,
            customizeEditingMode: customizeEditingMode,
            customizeEditing: newCustomizeEditing,
        };
    }

    return {
        customizeEditingMethods,
    };
}

/**
 * @ Author: TANGNK
 * @ Create Time: 2024-02-06 11:09:56
 * @ Modified by: TANGNK
 * @ Modified time: 2024-02-29 11:09:29
 * @ Description: 低代码设计(draggable)方法
 */
import { cloneDeep } from 'lodash-es';
import { buildRandomID } from '/@/utils/uuid';

export function useBasicDesignMethod() {
    /**
     *
     * @param evt
     * @param originalEvent
     * @returns
     */
    const onCheckMove = (_evt, _originalEvent) => {
        // if (!!evt.draggedContext && !!evt.draggedContext.element) {
        //     // const wgCategory = evt.draggedContext.element.category;
        //     const fieIdtype = evt.draggedContext.element.type + '';
        //     if (evt.to) {
        //         if (evt.to.className === 'sub-form-table' && fieIdtype === 'slot') {
        //             //this.$message.info(this.vueInstance.i18nt('designer.hint.onlyFieldWidgetAcceptable'))
        //             return false;
        //         }
        //     }
        // }

        return true;
    };
    /**
     *
     * @param original
     * @returns
     */
    const onCloneField = (original) => {
        const newWidget = cloneDeep(original);
        const tempId = buildRandomID();
        newWidget.id = `${newWidget.type.replace(/-/g, '')}_${tempId}`;
        newWidget.options.name = newWidget.id;
        newWidget.options.label = newWidget.options.label || newWidget.type.toLowerCase();
        delete newWidget.displayName;
        return newWidget;
    };
    /**
     *
     */
    const onDragAdd = (_evt: any) => {
        // console.log('onDragAdd==>', evt);
    };
    /**
     *
     * @param evt
     */
    const onDragUpdate = (_evt: any) => {
        // console.log('onDragUpdate==>', evt);
    };
    /**
     *
     * @param evt
     */
    const onDragEnd = (_evt: any) => {
        // console.log('onDragEnd==>', evt);
    };
    return { onCheckMove, onCloneField, onDragAdd, onDragUpdate, onDragEnd };
}

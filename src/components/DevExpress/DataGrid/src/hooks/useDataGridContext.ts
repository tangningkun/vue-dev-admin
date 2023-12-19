import type { Ref } from 'vue';
import type { BasicDataGridProps, DataGridActionType } from '../types/data-grid';
import { provide, inject, ComputedRef } from 'vue';

const key = Symbol('devextreme-datagrid');

type Instance = DataGridActionType & {
    wrapRef?: Ref<Nullable<HTMLElement>>;
    getBindValues?: ComputedRef<Recordable>;
};

type RetInstance = Omit<Instance, 'getBindValues'> & {
    getBindValues: ComputedRef<BasicDataGridProps>;
};

export function createTableContext(instance: Instance) {
    provide(key, instance);
}

export function useTableContext(): RetInstance {
    return inject(key) as RetInstance;
}

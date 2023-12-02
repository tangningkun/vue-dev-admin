import { CSSProperties, VNodeChild } from 'vue';
import { createTypes, toValidableType, VueTypeValidableDef, VueTypesInterface } from 'vue-types';

export type VueNode = VNodeChild | JSX.Element;

interface PropTypes extends VueTypesInterface {
    readonly style: VueTypeValidableDef<CSSProperties>;
    readonly VNodeChild: VueTypeValidableDef<VueNode>;
    // readonly trueBool: VueTypeValidableDef<boolean>;
}

const createPropCreateTypes: PropTypes = createTypes({
    func: undefined,
    bool: undefined,
    string: undefined,
    number: undefined,
    object: undefined,
    integer: undefined,
}) as PropTypes;

export class propTypes extends createPropCreateTypes {
    static get style() {
        return toValidableType('style', {
            type: [String, Object],
            default: undefined,
        });
    }
    static get VNodeChild() {
        return toValidableType('VNodeChild', {
            type: undefined,
        });
    }
}

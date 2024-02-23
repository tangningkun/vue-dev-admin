/**
 * 基础组件
 */
export const basisFields: Array<any> = [
    {
        type: 'input',
        icon: 'design-input-field|svg',
        formItemFlag: true,
        options: {
            name: '',
            label: '',
        },
    },

    {
        type: 'textarea',
        icon: 'design-textarea-field|svg',
        formItemFlag: true,
        options: {
            name: '',
            label: '',
        },
    },

    {
        type: 'number',
        icon: 'design-number-field|svg',
        formItemFlag: true,
        options: {
            name: '',
            label: '',
        },
    },

    {
        type: 'radio',
        icon: 'design-radio-field|svg',
        formItemFlag: true,
        options: {
            name: '',
            label: '',
        },
    },

    {
        type: 'checkbox',
        icon: 'design-checkbox-field|svg',
        formItemFlag: true,
        options: {
            name: '',
            label: '',
        },
    },

    {
        type: 'select',
        icon: 'design-select-field|svg',
        formItemFlag: true,
        options: {
            name: '',
            label: '',
        },
    },

    {
        type: 'time',
        icon: 'design-time-field|svg',
        formItemFlag: true,
        options: {
            name: '',
            label: '',
        },
    },

    {
        type: 'time-range',
        icon: 'design-time-range-field|svg',
        formItemFlag: true,
        options: {
            name: '',
            label: '',
        },
    },

    {
        type: 'date',
        icon: 'design-date-field|svg',
        formItemFlag: true,
        options: {
            name: '',
            label: '',
        },
    },

    {
        type: 'date-range',
        icon: 'design-date-range-field|svg',
        formItemFlag: true,
        options: {
            name: '',
            label: '',
        },
    },

    {
        type: 'switch',
        icon: 'design-switch-field|svg',
        formItemFlag: true,
        options: {
            name: '',
            label: '',
        },
    },

    {
        type: 'rate',
        icon: 'design-rate-field|svg',
        formItemFlag: true,
        options: {
            name: '',
            label: '',
        },
    },

    {
        type: 'color',
        icon: 'design-color-field|svg',
        formItemFlag: true,
        options: {
            name: '',
            label: '',
        },
    },

    {
        type: 'slider',
        icon: 'design-slider-field|svg',
        formItemFlag: true,
        options: {
            name: '',
            label: '',
        },
    },

    {
        type: 'button',
        icon: 'design-button-field|svg',
        formItemFlag: false,
        options: {
            name: '',
            label: '',
        },
    },

    {
        type: 'divider',
        icon: 'design-divider-field|svg',
        formItemFlag: false,
        options: {
            name: '',
            label: '',
        },
    },
];

/**
 * 新增属性
 * @param attribute
 */
export function addBasisFields(attribute: any) {
    basisFields.push(attribute);
}

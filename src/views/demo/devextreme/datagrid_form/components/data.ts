import { CustomizeColumns } from '../../../../../components/devextreme/dexextreme-datagrid';

export const columns: Array<CustomizeColumns> = [
    {
        dataField: 'id',
        caption: '员工Id',
        dataType: 'number',
        // editCellTemplate: 'dropDownBoxEditor',
    },
    {
        dataField: 'code',
        caption: '员工编码',
        dataType: 'string',
        // editCellTemplate: 'dropDownBoxEditor',
    },
    {
        dataField: 'sex',
        caption: '性别',
        dataType: 'boolean',
        // editCellTemplate: 'dropDownBoxEditor',
        trueText: '男',
        falseText: '女',
    },
    {
        dataField: 'name',
        caption: '员工编码',
        dataType: 'string',
        // editCellTemplate: 'dropDownBoxEditor',
    },
    {
        dataField: 'departmentId',
        caption: '部门Id',
        dataType: 'number',
        cellTemplate: 'depatentCellTemplate',
        editCellTemplate: 'dropDownBoxEditor',
    },
    {
        dataField: 'departmentCode',
        caption: '部门编码',
        dataType: 'string',
        visible: false,
        editCellTemplate: 'dropDownBoxEditor',
    },
    {
        dataField: 'departmentName',
        caption: '部门名称',
        dataType: 'string',
        // editCellTemplate: 'dropDownBoxEditor',
    },
    {
        dataField: 'ruleId',
        caption: '角色Id',
        dataType: 'number',
        // editCellTemplate: 'dropDownBoxEditor',
    },
    {
        dataField: 'ruleCoe',
        caption: '角色编码',
        dataType: 'string',
        // editCellTemplate: 'dropDownBoxEditor',
    },
    {
        dataField: 'ruleName',
        caption: '角色名称',
        dataType: 'string',
        // editCellTemplate: 'dropDownBoxEditor',
    },
    {
        dataField: 'createTime',
        caption: '创建时间',
        dataType: 'datetime',
        // editCellTemplate: 'dropDownBoxEditor',
    },
];

export const tableData = [
    {
        id: 1,
        code: 'E001',
        name: '朱娟',
        departmentId: '1',
        departmentCode: 'D001',
        departmentName: '研发部',
        ruleId: '1',
        ruleCoe: 'R0001',
        ruleName: '管理员',
        createTime: new Date(),
        sex: false,
    },
    {
        id: 2,
        code: 'E002',
        name: '叶杰',
        departmentId: '1',
        departmentCode: 'D001',
        departmentName: '研发部',
        ruleId: '1',
        ruleCoe: 'R0001',
        ruleName: '管理员',
        createTime: new Date(),
        sex: true,
    },
    {
        id: 3,
        code: 'E003',
        name: '钱丽',
        departmentId: '2',
        departmentCode: 'D002',
        departmentName: '综合部',
        ruleId: '1',
        ruleCoe: 'R0001',
        ruleName: '管理员',
        createTime: new Date(),
        sex: false,
    },
    {
        id: 4,
        code: 'E004',
        name: '黄平',
        departmentId: '2',
        departmentCode: 'D002',
        departmentName: '综合部',
        ruleId: '1',
        ruleCoe: 'R0001',
        ruleName: '管理员',
        createTime: new Date(),
        sex: true,
    },
    {
        id: 5,
        code: 'E005',
        name: '康秀英',
        departmentId: '3',
        departmentCode: 'D003',
        departmentName: '企管部',
        ruleId: '1',
        ruleCoe: 'R0001',
        ruleName: '管理员',
        createTime: new Date(),
        sex: false,
    },
    {
        id: 6,
        code: 'E006',
        name: '吕娟',
        departmentId: '3',
        departmentCode: 'D003',
        departmentName: '企管部',
        ruleId: '1',
        ruleCoe: 'R0001',
        ruleName: '管理员',
        createTime: new Date(),
        sex: false,
    },
    {
        id: 7,
        code: 'E007',
        name: '江静',
        departmentId: '4',
        departmentCode: 'D004',
        departmentName: '采购部',
        ruleId: '1',
        ruleCoe: 'R0001',
        ruleName: '管理员',
        createTime: new Date(),
        sex: false,
    },
    {
        id: 8,
        code: 'E008',
        name: '魏勇',
        departmentId: '4',
        departmentCode: 'D004',
        departmentName: '采购部',
        ruleId: '1',
        ruleCoe: 'R0001',
        ruleName: '管理员',
        createTime: new Date(),
        sex: true,
    },
    {
        id: 9,
        code: 'E009',
        name: '黎霞',
        departmentId: '5',
        departmentCode: 'D005',
        departmentName: '销售部',
        ruleId: '1',
        ruleCoe: 'R0001',
        ruleName: '管理员',
        createTime: new Date(),
        sex: false,
    },
    {
        id: 10,
        code: 'E010',
        name: '万超',
        departmentId: '5',
        departmentCode: 'D005',
        departmentName: '销售部',
        ruleId: '1',
        ruleCoe: 'R0001',
        ruleName: '管理员',
        createTime: new Date(),
        sex: true,
    },
];

export const department = [
    {
        id: '1',
        code: 'D001',
        name: '研发部',
    },
    {
        id: '2',
        code: 'D002',
        name: '综合部',
    },
    {
        id: '3',
        code: 'D003',
        name: '企管部',
    },
    {
        id: '4',
        code: 'D004',
        name: '采购部',
    },
    {
        id: '5',
        code: 'D005',
        name: '销售部',
    },
    {
        id: '6',
        code: 'D006',
        name: '实施部',
    },
    {
        id: '7',
        code: 'D007',
        name: '测试部',
    },
];

export const customizeColumn = [
    {
        dataField: 'id',
        caption: '部门Id',
        dataType: 'number',
        // editCellTemplate: 'dropDownBoxEditor',
    },
    {
        dataField: 'code',
        caption: '部门编码',
        dataType: 'number',
        // editCellTemplate: 'dropDownBoxEditor',
    },
    {
        dataField: 'name',
        caption: '部门名称',
        dataType: 'number',
        // editCellTemplate: 'dropDownBoxEditor',
    },
];

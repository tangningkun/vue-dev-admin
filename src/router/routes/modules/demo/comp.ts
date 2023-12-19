import type { AppRouteModule } from '/@/router/types';

import { getParentLayout, LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const comp: AppRouteModule = {
    path: '/comp',
    name: 'Comp',
    component: LAYOUT,
    redirect: '/comp/basic',
    meta: {
        orderNo: 30,
        icon: 'ion:layers-outline',
        title: t('routes.demo.comp.comp'),
    },

    children: [
        {
            path: 'devextreme',
            name: 'devextremeDemo',
            redirect: '/comp/devextreme/basic',
            component: getParentLayout('devextremeDemo'),
            meta: {
                // icon: 'mdi:form-select',
                title: t('routes.demo.devextreme.devextreme'),
            },
            children: [
                {
                    path: 'dataGridDemo01',
                    name: 'dataGridDemo01',
                    component: () => import('/@/views/demo/devextreme/datagrid/dataGridDemo01.vue'),
                    meta: {
                        title: t('routes.demo.devextreme.dataGridDemo02'),
                    },
                },
                {
                    path: 'dataGridDemo02',
                    name: 'dataGridDemo02',
                    component: () => import('/@/views/demo/devextreme/datagrid/dataGridDemo02.vue'),
                    meta: {
                        title: t('routes.demo.devextreme.dataGridDemo03'),
                    },
                },
                // {
                //   path: 'RowEditDataGridDemo',
                //   name: 'RowEditDataGridDemo',
                //   component: () => import('/@/views/demo/devextreme/datagrid/RowEditDataGridDemo.vue'),
                //   meta: {
                //     title: t('routes.demo.devextreme.rowEditDataGrid'),
                //   },
                // },
                // {
                //   path: 'CellEditDataGridDemo',
                //   name: 'CellEditDataGridDemo',
                //   component: () => import('/@/views/demo/devextreme/datagrid/CellEditDataGridDemo.vue'),
                //   meta: {
                //     title: t('routes.demo.devextreme.cellEditDataGrid'),
                //   },
                // },
                // {
                //   path: 'CustomDataGridDemo',
                //   name: 'CustomDataGridDemo',
                //   component: () => import('/@/views/demo/devextreme/datagrid/CustomDataGridDemo.vue'),
                //   meta: {
                //     title: t('routes.demo.devextreme.customEditDataGrid'),
                //   },
                // },
                {
                    path: 'form',
                    name: 'formdemo',
                    component: () => import('/@/views/demo/devextreme/form/formdemo.vue'),
                    meta: {
                        title: t('routes.demo.devextreme.formdemo'),
                    },
                },
                {
                    path: 'formDemo02',
                    name: 'formDemo02',
                    component: () => import('/@/views/demo/devextreme/form/formDemo02.vue'),
                    meta: {
                        title: t('routes.demo.devextreme.formdemo02'),
                    },
                },
                {
                    path: 'datagrid_form',
                    name: 'datagrid_form',
                    component: () => import('/@/views/demo/devextreme/datagrid_form/index.vue'),
                    meta: {
                        title: t('routes.demo.devextreme.datagrid_form'),
                    },
                },
                {
                    path: 'FormMakingV3',
                    name: 'FormMakingV3',
                    component: () => import('/@/views/demo/devextreme/form-making-v3/index.vue'),
                    meta: {
                        title: 'FormMakingV3',
                    },
                },
            ],
        },
        {
            path: 'dataGrid',
            name: 'dataGridDem0',
            redirect: '/comp/dataGrid/basic',
            component: getParentLayout('TableDemo'),
            meta: {
                // icon: 'carbon:table-split',
                title: t('routes.demo.DataGrid.DataGrid'),
            },

            children: [
                {
                    path: 'basic',
                    name: 'DataGridBasicDemo',
                    component: () => import('/@/views/demo/dataGrid/Basic.vue'),
                    meta: {
                        title: t('routes.demo.DataGrid.BasicDataGrid'),
                    },
                },
            ],
        },
    ],
};

export default comp;

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
            path: 'DataGridDemo',
            name: 'DataGridDemo',
            redirect: '/comp/dataGrid/basic',
            component: getParentLayout('TableDemo'),
            meta: {
                icon: 'material-symbols:table-sharp',
                title: t('routes.demo.DataGrid.DataGrid'),
            },

            children: [
                {
                    path: 'BasicDataGrid',
                    name: 'BasicDataGrid',
                    component: () => import('/@/views/demo/BasicDataGrid/index.vue'),
                    meta: {
                        icon: 'material-symbols:table-sharp',
                        title: t('routes.demo.DataGrid.BasicDataGrid'),
                    },
                },
                {
                    path: 'TabDataGrid',
                    name: 'TabDataGrid',
                    component: () => import('/@/views/demo/TabDataGrid/index.vue'),
                    meta: {
                        icon: 'material-symbols:table-sharp',
                        title: t('routes.demo.DataGrid.TabDataGrid'),
                    },
                },
            ],
        },
    ],
};

export default comp;

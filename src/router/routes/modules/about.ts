import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
    path: '/about',
    name: 'About',
    component: LAYOUT,
    redirect: '/about/index',
    meta: {
        hideChildrenInMenu: true,
        icon: 'mdi:about-circle-outline',
        title: t('routes.dashboard.about'),
        orderNo: 100000,
    },
    children: [
        {
            path: 'index',
            name: 'AboutPage',
            component: () => import('/@/views/sys/about/index.vue'),
            meta: {
                title: t('routes.dashboard.about'),
                icon: 'mdi:about-circle-outline',
                hideMenu: true,
            },
        },
    ],
};

export default dashboard;

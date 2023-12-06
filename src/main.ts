import '/@/styles/index.less';
import 'virtual:uno.css';
// import 'default-passive-events';
import { createApp } from 'vue';
import App from './App.vue';
import { setupStore } from '/@/store';
import { setupRouterGuard } from '/@/router/guard';
import { router, setupRouter } from '/@/router';
//router,
import { initAppConfigStore } from './logics/initAppConfig';
import { setupI18nAsync } from './locales/setupI18n';
import { setupGlobDirectives } from './directives';
import { setupErrorHandle } from './logics/error-handle';

async function bootstrapApp() {
    const app = createApp(App);

    //配置 store
    setupStore(app);

    // 初始化内部系统配置
    await initAppConfigStore();

    // // Register global components
    // registerGlobComp(app);

    //多语言配置
    //异步情况：可以从服务器端获取语言文件
    await setupI18nAsync(app);

    // Configure routing 配置路由
    setupRouter(app);

    // router-guard 路由守卫
    setupRouterGuard(router);

    // // Register global directive
    setupGlobDirectives(app);

    // // Configure global error handling
    setupErrorHandle(app);

    // https://next.router.vuejs.org/api/#isready
    // await router.isReady();

    app.mount('#app');
}

await bootstrapApp();

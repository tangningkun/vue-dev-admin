import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';

// const modules = import.meta.globEager('./**/*.ts');
const modules: any = import.meta.glob('./**/*.ts', { eager: true });

const mockModules: any[] = [];
Object.keys(modules).forEach((key) => {
    if (key.includes('/_')) {
        return;
    }
    mockModules.push(...modules[key].default);
});

/**
 * 用于生产环境。需要手动导入所有模块
 */
export function setupProdMockServer() {
    createProdMockServer(mockModules);
}

/*
 * @Author: czx
 * @Date: 2022-05-21 09:22:35
 * @LastEditTime: 2022-05-22 10:46:08
 * @LastEditors: czx
 * @Description: umi的配置文件
 */
import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/login' },
    {path:"/login",component:"@/pages/login"},
    {path:"/record",component:"@/pages/study-record"},
  ],
  fastRefresh: {},
});

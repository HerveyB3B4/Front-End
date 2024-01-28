import { createRouter, createWebHistory } from "vue-router";

import HomeVue from "../pages/Home.vue";
import TestVue from "../pages/Test.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: HomeVue,
        meta: {
            title: '说明页面',
        },
    },
    {
        path: "/test",
        name: "Test",
        component: TestVue,
        meta: {
            title: '测试页面',
        },
    }
    // TODO: 需要完善路由
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

// TODO: 路由守卫

export default router;
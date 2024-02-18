import { createRouter, createWebHistory } from "vue-router";

import HomeVue from "../pages/Home.vue";
import TestVue from "../pages/Test.vue";

import SquareMainVue from "../pages/square/main.vue";
import SquareHomeVue from "../pages/square/home.vue";
import SquareNewVue from "../pages/square/new.vue";
import SquareShowVue from "../pages/square/show.vue";

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
    },
    // TODO: 需要完善路由
    // 话题广场部分
    {
        path: "/square",
        name: "Square",
        component: SquareMainVue,
        children: [
            {
                path: "",
                name: "SquareMain",
                component: SquareHomeVue,
                meta: {
                    title: '话题广场',
                },
            },
            {
                path: "new",
                name: "SquareNew",
                component: SquareNewVue,
                meta: {
                    title: '新建话题',
                },
            },
            {
                path: "show/:topicID",
                name: "SquareShow",
                component: SquareShowVue,
                meta: {
                    title: '话题详情',
                },
                props: true,
            }
        ]
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

// TODO: 路由守卫

export default router;
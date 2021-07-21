import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/blogs",
            name: "blogs",
            component: () => import("@/view/pages/blogs/List"),
            children: [
                {
                    path: "/blogs",
                    name: "blogs",
                    component: () => import("@/view/pages/blogs/List"),

                }
            ]
        },
        {
            path: "/login",
            component: () => import("@/view/pages/auth/login_pages/Login-1"),
            children: [
                {
                    name: "login",
                    path: "/login",
                    component: () => import("@/view/pages/auth/login_pages/Login-1")
                },
            ]
        },
    ]
});

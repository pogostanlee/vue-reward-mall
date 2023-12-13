import { createRouter, createWebHistory } from "vue-router";
//导入登录页面
import Login from "@/views/Login.vue";
//导入主页页面
import LayoutVue from "@/views/Layout.vue";
//修改密码页面
import ResetPassword from "@/views/user/ResetPassword.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //欢迎页
    {
      path: "/",
      redirect: "/login",
    },
    //登录页面
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    //主页页面
    {
      path: "/layout/:number",
      name: "layout",
      component: LayoutVue,
      children: [
        {
          path: "/user/resetPassword",
          name: "resetPassword",
          component: ResetPassword,
        },
      ],
    },
  ],
});

export default router;

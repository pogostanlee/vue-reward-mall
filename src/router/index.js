import { createRouter, createWebHistory } from "vue-router";
//导入登录页面
import Login from "@/views/Login.vue";
//导入主页页面
import LayoutVue from "@/views/Layout.vue";
//修改密码页面
import ResetPassword from "@/views/user/ResetPassword.vue";
//客户信息页面
import Customer from "@/views/customer/customer.vue";
//存款登录页面
import Deposit from "@/views/deposit/deposit.vue";
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
      redirect: "/customer",
      children: [
        {
          path: "/user/resetPassword",
          name: "resetPassword",
          component: ResetPassword,
        },
        {
          path: "/customer",
          name: "customer",
          component: Customer,
        },
        {
          path: "/deposit",
          name: "deposit",
          component: Deposit,
        },
      ],
    },
  ],
});

export default router;

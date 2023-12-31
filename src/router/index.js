import { createRouter, createWebHistory } from "vue-router";
//导入登录页面
import Login from "@/views/Login.vue";
//导入主页页面
import LayoutVue from "@/views/Layout.vue";
//修改密码页面
import ResetPassword from "@/views/user/ResetPassword.vue";
//客户信息页面
import Customer from "@/views/customer/customer.vue";
//存款页面
import Deposit from "@/views/deposit/deposit.vue";
//奖品兑换登录页
import ProductLogin from "@/views/product/productLogin.vue";
//奖品兑换页面
import Product from "@/views/product/product.vue";
//奖品兑换记录详情页
import ProductDetail from "@/views/product/productDetail.vue";
//商品库存页面
import ProductInventory from "@/views/product/productInventory.vue";
//商品入库记录详情页
import ProductRecord from "@/views/product/productRecord.vue";
//后台客户信息页面
import AdminCustomer from "@/views/admin/adminCustomer.vue";
//后台礼品管理页面
import AdminProduct from "@/views/admin/adminProduct.vue";
//后台礼品库存页面
import AdminInventory from "@/views/admin/adminInventory.vue";
//后台存款详情页面
import AdminDeposit from "@/views/admin/adminDeposit.vue";
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
      // redirect: "/customer",
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
        {
          path: "/productLogin",
          name: "productLogin",
          component: ProductLogin,
        },
        {
          path: "/product",
          name: "product",
          component: Product,
        },
        {
          path: "/ProductDetail",
          name: "ProductDetail",
          component: ProductDetail,
        },
        {
          path: "/productRecord",
          name: "productRecord",
          component: ProductRecord,
        },
        {
          path: "/productInventory",
          name: "productInventory",
          component: ProductInventory,
        },
        {
          path: "/adminCustomer",
          name: "adminCustomer",
          component: AdminCustomer,
        },
        {
          path: "/adminProduct",
          name: "adminProduct",
          component: AdminProduct,
        },
        {
          path: "/adminInventory",
          name: "adminInventory",
          component: AdminInventory,
        },
        {
          path: "/adminDeposit",
          name: "adminDeposit",
          component: AdminDeposit,
        },
      ],
    },
  ],
});

export default router;

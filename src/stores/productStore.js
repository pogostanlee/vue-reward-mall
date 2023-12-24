import { ref } from "vue";
import { defineStore } from "pinia";
import { getcustomerAPI, getProductListAPI, exchangeAPI } from "@/apis/product";
import router from "@/router";
export const useProductStore = defineStore(
  "product",
  () => {
    //定义客户数据
    const customerInfo = ref({});
    //定义商品数据
    const productList = ref([]);
    //根据身份证查询客户信息
    const getCustomer = async (formData) => {
      let res = await getcustomerAPI(formData);
      //状态判断
      if (res.code === 1) {
        ElMessage({
          message: res.message,
          type: "warning",
        });
      }
      if (res.code === 0) {
        customerInfo.value = res.data;
        //跳转添加页面
        router.push("/product");
      }
    };
    //获取商品列表
    const getProductList = async () => {
      //发送请求
      let res = await getProductListAPI();
      productList.value = res.data;
    };
    //兑换礼品
    const exchange = async (formData) => {
      //发送请求
      let res = await exchangeAPI(formData);
      //状态判断
      if (res.code === 1) {
        ElMessage({
          message: res.message,
          type: "warning",
        });
      }
      if (res.code === 0) {
        ElMessage({
          message: res.message,
          type: "success",
        });
        //跳转礼物兑换详情页面
        router.push("/productList");
      }
    };

    return {
      customerInfo,
      getCustomer,
      getProductList,
      productList,
      exchange,
    };
  },
  {
    persist: true, //持久化存储
  }
);

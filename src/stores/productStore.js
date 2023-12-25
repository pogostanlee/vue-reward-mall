import { ref } from "vue";
import { defineStore } from "pinia";
import {
  getcustomerAPI,
  getProductListAPI,
  exchangeAPI,
  getExchangeListAPI,
  deleteIdAPI,
  getInventoryAPI,
} from "@/apis/product";
import router from "@/router";
export const useProductStore = defineStore(
  "product",
  () => {
    //定义客户数据
    const customerInfo = ref({});
    //定义商品数据
    const productList = ref([]);
    //定义礼品兑换list
    const exchangeList = ref({});
    //定义库存数据
    const inventory = ref({});
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
        router.push("/ProductDetail");
      }
    };
    //根据身份证号查询礼品兑换情况
    const getExchangeList = async (formData) => {
      //发送请求
      let res = await getExchangeListAPI(formData);
      exchangeList.value = res;
      //状态判断
      if (res.total === 0) {
        ElMessage({
          message: "未查询到记录",
          type: "warning",
        });
      }
    };
    //删除存款记录
    const deleteId = async (row) => {
      let res = await deleteIdAPI(row);
      if (res.code === 1) {
        ElMessage({
          message: res.message,
          type: "warning",
        });
      }
    };
    //获取库存情况
    const getInventory = async (formData) => {
      let res = await getInventoryAPI(formData);
      inventory.value = res;
      //状态判断
      if (res.total === 0) {
        ElMessage({
          message: "未查询到记录",
          type: "warning",
        });
      }
    };
    return {
      customerInfo,
      getCustomer,
      getProductList,
      productList,
      exchange,
      exchangeList,
      getExchangeList,
      deleteId,
      inventory,
      getInventory,
    };
  },
  {
    persist: true, //持久化存储
  }
);

import { ref } from "vue";
import { defineStore } from "pinia";
import { getcustomerAPI } from "@/apis/product";
import router from "@/router";
export const useProductStore = defineStore(
  "product",
  () => {
    //定义客户数据
    const customerInfo = ref({});
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
    return {
      customerInfo,
      getCustomer,
    };
  },
  {
    persist: true, //持久化存储
  }
);

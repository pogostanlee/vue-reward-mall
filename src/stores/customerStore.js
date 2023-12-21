import { ref } from "vue";
import { defineStore } from "pinia";
import { customerListAPI, addCustomerAPI } from "@/apis/customer";


export const useCustomerStore = defineStore(
  "customer",
  () => {
    //定义客户列表数据的lsit
    const customerListInfo = ref({});
    //获取客户信息列表
    const customerList = async (formData) => {
      let res = await customerListAPI(formData);
      customerListInfo.value = res;
    };
    //添加客户
    const addCustomer = async (formData) => {
      let r = await addCustomerAPI(formData);
      if (r.code === 1) {
        ElMessage({
          type: "error",
          message: "添加失败",
        });
      }
    };
    return {
      customerListInfo,
      customerList,
      addCustomer,
    };
  },
  { persist: true }
);

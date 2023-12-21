import { ref } from "vue";
import { defineStore } from "pinia";
import { depositListAPI, addDepositAPI } from "@/apis/deposit";
export const useDepositStore = defineStore(
  "deposit",
  () => {
    //客户存单数据
    const depositListInfo = ref({});
    //获取储户信息
    const depositList = async (formData) => {
      let res = await depositListAPI(formData);
      //将数据储存
      depositListInfo.value = res;
    };
    //新增存款
    const addDeposit = async (data) => {
      await addDepositAPI(data);
    };
    return {
      depositListInfo,
      depositList,
      addDeposit,
    };
  },
  {
    persist: true, //持久化存储
  }
);

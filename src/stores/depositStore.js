import { ref } from "vue";
import { defineStore } from "pinia";
import { depositListAPI, addDepositAPI, deleteIdAPI } from "@/apis/deposit";
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
      if (res.total === 0) {
        ElMessage({
          message: "未查询到记录",
          type: "warning",
        });
      }
    };
    //新增存款
    const addDeposit = async (data) => {
      let res = await addDepositAPI(data);
      if (res.code === 1) {
        ElMessage({
          message: res.message,
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

    return {
      depositListInfo,
      depositList,
      addDeposit,
      deleteId,
    };
  },
  {
    persist: true, //持久化存储
  }
);

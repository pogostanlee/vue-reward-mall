import { ref } from "vue";
import { defineStore } from "pinia";
import {
  adminCustomerListAPI,
  adminBranchListAPI,
  allProductsListAPI,
  updateProductAPI,
  addProductAPI,
  adminGetInventoryAPI,
  addInventoryAPI,
  exportExcelAPI,
  adminGetDepositListAPI,
  exportDepositExcelAPI,
  adminGetInboundRecordAPI,
} from "@/apis/admin";
export const useAdminStore = defineStore(
  "admin",
  () => {
    //定义客户列表数据的lsit
    const customerListInfo = ref({});
    //定义支行列表数据的lsit
    const branchListInfo = ref({});
    //定义所有商品列表数据的lsit
    const allProductsListInfo = ref({});
    //定义所有库存列表数据的lsit
    const allInventoryInfo = ref({});
    //定义存款列表数据的lsit
    const allDepositInfo = ref({});
    //定义入库列表信息
    const inboundRecordInfo = ref({});
    //获取客户信息列表
    const customerList = async (formData) => {
      let res = await adminCustomerListAPI(formData);
      customerListInfo.value = res;
      if (res.total === 0) {
        ElMessage({
          message: "未查到信息，请核对查询条件",
          type: "warning",
        });
      }
    };
    //获取支行信息列表
    const branchList = async () => {
      let res = await adminBranchListAPI();
      branchListInfo.value = res.data;
      if (res.total === 0) {
        ElMessage({
          message: "未查到信息，请核对查询条件",
          type: "warning",
        });
      }
    };
    //获取所有商品list
    const allPrpductsList = async (data) => {
      let res = await allProductsListAPI(data);
      allProductsListInfo.value = res;
      if (res.total === 0) {
        ElMessage({
          message: "未查到信息，请核对查询条件",
          type: "warning",
        });
      }
    };
    //修改商品
    const updateProduct = async (data) => {
      let res = await updateProductAPI(data);
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
      }
    };
    //添加商品
    const addProduct = async (data) => {
      let res = await addProductAPI(data);
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
      }
    };
    //获取所有库存
    const getInventory = async (formData) => {
      let res = await adminGetInventoryAPI(formData);
      allInventoryInfo.value = res;
      if (res.total === 0) {
        ElMessage({
          message: "未查到信息，请核对查询条件",
          type: "warning",
        });
      }
    };
    //添加库存
    const addInventory = async (data) => {
      let res = await addInventoryAPI(data);
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
      }
    };
    // 导出excel;
    const exportExcel = async () => {
      await exportExcelAPI();
    };

    //获取存款列表
    const getAllDepositList = async (formData) => {
      let res = await adminGetDepositListAPI(formData);
      allDepositInfo.value = res;
      if (res.total === 0) {
        ElMessage({
          message: "未查到信息，请核对查询条件",
          type: "warning",
        });
      }
    };
    //导出存款列表excel
    const AllDepositListEX = async (formData) => {
      let res = await exportDepositExcelAPI(formData);
      console.log(res);
      let blob = new Blob([res], {
        //type: "application/vnd.ms-excel",
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      let url = window.URL.createObjectURL(blob);
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.setAttribute("download", "存款信息.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    //获取入库列表
    const getInboundRecord = async (formData) => {
      let res = await adminGetInboundRecordAPI(formData);
      inboundRecordInfo.value = res;
      if (res.total === 0) {
        ElMessage({
          message: "未查到信息，请核对查询条件",
          type: "warning",
        });
      }
    };
    return {
      customerListInfo,
      customerList,
      branchListInfo,
      branchList,
      allProductsListInfo,
      allPrpductsList,
      updateProduct,
      addProduct,
      getInventory,
      allInventoryInfo,
      addInventory,
      exportExcel,
      allDepositInfo,
      getAllDepositList,
      AllDepositListEX,
      inboundRecordInfo,
      getInboundRecord,
    };
  },
  { persist: true }
);

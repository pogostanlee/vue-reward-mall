import { ref } from "vue";
import axios from "axios";
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
    //导出excel;
    const exportExcel = async () => {
      await exportExcelAPI();
    };

    //原生ajax请求
    // const exportExcel = async () => {
    //   let res = await axios({
    //     url: "http://localhost:8080/admin/exportCustomer",
    //     // url: "http://localhost:8080/out/outexcel",
    //     method: "get",
    //     responseType: "blob",
    //   });
    //   let blob = new Blob([res.data], {
    //     type: "application/vnd.ms-excel",
    //   });
    //   let url = window.URL.createObjectURL(blob);
    //   let link = document.createElement("a");
    //   link.style.display = "none";
    //   link.href = url;
    //   link.setAttribute("download", "客户信息.xlsx");
    //   document.body.appendChild(link);
    //   link.click();
    //   document.body.removeChild(link);
    // };

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
    };
  },
  { persist: true }
);

import { ref } from "vue";
import { defineStore } from "pinia";
import {
  adminCustomerListAPI,
  adminBranchListAPI,
  allProductsListAPI,
  allProductsListNoPageAPI,
  updateProductAPI,
  addProductAPI,
  adminGetInventoryAPI,
  addInventoryAPI,
  deleteInboundByIdAPI,
  exportExcelAPI,
  adminGetDepositListAPI,
  exportDepositExcelAPI,
  adminGetInboundRecordAPI,
  adminGetReboundRecordAPI,
  adminAddReboundAPI,
  exExcelInvenAPI,
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
    //定义所有商品列表数据的lsit
    const allProductsListNoPageInfo = ref({});
    //定义所有库存列表数据的lsit
    const allInventoryInfo = ref({});
    //定义存款列表数据的lsit
    const allDepositInfo = ref({});
    //定义入库列表信息
    const inboundRecordInfo = ref({});
    //定义上交记录列表信息
    const reboundRecordInfo = ref({});
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
    //获取所有商品list不带分页
    const allPrpductsListNoPage = async () => {
      let res = await allProductsListNoPageAPI();
      allProductsListNoPageInfo.value = res.data;
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
    //删除入库记录
    const deleteInboundById = async (row) => {
      let res = await deleteInboundByIdAPI(row);
      if (res.code === 1) {
        ElMessage({
          message: res.message,
          type: "warning",
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
    //获取上交信息列表
    const getReboundRecord = async (formData) => {
      let res = await adminGetReboundRecordAPI(formData);
      reboundRecordInfo.value = res;
      if (res.total === 0) {
        ElMessage({
          message: "未查到信息，请核对查询条件",
          type: "warning",
        });
      }
    };

    //提交上交记录
    const addRebound = async (data) => {
      let res = await adminAddReboundAPI(data);
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
    //导出库存excel;
    const exExcelInven = async (formData) => {
      let res = await exExcelInvenAPI();
      console.log(res);
      let blob = new Blob([res], {
        //type: "application/vnd.ms-excel",
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      let url = window.URL.createObjectURL(blob);
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.setAttribute("download", "库存信息.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    return {
      customerListInfo,
      customerList,
      branchListInfo,
      branchList,
      allProductsListInfo,
      allPrpductsList,
      allPrpductsListNoPage,
      allProductsListNoPageInfo,
      updateProduct,
      addProduct,
      getInventory,
      allInventoryInfo,
      addInventory,
      deleteInboundById,
      exportExcel,
      allDepositInfo,
      getAllDepositList,
      AllDepositListEX,
      inboundRecordInfo,
      getInboundRecord,
      reboundRecordInfo,
      getReboundRecord,
      addRebound,
      exExcelInven,
    };
  },
  { persist: true }
);

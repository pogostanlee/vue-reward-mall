import request from "@/utils/http";
export const adminCustomerListAPI = (params) => {
  //获取客户信息列表
  const queryparams = new URLSearchParams();
  for (let key in params) {
    queryparams.append(key, params[key]);
  }
  return request.post("/admin/customerList", queryparams);
};
//获取所有支行信息
export const adminBranchListAPI = () => {
  return request.post("/admin/branchList");
};
//获取所有商品信息
export const allProductsListAPI = (params) => {
  const queryparams = new URLSearchParams();
  for (let key in params) {
    queryparams.append(key, params[key]);
  }
  return request.post("/admin/allProductsList", queryparams);
};
//修改商品信息
export const updateProductAPI = (params) => {
  const queryparams = new URLSearchParams();
  for (let key in params) {
    queryparams.append(key, params[key]);
  }
  return request.post("/admin/updateProduct", queryparams);
};
//添加商品信息
export const addProductAPI = (params) => {
  const queryparams = new URLSearchParams();
  for (let key in params) {
    queryparams.append(key, params[key]);
  }
  return request.post("/admin/addProduct", queryparams);
};
//获取所有库存信息
export const adminGetInventoryAPI = (params) => {
  const queryparams = new URLSearchParams();
  for (let key in params) {
    queryparams.append(key, params[key]);
  }
  return request.post("/admin/getInventory", queryparams);
};
//添加库存信息
export const addInventoryAPI = (params) => {
  const queryparams = new URLSearchParams();
  for (let key in params) {
    queryparams.append(key, params[key]);
  }
  return request.post("/admin/addInventory", queryparams);
};
//导出excel
export const exportExcelAPI = () => {
  return request({
    url: "/admin/exportCustomer",
    method: "get",
    responseType: "blob",
  }).then((res) => {
    let blob = new Blob([res], {
      //type: "application/vnd.ms-excel",
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    let url = window.URL.createObjectURL(blob);
    let link = document.createElement("a");
    link.style.display = "none";
    link.href = url;
    link.setAttribute("download", "客户信息.xlsx");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
};

//获取所有存款信息
export const adminGetDepositListAPI = (params) => {
  const queryparams = new URLSearchParams();
  for (let key in params) {
    queryparams.append(key, params[key]);
  }
  return request.post("/admin/getDeposit", queryparams);
};
// 导出存款列表excel
// export const exportDepositExcelAPI = (params) => {
//   const queryparams = new URLSearchParams();
//   for (let key in params) {
//     queryparams.append(key, params[key]);
//   }
//   return request.post("/admin/exportDeposit", queryparams, {
//     responseType: "blob",
//   });
// };
export const exportDepositExcelAPI = (params) => {
  return request({
    url: "/admin/exportDeposit",
    method: "post",
    data: params,
    responseType: "blob",
  });
};

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
//获取所有商品信息
export const allProductsListNoPageAPI = () => {
  return request.post("/admin/allProductsListNoPage");
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
//删除入库记录表
export const deleteInboundByIdAPI = (params) => {
  const queryparams = new URLSearchParams();
  for (let key in params) {
    queryparams.append(key, params[key]);
  }
  return request.post("/admin/deleteInboundById", queryparams);
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
export const exportDepositExcelAPI = (params) => {
  const queryparams = new URLSearchParams();
  for (let key in params) {
    queryparams.append(key, params[key]);
  }
  return request.post("/admin/exportDeposit", queryparams, {
    responseType: "blob",
  });
};
//获取入库列表
export const adminGetInboundRecordAPI = (params) => {
  const queryparams = new URLSearchParams();
  for (let key in params) {
    queryparams.append(key, params[key]);
  }
  return request.post("/admin/inbound", queryparams);
};
//获取上交记录表
export const adminGetReboundRecordAPI = (params) => {
  const queryparams = new URLSearchParams();
  for (let key in params) {
    queryparams.append(key, params[key]);
  }
  return request.post("/admin/rebound", queryparams);
};
//提交上交库存
export const adminAddReboundAPI = (params) => {
  const queryparams = new URLSearchParams();
  for (let key in params) {
    queryparams.append(key, params[key]);
  }
  return request.post("/admin/addRebound", queryparams);
};

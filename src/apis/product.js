import request from "@/utils/http";
//根据身份证号查询客户信息
export const getcustomerAPI = (params) => {
  const queryparams = new URLSearchParams();
  for (let key in params) {
    queryparams.append(key, params[key]);
  }
  return request.post("/customer/selectByIdNumber", queryparams);
};
//获取后台商品列表
export const getProductListAPI = () => {
  return request.post("/product/list");
};
//兑换礼品
export const exchangeAPI = (data) => {
  return request({
    url: "/product/exchange",
    method: "POST",
    data: data,
  });
};
//根据身份证号查询礼品兑换情况
export const getExchangeListAPI = (params) => {
  const queryparams = new URLSearchParams();
  for (let key in params) {
    queryparams.append(key, params[key]);
  }
  return request.post("/product/exchangeList", queryparams);
};
//删除领取奖品记录
export const deleteIdAPI = (params) => {
  const queryparams = new URLSearchParams();
  for (let key in params) {
    queryparams.append(key, params[key]);
  }
  return request.post("/product/deleteId", queryparams);
};
//获取库存情况
export const getInventoryAPI = (params) => {
  const queryparams = new URLSearchParams();
  for (let key in params) {
    queryparams.append(key, params[key]);
  }
  return request.post("/product/productInventory", queryparams);
};
//获取入库记录
export const getInboundAPI = (params) => {
  const queryparams = new URLSearchParams();
  for (let key in params) {
    queryparams.append(key, params[key]);
  }
  return request.post("/product/inbound", queryparams);
};

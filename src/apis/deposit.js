import request from "@/utils/http";
//获取单个用户信息
export const depositListAPI = (params) => {
  const queryparams = new URLSearchParams();
  for (let key in params) {
    queryparams.append(key, params[key]);
  }
  return request.post("/deposit/depositList", queryparams);
};
//新增存款
export const addDepositAPI = (params) => {
  const queryparams = new URLSearchParams();
  for (let key in params) {
    queryparams.append(key, params[key]);
  }
  return request.post("/deposit/addDeposit", queryparams);
};
//删除存款记录
export const deleteIdAPI = (params) => {
  const queryparams = new URLSearchParams();
  for (let key in params) {
    queryparams.append(key, params[key]);
  }
  return request.post("/deposit/deleteId", queryparams);
};

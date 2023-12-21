import request from "@/utils/http";
//用户信息查询
export const customerListAPI = (params) => {
  const queryparams = new URLSearchParams();
  for (let key in params) {
    queryparams.append(key, params[key]);
  }
  return request.post("/customer/list", queryparams);
};
//增加用户
export const addCustomerAPI = (params) => {
  const queryparams = new URLSearchParams();
  for (let key in params) {
    queryparams.append(key, params[key]);
  }
  return request.post("/customer/add", queryparams);
};

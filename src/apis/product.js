import request from "@/utils/http";
//根据身份证号查询客户信息
export const getcustomerAPI = (params) => {
  const queryparams = new URLSearchParams();
  for (let key in params) {
    queryparams.append(key, params[key]);
  }
  return request.post("/customer/selectByIdNumber", queryparams);
};

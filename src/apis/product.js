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
// export const exchangeAPI = (params) => {
//   const queryparams = new URLSearchParams();
//   for (let key in params) {
//     queryparams.append(key, params[key]);
//   }

//   return request.post("/product/exchange", queryparams);
// };
export const exchangeAPI = (data) => {
  return request({
    url: "/product/exchange",
    method: "POST",
    data: data,
  });
};

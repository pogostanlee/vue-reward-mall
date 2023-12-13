//与用户相关的接口函数
import request from "@/utils/http";
//获取登录token
export const loginAPI = (params) => {
  const queryparams = new URLSearchParams();
  for (let key in params) {
    queryparams.append(key, params[key]);
  }
  return request.post("/user/login", queryparams);
};
//获取登录账户信息
export const getUserInfoAPI = () => {
  return request.post("/user/info");
};
//提交更改密码请求
export const updatePwdAPI = (params) => {
   const queryparams = new URLSearchParams();
   for (let key in params) {
     queryparams.append(key, params[key]);
  }
  return request.post("/user/updatePwd", queryparams);
}
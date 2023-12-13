import axios from "axios";
import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/el-message.css";
import { useTokenStore } from "@/stores/tokenStore.js";
import router from "@/router";
import { useUserStore } from "@/stores/userStore";
const httpInstance = axios.create({
  baseURL: "http://localhost:8080",
});

//添加请求拦截器
httpInstance.interceptors.request.use(
  (config) => {
    //判断有没有token
    const tokenStore = useTokenStore();
    if (tokenStore.token) {
      config.headers.Authorization = tokenStore.token;
    }
    return config;
  },
  (err) => {
    //请求错误的回调
    Promise.reject(err);
  }
);
// axios响应式拦截器
httpInstance.interceptors.response.use(
  (res) => res.data,
  (e) => {
    const userStore = useUserStore();
    ElMessage({
      type: "warning",
      message: e.response.data.message,
    });
    //401错误
    if (e.response.status === 401) {
      //清除本地用户数据
      userStore.clearUserInfo();
      //跳转登录页面
      router.push("/login");
    }
    return Promise.reject(e);
  }
);
export default httpInstance;

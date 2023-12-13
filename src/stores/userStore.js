import { ref } from "vue";
import { ElMessage } from "element-plus";
import { defineStore } from "pinia";
import { loginAPI, getUserInfoAPI, updatePwdAPI } from "@/apis/user";
import { useTokenStore } from "@/stores/tokenStore";
import { useRouter } from "vue-router";
export const useUserStore = defineStore(
  "user",
  () => {
    //获取tokenstroe
    const tokenStore = useTokenStore();
    //定义管理用户数据的state
    const userInfo = ref({});
    //获取路由函数
    const router = useRouter();

    // 登录函数;
    const login = async (formData) => {
      //获取token
      const res = await loginAPI(formData);
      if (res.code == "1") {
        ElMessage({
          message: res.message,
          type: "warning",
        });
      }
      //登录成功，将登录信息储存
      if (res.code == "0") {
        tokenStore.setToken(res.data);
        //跳往主页
        router.push({ name: "layout", params: { number: formData.number } });
      }
    };

    //获取用户信息
    const getUserInfo = async () => {
      //获取用户数据并本地化
      let userres = await getUserInfoAPI();
      userInfo.value = userres.data;
    };

    //退出时清除用户信息
    const clearUserInfo = () => {
      userInfo.value = {};
    };

    //更改密码
    const updatePwd = async (ruleForm) => {
      let resdata = await updatePwdAPI(ruleForm);
      ElMessage({
        message: resdata.message,
        type: "warning",
      });
      router.push("/");
    };

    //以对象的格式把state和action返回
    return {
      userInfo,
      login,
      clearUserInfo,
      getUserInfo,
      updatePwd,
    };
  },
  { persist: true }
);

<script setup>
import { User, Lock } from "@element-plus/icons-vue";
import { ref } from "vue";
import { useUserStore } from "@/stores/userStore";
const userStore = useUserStore();
//表单数据
const formData = ref({
  number: "",
  password: "",
});

const userlogin = async () => {
  //进行登录接口访问
  await userStore.login(formData.value);
};
</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <!-- 登录表单 -->
      <el-form ref="form" size="large" autocomplete="off" :model="formData">
        <el-form-item>
          <h1>积分系统平台</h1>
        </el-form-item>
        <el-form-item prop="formData">
          <el-input
            placeholder="请输入用户名"
            :prefix-icon="User"
            v-model="formData.number"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            name="password"
            type="password"
            placeholder="请输入密码"
            :prefix-icon="Lock"
            v-model="formData.password"
            @keyup.enter="userlogin"
          ></el-input>
        </el-form-item>

        <!-- 登录按钮 -->
        <el-form-item>
          <el-button
            class="button"
            type="primary"
            auto-insert-space
            @click="userlogin"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
/* 样式 */
.login-page {
  height: 100vh;
  background-color: #fff;

  .bg {
    background: url("@/assets/login_bg.jpg") no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;

    .title {
      margin: 0 auto;
    }

    .button {
      width: 100%;
    }

    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>

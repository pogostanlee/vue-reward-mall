<script setup>
import { ref, reactive } from "vue";
import { useUserStore } from "@/stores/userStore";
const userStore = useUserStore();
const ruleFormRef = ref();
const ruleForm = reactive({
  pass: "",
  checkPass: "",
});

const validatePass = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else if (value.length < 6 || value.length > 14) {
    callback(new Error("密码长度必须在6-14位之间"));
  } else {
    if (ruleForm.checkPass !== "") {
      ruleFormRef.value?.validateField("checkPass", () => null);
    }
    callback();
  }
};

const validatePass2 = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入确认密码"));
  } else if (value !== ruleForm.pass) {
    callback(new Error("两次密码不相同"));
  } else {
    callback();
  }
};

const rules = {
  pass: [{ validator: validatePass, trigger: "blur" }],
  checkPass: [{ validator: validatePass2, trigger: "blur" }],
};

const submitForm = () => {
  ruleFormRef.value?.validate(async (valid) => {
    if (valid) {
      //提交更改密码请求
      await userStore.updatePwd(ruleForm);
    } else {
      console.log("提交错误!");
    }
  });
};

const resetForm = () => {
  ruleFormRef.value?.resetFields();
};
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
  >
    <el-form-item label="新密码" prop="pass">
      <el-input
        v-model="ruleForm.pass"
        type="password"
        autocomplete="off"
        style="width: 300px"
      />
    </el-form-item>
    <el-form-item label="确认新密码" prop="checkPass">
      <el-input
        v-model="ruleForm.checkPass"
        type="password"
        autocomplete="off"
        style="width: 300px"
      />
    </el-form-item>

    <el-row :gutter="20">
      <el-col :span="6" :offset="6">
        <el-button type="primary" @click="submitForm" :offset="6"
          >提交</el-button
        >
        <el-button @click="resetForm" :offset="6">清空</el-button>
      </el-col>
    </el-row>
  </el-form>
</template>
<style scoped></style>

<script setup>
import { ref } from "vue";
import { useProductStore } from "@/stores/productStore";

const productStore = useProductStore();
const idNumberRef = ref();
const formInline = ref({
  idNumber: "",
});
const onSubmit = () => {
  idNumberRef.value.validate(async (valid) => {
    if (valid) {
      await productStore.getCustomer(formInline.value);
    }
  });
};
//身份证校验
const validateIdNumber = (rule, value, callback) => {
  const idNumberReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if (!idNumberReg.test(value)) {
    callback(new Error("请输入有效身份证号码"));
  } else {
    callback();
  }
};
const rules = {
  idNumber: [{ validator: validateIdNumber, trigger: "blur" }],
};
</script>
<template>
  <div class="centered">
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      :rules="rules"
      ref="idNumberRef"
    >
      <el-form-item label="输入客户身份证号码" prop="idNumber">
        <el-input
          v-model="formInline.idNumber"
          placeholder="身份证号码"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.centered {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin-top: -150px;
}
</style>

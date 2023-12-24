<script setup>
import { computed, onMounted, ref } from "vue";
import { useProductStore } from "@/stores/productStore";
import { ElMessage } from "element-plus";
const productStore = useProductStore();
const dialogFormVisible = ref(false);
const formLabelWidth = "80px";
//添加商品数据
const form = ref({
  region: "",
  num: "",
});
const tableForm = ref([]);
// const exchangeForm = ref({
//   customerId: "",
//   products: "",
// });
const handleChange = (number) => {
  form.value.num = number;
};

//添加商品提交
const onSubmit = () => {
  //判断表单非空
  if (!form.value.region || !form.value.num) {
    ElMessage.error("请填写完整");
    return;
  }
  //选择与form.region相同id的productStore.productList中的元素并封装到tableForm中,并且数量为form.num，如果添加时id相同就将num相加
  const index = tableForm.value.findIndex(
    (item) => item.id === form.value.region
  );
  if (index === -1) {
    tableForm.value.push({
      ...productStore.productList.find((item) => item.id === form.value.region),
      num: form.value.num,
      customerId: productStore.customerInfo.idNumber,
    });
  } else {
    tableForm.value[index].num += form.value.num;
  }
  //将select的值清空
  form.value.region = "";
  form.value.number = "";
  dialogFormVisible.value = false;
};
//删除商品
const deleteRow = (row) => {
  const index = tableForm.value.findIndex((item) => item.id === row.id);
  tableForm.value.splice(index, 1);
};
//计算所有商品总积分
const totalPoints = computed(() => {
  return tableForm.value.reduce((total, item) => {
    return total + item.price * item.num;
  }, 0);
});
//提交订单
const submitProducts = async () => {
  //如果总积分大于用户积分就提示积分不足
  if (totalPoints.value > productStore.customerInfo.points) {
    ElMessage.error("积分不足");
    return;
  }
  //将tableForm中的数据封装到exchangeForm中
  // exchangeForm.value.customerId = productStore.customerInfo.idNumber;
  // exchangeForm.value.products = JSON.stringify(tableForm.value);

  //兑换礼品
  await productStore.exchange(tableForm.value);
};
onMounted(() => {
  productStore.getProductList();
});
</script>
<template>
  <!-- 客户信息 -->
  <el-descriptions title="客户信息" border :column="3" style="width: 800px">
    <el-descriptions-item label="姓名" width="80px">{{
      productStore.customerInfo.name
    }}</el-descriptions-item>
    <el-descriptions-item label="身份证" width="80px">{{
      productStore.customerInfo.idNumber
    }}</el-descriptions-item>
    <el-descriptions-item label="积分" width="80px">{{
      productStore.customerInfo.points
    }}</el-descriptions-item>
    <el-descriptions-item label="操作" width="80px">
      <el-button type="primary" round @click="dialogFormVisible = true"
        >添加兑换礼品</el-button
      >
    </el-descriptions-item>
  </el-descriptions>
  <!-- 兑换商品对话框 -->
  <el-dialog v-model="dialogFormVisible" title="添加兑换礼品" draggable>
    <el-form :model="form">
      <el-form-item label="选择礼品" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="下拉选择礼品">
          <el-option
            v-for="item in productStore.productList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="数量" :label-width="formLabelWidth">
        <el-input-number v-model="form.num" :min="1" @change="handleChange" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit()"> 添加 </el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 表格 -->
  <el-table :data="tableForm" border style="width: 800px" height="500">
    <el-table-column prop="name" label="商品名称" />
    <el-table-column prop="num" label="数量" />
    <el-table-column prop="price" label="商品积分" />
    <el-table-column label="操作">
      <template #default="{ row }">
        <el-button type="danger" size="mini" @click="deleteRow(row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <div>
    总积分：<span style="color: red">{{ totalPoints }}</span>
    <el-button type="success" style="margin-left: 665px" @click="submitProducts"
      >提交</el-button
    >
  </div>
</template>

<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>

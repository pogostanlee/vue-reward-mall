<script setup>
import { onMounted, ref } from "vue";
import { useProductStore } from "@/stores/productStore";
const productStore = useProductStore();
const formLabelWidth = "80px";
//定义商品map
const productMap = new Map();
//定义表单数据
const form = ref({
  id: "",
  currentPage: "1",
  pageSize: "10",
});
//定义表格数据
const tableData = ref();
//查询方法
const onSubmit = async () => {
  await productStore.getInventory(form.value);
  tableData.value = productStore.inventory.items;
};
//分页参数改变方法
const handleSizeChange = async (sizeNumber) => {
  form.value.pageSize = sizeNumber;
  form.value.currentPage = 1;
  await productStore.getInventory(form.value);
  tableData.value = productStore.inventory.items;
};
const handleCurrentChange = async (num) => {
  form.value.currentPage = num;
  await productStore.getInventory(form.value);
  tableData.value = productStore.inventory.items;
};
//获取商品名称
const getNameById = (id) => {
  //通过id查询商品名称
  return productMap.get(id);
};
//挂载
onMounted(() => {
  productStore.getProductList();
  //将商品列表转换为map
  productStore.productList.forEach((item) => {
    productMap.set(item.id, item.name);
  });
  onSubmit();
});
</script>
<template>
  <el-form :inline="true" :model="form" class="demo-form-inline">
    <el-form-item label="选择礼品" :label-width="formLabelWidth">
      <el-select v-model="form.id" placeholder="下拉选择礼品">
        <el-option
          v-for="item in productStore.productList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>

  <!-- 表格 -->
  <el-table height="500" style="width: 100%" :data="tableData" border>
    <el-table-column
      prop="productId"
      label="礼品名称"
      width="160"
      :formatter="(row) => getNameById(row.productId)"
    />
    <el-table-column prop="quantity" label="礼品库存" width="160" />
    <el-table-column prop="total" label="礼品总量" width="160" />
    <el-table-column prop="reback" label="交回数量" width="160" />
  </el-table>
  <!-- 分页 -->
  <div class="demo-pagination-block">
    <el-pagination
      v-model:current-page="form.currentPage"
      v-model:page-size="form.pageSize"
      :page-sizes="[10, 20, 50, 100]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="productStore.inventory.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<style scoped>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
  font-weight: bold;
}
</style>

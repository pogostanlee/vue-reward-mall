<script setup>
import { onMounted, ref } from "vue";
import { useProductStore } from "@/stores/productStore";
const productStore = useProductStore();
//定义商品map
const productMap = new Map();
const formInline = ref({
  productId: "",
  date: "",
  currentPage: "1",
  pageSize: "10",
});
//定义表格数据
const tableData = ref();
//获取商品名称
const getNameById = (id) => {
  //通过id查询商品名称
  return productMap.get(id);
};
//分页参数改变方法
const handleSizeChange = async (sizeNumber) => {
  formInline.value.pageSize = sizeNumber;
  formInline.value.currentPage = 1;
  await productStore.getInbound(formInline.value);
  tableData.value = productStore.inboundInfo.items;
};
const handleCurrentChange = async (num) => {
  formInline.value.currentPage = num;
  await productStore.getInbound(formInline.value);
  tableData.value = productStore.inboundInfo.items;
};
//查询
const onSubmit = async () => {
  await productStore.getInbound(formInline.value);
  tableData.value = productStore.inboundInfo.items;
};
onMounted(() => {
  productStore.getProductList();
  //将商品列表转换为map
  productStore.productList.forEach((item) => {
    productMap.set(item.id, item.name);
  });
});
</script>
<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="选择查询礼品">
      <el-select
        v-model="formInline.productId"
        placeholder="下拉选择礼品"
        clearable
      >
        <el-option
          v-for="item in productStore.productList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="选择查询日期">
      <el-date-picker
        v-model="formInline.date"
        type="daterange"
        range-separator="To"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        format="YYYY/MM/DD"
        value-format="YYYY-MM-DD"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>
  <!-- 表格 -->
  <el-table height="500" style="width: 100%" :data="tableData" border>
    <el-table-column
      prop="productId"
      label="商品名称"
      width="100"
      :formatter="(row) => getNameById(row.productId)"
    />
    <el-table-column prop="quantity" label="商品数量" width="160" />
    <el-table-column prop="date" label="入库日期" width="120" />
  </el-table>
  <!-- 分页 -->
  <div class="demo-pagination-block">
    <el-pagination
      v-model:current-page="formInline.currentPage"
      v-model:page-size="formInline.pageSize"
      :page-sizes="[10, 20, 50, 100]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="productStore.inboundInfo.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<style scoped></style>

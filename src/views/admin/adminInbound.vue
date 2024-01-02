<script setup>
import { onMounted, ref } from "vue";
import { useAdminStore } from "@/stores/adminStore";
const customerStore = useAdminStore();
const form = ref({
  productId: "",
  branchId: "",
  date: "",
  currentPage: "1",
  pageSize: "10",
});
const formLabelWidth = "80px";

//定义表格数据
const tableData = ref();
//定义支行map
const branchMap = new Map();
//定义商品map
const productMap = new Map();
//定义分页
const handleSizeChange = async (number) => {
  //页面条数变化调用查询
  form.value.pageSize = number;
  form.value.currentPage = 1;
  await customerStore.getInboundRecord(form.value);
  tableData.value = customerStore.inboundRecordInfo.items;
};
const handleCurrentChange = async (num) => {
  //当前页变化调用查询
  form.value.currentPage = num;
  await customerStore.getInboundRecord(form.value);
  tableData.value = customerStore.inboundRecordInfo.items;
};
//定义下拉框map
const getNameById = (id) => {
  //通过id查询支行名称
  return branchMap.get(id);
};
const getName = (id) => {
  //通过id查询商品名称
  return productMap.get(id);
};
//页面加载调用
onMounted(async () => {
  //获取支行列表
  await customerStore.branchList();
  customerStore.branchListInfo.forEach((item) => {
    branchMap.set(item.number, item.name);
  });
  //获取商品列表
  await customerStore.allPrpductsList(form.value);
  customerStore.allProductsListInfo.items.forEach((item) => {
    productMap.set(item.id, item.name);
  });
});
const onSubmit = async () => {
  //调用查询库存记录接口
  await customerStore.getInboundRecord(form.value);
  tableData.value = customerStore.inboundRecordInfo.items;
};
</script>
<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="礼品" :label-width="formLabelWidth">
      <el-select
        v-model="form.productId"
        placeholder="下拉选择"
        filterable
        clearable
      >
        <el-option
          v-for="item in customerStore.allProductsListInfo.items"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="支行" :label-width="formLabelWidth">
      <el-select
        v-model="form.branchId"
        placeholder="下拉选择"
        filterable
        clearable
      >
        <el-option
          v-for="item in customerStore.branchListInfo"
          :key="item.id"
          :label="item.name"
          :value="item.number"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="选择日期">
      <el-date-picker
        v-model="form.date"
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
      label="礼品名称"
      width="160"
      :formatter="(row) => getName(row.productId)"
    />

    <el-table-column prop="quantity" label="分发数量" width="160" />
    <el-table-column prop="date" label="分发时间" width="160" />
    <el-table-column
      prop="branchId"
      label="部门名称"
      width="160"
      :formatter="(row) => getNameById(row.branchId)"
    />
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
      :total="customerStore.inboundRecordInfo.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<style scoped></style>

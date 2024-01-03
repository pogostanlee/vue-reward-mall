<script setup>
import { onMounted, ref } from "vue";
import { useAdminStore } from "@/stores/adminStore";
const customerStore = useAdminStore();
const dialogFormVisible = ref(false);
const form = ref({
  productId: "",
  branchId: "",
  date: "",
  currentPage: "1",
  pageSize: "10",
});
const formLabelWidth = "80px";
//定义对话框表单
const addform = ref({
  productId: "",
  branchId: "",
  quantity: "",
});
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
  await customerStore.getReboundRecord(form.value);
  tableData.value = customerStore.reboundRecordInfo.items;
};
const handleCurrentChange = async (num) => {
  //当前页变化调用查询
  form.value.currentPage = num;
  await customerStore.getReboundRecord(form.value);
  tableData.value = customerStore.reboundRecordInfo.items;
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
  await customerStore.allPrpductsListNoPage();
  customerStore.allProductsListNoPageInfo.forEach((item) => {
    productMap.set(item.id, item.name);
  });
});
const onSubmit = async () => {
  //调用查询库存记录接口
  await customerStore.getReboundRecord(form.value);
  tableData.value = customerStore.reboundRecordInfo.items;
};
//提交增加库存
const addsubmit = async () => {
  //判断表单非空
  if (
    !addform.value.branchId ||
    !addform.value.productId ||
    !addform.value.quantity
  ) {
    ElMessage.error("请填写完整");
    return;
  }
  //调用增加库存接口
  await customerStore.addRebound(addform.value);
  //关闭对话框
  dialogFormVisible.value = false;
  //刷新页面
  onSubmit();
};

//选择礼品数量
const handleChange = (number) => {
  addform.value.quantity = number;
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
          v-for="item in customerStore.allProductsListNoPageInfo"
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
    <el-form-item>
      <el-button type="success" @click="dialogFormVisible = true"
        >上交礼品</el-button
      >
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

    <el-table-column prop="productNum" label="上交数量" width="160" />
    <el-table-column prop="date" label="上交时间" width="160" />
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
      :total="customerStore.reboundRecordInfo.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
  <!-- 对话框 -->
  <el-dialog v-model="dialogFormVisible" title="上交库存" draggable>
    <el-form :model="addform">
      <el-form-item label="支行" :label-width="formLabelWidth">
        <el-select v-model="addform.branchId" placeholder="下拉选择" filterable>
          <el-option
            v-for="item in customerStore.branchListInfo"
            :key="item.id"
            :label="item.name"
            :value="item.number"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="礼品" :label-width="formLabelWidth">
        <el-select
          v-model="addform.productId"
          placeholder="下拉选择"
          filterable
        >
          <el-option
            v-for="item in customerStore.allProductsListNoPageInfo"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="上交数量" :label-width="formLabelWidth">
        <el-input-number
          v-model="addform.quantity"
          :min="1"
          @change="handleChange"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addsubmit()"> 添加 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped></style>

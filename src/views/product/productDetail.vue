<script setup>
import { Delete } from "@element-plus/icons-vue";
import { onMounted, ref } from "vue";
import { useProductStore } from "@/stores/productStore";
const productStore = useProductStore();
//定义商品map
const productMap = new Map();
//定义查询条件
const formInline = ref({
  idNumber: "",
  currentPage: "1",
  pageSize: "10",
});
//定义dom
const idNumberRef = ref();
//定义表格数据
const tableData = ref();
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
//分页参数改变方法
const handleSizeChange = async (sizeNumber) => {
  formInline.value.pageSize = sizeNumber;
  formInline.value.currentPage = 1;
  await productStore.getExchangeList(formInline.value);
  tableData.value = productStore.exchangeList.items;
};
const handleCurrentChange = async (num) => {
  formInline.value.currentPage = num;
  await productStore.getExchangeList(formInline.value);
  tableData.value = productStore.exchangeList.items;
};
//查询
const onSubmit = () => {
  idNumberRef.value.validate(async (valid) => {
    if (valid) {
      await productStore.getExchangeList(formInline.value);
      tableData.value = productStore.exchangeList.items;
    }
  });
};
//删除存款记录
const deleteByid = (row) => {
  ElMessageBox.confirm("请确认礼品归还后再进行删除记录操作", "温馨提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "Warning",
  })
    .then(async () => {
      await productStore.deleteId(row);
      onSubmit();
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "用户取消",
      });
    });
};
//获取商品名称
const getNameById = (id) => {
  //通过id查询商品名称
  return productMap.get(id);
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

  <!-- 表格 -->
  <el-table height="500" style="width: 100%" :data="tableData" border>
    <el-table-column prop="name" label="姓名" width="60" />
    <el-table-column prop="customerIdNumber" label="身份证" width="180" />
    <el-table-column
      prop="productId"
      label="商品名称"
      width="100"
      :formatter="(row) => getNameById(row.productId)"
    />
    <el-table-column prop="quantity" label="商品数量" width="60" />
    <el-table-column prop="points" label="消耗积分" width="80" />
    <el-table-column prop="date" label="领取日期" width="120" />
    <el-table-column fixed="right" label="操作" width="60">
      <template #default="{ row }">
        <el-button
          type="danger"
          :icon="Delete"
          circle
          @click="deleteByid(row)"
        />
      </template>
    </el-table-column>
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
      :total="productStore.exchangeList.total"
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

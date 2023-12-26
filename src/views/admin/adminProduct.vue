<script setup>
import { onMounted, ref } from "vue";
import { useAdminStore } from "@/stores/adminStore";
const adminStore = useAdminStore();
const formLabelWidth = "80px";
//定义表格数据
const tableData = ref();
//定义表单数据
const form = ref({
  name: "",
  currentPage: "1",
  pageSize: "10",
});
//对话框开关
const dialogFormVisible = ref(false);
//对话框表单数据
const dialogform = ref({});
//分页插件调用方法
const handleSizeChange = async (number) => {
  //页面条数变化调用查询
  form.value.pageSize = number;
  form.value.currentPage = 1;
  await adminStore.allPrpductsList(form.value);
  tableData.value = adminStore.allProductsListInfo.items;
};
const handleCurrentChange = async (num) => {
  //当前页变化调用查询
  form.value.currentPage = num;
  await adminStore.allPrpductsList(form.value);
  tableData.value = adminStore.allProductsListInfo.items;
};
//修改商品
const updateRow = (row) => {
  dialogFormVisible.value = true;
  //将row数据赋值给dialogform
  dialogform.value = row;
};
//添加商品
const addProduct = () => {
  dialogFormVisible.value = true;
  //清空dialogform
  dialogform.value = {};
};
//修改商品提交
const onSubmit = async () => {
  //判断表单非空
  if (dialogform.value.name == "" || dialogform.value.price == "") {
    this.$message({
      message: "请填写完整信息",
      type: "warning",
    });
    return;
  }
  //判断为添加还是修改
  if (dialogform.value.id == undefined) {
    //调用添加商品接口
    await adminStore.addProduct(dialogform.value);
  } else {
    //调用修改商品接口
    await adminStore.updateProduct(dialogform.value);
  }
  //关闭对话框
  dialogFormVisible.value = false;
  //刷新页面
  await adminStore.allPrpductsList(form.value);
  tableData.value = adminStore.allProductsListInfo.items;
};
//页面加载时调用查询
onMounted(async () => {
  //查询所有商品
  await adminStore.allPrpductsList(form.value);
  tableData.value = adminStore.allProductsListInfo.items;
});
</script>

<template>
  <el-button type="primary" @click="addProduct">添加礼品</el-button>

  <!-- 礼品表格 -->
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="name" label="礼品名称" width="180" />
    <el-table-column prop="price" label="换取积分" width="180" />
    <el-table-column
      prop="isActive"
      label="是否上架"
      :formatter="(row) => (row.isActive ? '已上架' : '下架')"
      width="180"
    />
    <el-table-column label="操作">
      <template #default="{ row }">
        <el-button type="success" size="mini" @click="updateRow(row)"
          >操作</el-button
        >
      </template>
    </el-table-column>
  </el-table>

  <!-- 分页插件 -->
  <div class="demo-pagination-block">
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 50, 100]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="adminStore.allProductsListInfo.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
  <!-- 对话框 -->
  <el-dialog v-model="dialogFormVisible" title="奖品管理">
    <el-form :model="dialogform">
      <el-form-item label="商品名称" :label-width="formLabelWidth">
        <el-input v-model="dialogform.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="商品积分" :label-width="formLabelWidth">
        <el-input v-model="dialogform.price" autocomplete="off" />
      </el-form-item>

      <el-form-item label="是否上架" :label-width="formLabelWidth">
        <el-switch
          v-model="dialogform.isActive"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-value="1"
          inactive-value="0"
        ></el-switch>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit()"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>

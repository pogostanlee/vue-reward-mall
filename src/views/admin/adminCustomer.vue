<script setup>
import { onMounted, ref } from "vue";
import { useAdminStore } from "@/stores/adminStore";
const customerStore = useAdminStore();
const defaultForm = {
  idNumber: "",
  name: "",
  branchId: "",
  manager: "",
  startNumber: "",
  endNumber: "",
  currentPage: "1",
  pageSize: "10",
};
//定义支行map
const branchMap = new Map();
//获取商品名称
const getNameById = (id) => {
  //通过id查询商品名称
  return branchMap.get(id);
};
const form = ref({ ...defaultForm });
//表格数据初始化
const tableData = ref();
//分页插件调用方法
const handleSizeChange = async (number) => {
  //页面条数变化调用查询
  form.value.pageSize = number;
  form.value.currentPage = 1;
  await customerStore.customerList(form.value);
  tableData.value = customerStore.customerListInfo.items;
};
const handleCurrentChange = async (num) => {
  //当前页变化调用查询
  form.value.currentPage = num;
  await customerStore.customerList(form.value);
  tableData.value = customerStore.customerListInfo.items;
};
//区间数字检查
const validateNumberRange = (rule, value, callback) => {
  const { startNumber, endNumber } = form.value;

  // 自定义校验规则，检查数字区间
  if (startNumber === null || endNumber === null) {
    callback(new Error("请输入金额的起点与终点"));
  } else if (isNaN(startNumber) || isNaN(endNumber)) {
    callback(new Error("必须输入数字"));
  } else if (startNumber >= endNumber) {
    callback(new Error("起始数字必须小于终点数字"));
  } else {
    callback();
  }
};
//手机号校验检查
const validatePhone = (rule, value, callback) => {
  const phoneReg = /^1[3-9]\d{9}$/;
  if (!phoneReg.test(value)) {
    callback(new Error("请输入有效的手机号"));
  } else {
    callback();
  }
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
//校验规则
const rules = {
  numberRange: [{ validator: validateNumberRange, trigger: "blur" }],
  idNumber: [{ validator: validateIdNumber, trigger: "blur" }],
};
//提交数据
const onSubmit = async () => {
  //查询用户信息
  await customerStore.customerList(form.value);
  tableData.value = customerStore.customerListInfo.items;
};
//清空表格
const cleanFrom = () => {
  form.value = { ...defaultForm };
};
//页面加载调用
onMounted(async () => {
  //获取支行列表
  await customerStore.branchList();
  customerStore.branchListInfo.forEach((item) => {
    branchMap.set(item.number, item.name);
  });
  //获取客户信息列表
  await customerStore.customerList(form.value);
  tableData.value = customerStore.customerListInfo.items;
});
</script>
<template>
  <el-form :model="form" :rules="rules" :inline="true" class="demo-form-inline">
    <el-row>
      <el-form-item label="身份证号" prop="idNumber">
        <el-input v-model="form.idNumber" placeholder="身份证号" clearable />
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.name" placeholder="姓名" clearable />
      </el-form-item>

      <el-form-item label="所属支行" :label-width="formLabelWidth">
        <el-select v-model="form.branchId" placeholder="下拉选择" filterable>
          <el-option
            v-for="item in customerStore.branchListInfo"
            :key="item.id"
            :label="item.name"
            :value="item.number"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="销售经理">
        <el-input v-model="form.manager" placeholder="销售经理" clearable />
      </el-form-item>
      <el-form-item label="存款金额区间" prop="numberRange">
        <el-input
          v-model.number="form.startNumber"
          :formatter="
            (value) => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          "
          :parser="(value) => value.replace(/\¥\s?|(,*)/g, '')"
        ></el-input>
        TO
        <el-input
          v-model.number="form.endNumber"
          :formatter="
            (value) => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          "
          :parser="(value) => value.replace(/\¥\s?|(,*)/g, '')"
        ></el-input>
      </el-form-item>
    </el-row>
    <el-row>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询信息</el-button>
        <el-button type="warning" @click="cleanFrom">清空信息</el-button>
      </el-form-item>
    </el-row>
  </el-form>
  <!--客户列表 -->
  <el-table :data="tableData" height="500" border stripe style="width: 100%">
    <el-table-column prop="name" label="姓名" width="120" />
    <el-table-column prop="idNumber" label="身份证" width="180" />
    <el-table-column prop="manager" label="客户经理" width="120" />
    <el-table-column prop="totalDeposit" label="存款数" width="150" />
    <el-table-column prop="points" label="积分" width="80" />
    <el-table-column prop="branchId" label="所属支行" width="120" />
    <el-table-column
      prop="branchId"
      label="所属支行"
      width="120"
      :formatter="(row) => getNameById(row.branchId)"
    />
  </el-table>

  <!-- 分页插件 -->
  <div class="demo-pagination-block">
    <el-pagination
      v-model:current-page="form.currentPage"
      v-model:page-size="form.pageSize"
      :page-sizes="[10, 20, 50]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="customerStore.customerListInfo.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<style scoped>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}
</style>

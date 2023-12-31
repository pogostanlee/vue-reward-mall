<script setup>
import { ref, onMounted } from "vue";
import { useAdminStore } from "@/stores/adminStore";
const adminStore = useAdminStore();
//定义支行map
const branchMap = new Map();
//提交身份证数据
const formInline = ref({
  idNumber: "",
  branchId: "",
  startNumber: "",
  endNumber: "",
  date: "",
  monthDiff: "",
  receptionist: "",
  currentPage: "1",
  pageSize: "10",
});
//是否新增下拉表格
const options = [
  {
    value: "1",
    label: "新增",
  },
  {
    value: "0",
    label: "否",
  },
];
//存款记录list
const listInfo = ref();
//身份证校验
const validateIdNumber = (rule, value, callback) => {
  const idNumberReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if (!idNumberReg.test(value)) {
    callback(new Error("请输入有效身份证号码"));
  } else {
    callback();
  }
};
//区间数字检查
const validateNumberRange = (rule, value, callback) => {
  const { startNumber, endNumber } = formInline.value;

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
const rules = {
  idNumber: [{ validator: validateIdNumber, trigger: "blur" }],
  numberRange: [{ validator: validateNumberRange, trigger: "blur" }],
};
//查询方法
const onSubmit = async () => {
  await adminStore.getAllDepositList(formInline.value);
  listInfo.value = adminStore.allDepositInfo.items;
};
//导出excel
const exportExcel = async () => {
  await adminStore.AllDepositListEX(formInline.value);
};
//分页插件调用方法
const handleSizeChange = async (number) => {
  //页面条数变化调用查询
  formInline.value.pageSize = number;
  formInline.value.currentPage = 1;
  await adminStore.getAllDepositList(formInline.value);
  listInfo.value = adminStore.allDepositInfo.items;
};
const handleCurrentChange = async (num) => {
  //当前页变化调用查询
  formInline.value.currentPage = num;
  await adminStore.getAllDepositList(formInline.value);
  listInfo.value = adminStore.allDepositInfo.items;
};
onMounted(async () => {
  //获取支行列表
  await adminStore.branchList();
  adminStore.branchListInfo.forEach((item) => {
    branchMap.set(item.number, item.name);
  });
});
</script>
<template>
  <el-form
    :inline="true"
    :model="formInline"
    class="demo-form-inline"
    :rules="rules"
  >
    <el-form-item label="身份证号" prop="idNumber">
      <el-input
        v-model="formInline.idNumber"
        placeholder="请输入身份证号"
        clearable
      />
    </el-form-item>

    <el-form-item label="所属支行" :label-width="formLabelWidth">
      <el-select
        v-model="formInline.branchId"
        placeholder="下拉选择"
        filterable
        clearable
      >
        <el-option
          v-for="item in adminStore.branchListInfo"
          :key="item.id"
          :label="item.name"
          :value="item.number"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="存款金额区间" prop="numberRange">
      <el-input
        v-model.number="formInline.startNumber"
        :formatter="
          (value) => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        "
        :parser="(value) => value.replace(/\¥\s?|(,*)/g, '')"
      ></el-input>
      TO
      <el-input
        v-model.number="formInline.endNumber"
        :formatter="
          (value) => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        "
        :parser="(value) => value.replace(/\¥\s?|(,*)/g, '')"
      ></el-input>
    </el-form-item>
    <el-form-item label="是否新增存款">
      <el-select
        v-model="formInline.isNewDeposit"
        clearable
        placeholder="是否为新增存款"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="揽存人">
      <el-input
        v-model="formInline.receptionist"
        placeholder="请输入揽存人"
        clearable
      />
    </el-form-item>
    <el-form-item label="选择起始日期">
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
    <el-form-item label="存款期限（月）">
      <el-input
        v-model="formInline.monthDiff"
        placeholder="存款期限（月）"
        clearable
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="success" @click="exportExcel">导出</el-button>
    </el-form-item>
  </el-form>
  <!-- 表格 -->
  <el-table height="500" style="width: 100%" :data="listInfo" border>
    <el-table-column prop="name" label="姓名" width="60" />
    <el-table-column prop="customerIdNumber" label="身份证" width="180" />
    <el-table-column prop="deposit" label="存款金额" width="100" />
    <el-table-column prop="depositDate" label="起始日期" width="150" />
    <el-table-column prop="maturityDate" label="到期日期" width="150" />
    <el-table-column prop="getPoints" label="获得积分" width="60" />
    <el-table-column
      prop="isNewDeposit"
      label="是否新增"
      :formatter="(row) => (row.isNewDeposit ? '新增' : '否')"
      width="80"
    />
    <el-table-column prop="receptionist" label="揽存人" width="80" />
    <el-table-column prop="depositAccount" label="存款账户" width="180" />
    <el-table-column prop="subDepositAccount" label="子账户" width="180" />
    <el-table-column prop="monthDiff" label="存款期限（月）" width="80" />
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
      :total="adminStore.allDepositInfo.total"
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
.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}

.demo-date-picker .block {
  padding: 30px 0;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}

.demo-date-picker .block:last-child {
  border-right: none;
}

.demo-date-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>

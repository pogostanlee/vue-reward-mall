<script setup>
import { Delete } from "@element-plus/icons-vue";
import { ref } from "vue";
import { useDepositStore } from "@/stores/depositStore";
import { debounce } from "lodash";
const depositStore = useDepositStore();
//提交身份证数据
const formInline = ref({
  idNumber: "",
  currentPage: "1",
  pageSize: "10",
});
//提交按钮dom
const idNumberRef = ref();
//存款记录list
const listInfo = ref();
//查询方法
const onSubmit = () => {
  idNumberRef.value.validate(async (valid) => {
    if (valid) {
      //查询所有存款记录
      await depositStore.depositList(formInline.value);
      listInfo.value = depositStore.depositListInfo.items;
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
  idNumber: [
    { validator: validateIdNumber, trigger: "blur" },
    { required: true, message: "身份证号不能为空", trigger: "blur" },
  ],
};
//分页参数改变方法
const handleSizeChange = async (sizeNumber) => {
  formInline.value.pageSize = sizeNumber;
  formInline.value.currentPage = 1;
  await depositStore.depositList(formInline.value);
  listInfo.value = depositStore.depositListInfo.items;
};
const handleCurrentChange = async (num) => {
  formInline.value.currentPage = num;
  await depositStore.depositList(formInline.value);
  listInfo.value = depositStore.depositListInfo.items;
};
//删除存款记录
const deleteByid = (row) => {
  ElMessageBox.confirm("积分不足则无法删除此条数据", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      await depositStore.deleteId(row);
      onSubmit();
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "用户取消",
      });
    });
};
//抽屉页
//抽屉控件
const drawerFrom = ref({});
const drawerRef = ref();
const drawer = ref(false);
//校验规则
const validateDates = (rule, value, callback) => {
  if (
    new Date(drawerFrom.value.depositDate) >=
    new Date(drawerFrom.value.maturityDate)
  ) {
    callback(new Error("存款日期必须小于到期日期"));
  } else {
    callback();
  }
};

//校验
const drawerrules = {
  customerIdNumber: [{ validator: validateIdNumber, trigger: "blur" }],
  depositDate: [{ validator: validateDates, trigger: "blur" }],
  maturityDate: [{ validator: validateDates, trigger: "blur" }],
};
//抽屉页提交与清空
function cancelClick() {
  drawer.value = false;
  drawerFrom.value = {};
}

const confirmClick = debounce(() => {
  //添加新用户
  //通过实例调用方法
  drawerRef.value.validate(async (valid) => {
    if (valid) {
      drawer.value = false;
      //增加新存款
      await depositStore.addDeposit(drawerFrom.value);
      drawerFrom.value = {};
      onSubmit();
    }
  });
}, 1000);
</script>
<template>
  <el-form
    :inline="true"
    :model="formInline"
    class="demo-form-inline"
    :rules="rules"
    ref="idNumberRef"
  >
    <el-form-item label="身份证号" prop="idNumber" :data="listInfo">
      <el-input
        v-model="formInline.idNumber"
        placeholder="请输入身份证号"
        clearable
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
      <el-button type="success" @click="drawer = true">新增存款</el-button>
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
    <el-table-column prop="activity" label="活动内容" width="80" />
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
      :total="depositStore.depositListInfo.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
  <!-- 抽屉页 -->
  <el-drawer v-model="drawer" :direction="rtl">
    <template #header>
      <h4>新增存款信息</h4>
    </template>

    <template #default>
      <!-- 添加存款 -->
      <div>
        <el-form
          :inline="true"
          :model="drawerFrom"
          class="demo-form-inline"
          :rules="drawerrules"
          ref="drawerRef"
        >
          <el-form-item label="姓名">
            <el-input v-model="drawerFrom.name" placeholder="姓名" clearable />
          </el-form-item>

          <el-form-item label="身份证号码" prop="customerIdNumber">
            <el-input
              v-model="drawerFrom.customerIdNumber"
              placeholder="身份证号码"
              clearable
            />
          </el-form-item>

          <el-form-item label="存款金额(精确到元)">
            <el-input
              v-model.number="drawerFrom.deposit"
              :formatter="
                (value) => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              "
              :parser="(value) => value.replace(/\¥\s?|(,*)/g, '')"
              placeholder="存款金额(精确到元)"
              clearable
            />
          </el-form-item>
          <!-- 时间组件 -->

          <div class="demo-date-picker">
            <el-form-item prop="depositDate" label="存款日期">
              <div class="block">
                <span class="demonstration">存款起始日期</span>
                <el-date-picker
                  v-model="drawerFrom.depositDate"
                  type="date"
                  placeholder="选择开始日期"
                  :size="default"
                  format="YYYY/MM/DD"
                  value-format="YYYY-MM-DD"
                />
              </div>
            </el-form-item>
            <el-form-item label="到期日期" prop="maturityDate">
              <div class="block">
                <span class="demonstration">存款终止日期</span>
                <el-date-picker
                  v-model="drawerFrom.maturityDate"
                  type="date"
                  placeholder="选择终止日期"
                  :size="default"
                  format="YYYY/MM/DD"
                  value-format="YYYY-MM-DD"
                />
              </div>
            </el-form-item>
          </div>

          <el-form-item>
            <el-button @click="cancelClick">取消</el-button>
            <el-button type="primary" @click="confirmClick">确认提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </template>
  </el-drawer>
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
  /* text-align: center; */
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

<script setup>
import {
  Money,
  UserFilled,
  Crop,
  EditPen,
  SwitchButton,
  CaretBottom,
} from "@element-plus/icons-vue";
import avatar from "@/assets/default.png";
import { ElContainer } from "element-plus";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import { onMounted } from "vue";
import { useTokenStore } from "@/stores/tokenStore";
const tokenStore = useTokenStore();
const userStore = useUserStore();
const router = useRouter();
//获取账号number查询后台账户信息并储存
onMounted(() => {
  console.log("Component is mounted!");
  userStore.getUserInfo();
  // 在这里执行一些初始化的逻辑
});

//退出账号
const handleCommand = (command) => {
  //判断指令
  if (command === "logout") {
    //退出登录
    ElMessageBox.confirm("您确认要退出吗?", "温馨提示", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(async () => {
        //退出登录
        //1.清空pinia中存储的token以及个人信息
        tokenStore.removeToken();
        userStore.clearUserInfo();

        //2.跳转到登录页面
        router.push("/login");
        ElMessage({
          type: "success",
          message: "退出登录成功",
        });
      })
      .catch((e) => {
        ElMessage({
          type: "info",
          message: "用户取消了退出登录",
        });
      });
  } else {
    //路由
    router.push("/user/" + command);
  }
};
</script>

<template>
  <!-- element-plus中的容器 -->
  <el-container class="layout-container">
    <!-- 左侧菜单 -->
    <el-aside width="200px">
      <div class="el-aside__logo"></div>
      <!-- element-plus的菜单标签 -->
      <el-menu
        active-text-color="#ffd04b"
        background-color="#232323"
        text-color="#fff"
        router
      >
        <el-menu-item index="/customer" v-if="userStore.userInfo.isAdmin == 0">
          <el-icon>
            <UserFilled />
          </el-icon>
          <span>客户信息详情</span>
        </el-menu-item>
        <el-menu-item index="/deposit" v-if="userStore.userInfo.isAdmin == 0">
          <el-icon>
            <Money />
          </el-icon>
          <span>客户存款</span>
        </el-menu-item>
        <el-sub-menu v-if="userStore.userInfo.isAdmin == 0">
          <template #title>
            <el-icon>
              <Crop />
            </el-icon>
            <span>礼品</span>
          </template>
          <el-menu-item index="/productLogin">
            <el-icon>
              <Crop />
            </el-icon>
            <span>礼品兑换</span>
          </el-menu-item>
          <el-menu-item index="/ProductDetail">
            <el-icon>
              <Crop />
            </el-icon>
            <span>兑换记录</span>
          </el-menu-item>
          <el-menu-item index="/productRecord">
            <el-icon>
              <Crop />
            </el-icon>
            <span>入库记录</span>
          </el-menu-item>
          <el-menu-item index="/productInventory">
            <el-icon>
              <Crop />
            </el-icon>
            <span>商品库存</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item
          index="/adminCustomer"
          v-if="userStore.userInfo.isAdmin == 1"
        >
          <el-icon>
            <Money />
          </el-icon>
          <span>查询用户详情</span>
        </el-menu-item>
        <el-menu-item
          index="/adminDeposit"
          v-if="userStore.userInfo.isAdmin == 1"
        >
          <el-icon>
            <Money />
          </el-icon>
          <span>存款记录管理</span>
        </el-menu-item>
        <el-menu-item
          index="/adminProduct"
          v-if="userStore.userInfo.isAdmin == 1"
        >
          <el-icon>
            <Money />
          </el-icon>
          <span>礼品上下架管理</span>
        </el-menu-item>
        <el-sub-menu v-if="userStore.userInfo.isAdmin == 1">
          <template #title>
            <el-icon>
              <Crop />
            </el-icon>
            <span>库存管理</span>
          </template>

          <el-menu-item index="/adminInventory">
            <el-icon>
              <Money />
            </el-icon>
            <span>库存详情</span>
          </el-menu-item>

          <el-menu-item index="/adminInbound">
            <el-icon>
              <Money />
            </el-icon>
            <span>入库记录</span>
          </el-menu-item>
          <el-menu-item index="/adminRebound">
            <el-icon>
              <Money />
            </el-icon>
            <span>上交库存记录</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <!-- 右侧主区域 -->
    <el-container>
      <!-- 头部区域 -->
      <el-header>
        <div>
          乡宁农商银行<strong>{{ userStore.userInfo.name }}</strong>
        </div>
        <!-- 下拉菜单 -->
        <!-- command: 条目被点击后会触发,在事件函数上可以声明一个参数,接收条目对应的指令 -->
        <el-dropdown placement="bottom-end" @command="handleCommand">
          <span class="el-dropdown__box">
            <el-avatar :src="avatar" />
            <el-icon>
              <CaretBottom />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="resetPassword" :icon="EditPen"
                >重置密码</el-dropdown-item
              >
              <el-dropdown-item command="logout" :icon="SwitchButton"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <!-- 中间区域 -->
      <el-main>
        <!-- <div style="width: 1290px; height: 570px;border: 1px solid red;">
                    内容展示区
                </div> -->
        <router-view></router-view>
      </el-main>
      <!-- 底部区域 -->
      <el-footer>积分商城 ©2023 Created by Lee</el-footer>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;

  .el-aside {
    background-color: #232323;

    &__logo {
      height: 120px;
      // background: url('@/assets/logo.png') no-repeat center / 120px auto;
    }

    .el-menu {
      border-right: none;
    }
  }

  .el-header {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .el-dropdown__box {
      display: flex;
      align-items: center;

      .el-icon {
        color: #999;
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }

  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }
}
</style>

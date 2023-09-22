<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';
import NavMune from './NavMune.vue';
import { pathMap } from '@/router';
import { ref } from 'vue';
import router,{userRouters} from '@/router';

const currentRouter=useRoute()

const title = ref("")
router.afterEach((to) => {
  if (to.name) {
    title.value = pathMap[to.name]
  }
})
</script>

<template>
  <el-container>
    <el-aside>
      <div>FlinkP</div>
      <el-menu  :router=true class="el-menu-vertical" :default-active="currentRouter.fullPath">
        <NavMune :menuList="userRouters"></NavMune>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        {{ title }}
      </el-header>
      <el-main>
        <RouterView></RouterView>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>


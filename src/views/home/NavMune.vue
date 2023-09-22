<script lang="ts" setup name="NavMune">
import { ElMenuItem, ElMenuItemGroup, ElSubMenu } from 'element-plus';
import { useAttrs } from 'vue';
import type { RouteRecordRaw } from 'vue-router';


defineProps<{
  menuList:RouteRecordRaw[]
}>() 
</script>

<template>
  <template v-for="(router) in menuList" :key="router.path">
    <!-- <template v-if="!router.meta.hidden"> -->
    <ElMenuItem v-if="!router.children" :index="router.path">{{ router.name }}</ElMenuItem>
    <ElSubMenu v-else :index="router.path">
      <template #title>
        {{ router.name }}
      </template>
      <NavMune :menuList="router.children"></NavMune>
    </ElSubMenu>
    <!-- </template> -->
  </template>
</template>



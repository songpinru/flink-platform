<script setup lang="ts">
import backend from '@/util/backend';
import { ref, type Ref } from 'vue';
import { Plus } from '@element-plus/icons-vue'

interface EnvData {
  id: number,
  name: string,
  version: string,
  provided_lib: string,
  configurations: object,
  create_time: string,
  update_time: string
}

const environments: Ref<EnvData[]> = ref([])
const loading: Ref = ref(true)

async function getEnvs() {
  let res = await backend.get("api/v1/flink/platform/env");
  let envs: EnvData[] = res["data"]
  envs.forEach(app => environments.value.push(app))
  loading.value = false
}

function handleClick() { }
async function deleteFunc(id: number) {
  await backend.delete(`api/v1/flink/platform/env/delete/${id}`);
  environments.value = environments.value.filter(item => item.id != id)
}
getEnvs()
</script>

<template>
  <el-table :data="environments" v-loading="loading" stripe style="width: 100%">
    <el-table-column fixed prop="name" label="Name" width="180" />
    <el-table-column prop="version" label="Version" width="180" />
    <el-table-column prop="provided_lib" label="Libs" width="180" />
    <el-table-column prop="create_time" label="CreateTime" width="180" />
    <el-table-column prop="update_time" label="UpdateTime" width="180" />
    <el-table-column fixed="right" label="Operations" width="240">
      <template #header>
        Operations
        <el-button type="success" :icon="Plus" circle></el-button>
      </template>
      <template #default="scope">
        <el-button link type="primary" size="small" @click="handleClick">Detail</el-button>
        <el-button link type="primary" size="small">Edit</el-button>
        <el-button link type="primary" size="small" @click="deleteFunc(scope.row.id)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

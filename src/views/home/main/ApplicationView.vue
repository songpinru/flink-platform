<script setup lang="ts">
import backend from '@/util/backend';
import { reactive, ref, type Ref } from 'vue';
import { Plus, VideoPlay, VideoPause } from '@element-plus/icons-vue'
import router from '@/router';
import AppDrawer from './AppDrawer.vue';

export interface AppData {
  id: number,
  flink_id: number,
  name: string,
  main_class: string,
  args: string,
  parallelism: number,
  jar: string,
  savepoint: string,
  savepoint_time: string,
  expected_state: string,
  job_info: object,
  configurations: object,
  create_time?: string,
  update_time?: string
}
const applications: Ref<AppData[]> = ref([])
const loading: Ref = ref(true)

async function getApplications() {
  let res = await backend.get("api/v1/flink/platform/app")
  let apps: AppData[] = res["data"]
  apps.forEach(app => applications.value.push(app))
  loading.value = false
}
async function refresh() {
  applications.value = []
  getApplications()
}
async function runApplication(id: number) {
  await backend.post(`api/v1/flink/platform/app/start/${id}`)
  await refresh()
}
async function stopApplication(id: number) {
  try {
    await backend.post(`api/v1/flink/platform/app/stop/${id}`)
  } catch (error) {
    console.log(error)
  }
  await refresh()

}
async function deleteFunc(id: number) {
  await backend.delete(`api/v1/flink/platform/app/delete/${id}`)
  applications.value = applications.value.filter(item => item.id != id)
}
const drawerRef = ref<{
  acceptParam:(isView:boolean,app?:AppData)=>void
}>(null!)
async function addApplication() {
  drawerRef.value.acceptParam(false)
  await refresh()
}
function openDrawer(app: AppData) {
  drawerRef.value.acceptParam(true, app)
}

getApplications()
</script>

<template>
  <el-table :data="applications" v-loading="loading" stripe style="width: 100%">
    <el-table-column fixed prop="name" label="Name" width="180" />
    <el-table-column prop="main_class" label="MainClass" width="180" />
    <el-table-column prop="args" label="Args" width="180" />
    <el-table-column prop="parallelism" label="Parallelism" width="180" />
    <el-table-column prop="jar" label="Jar" width="180" />
    <el-table-column prop="expected_state" label="State" width="180" />
    <el-table-column prop="create_time" label="CreatedTime" width="180" />
    <el-table-column fixed="right" label="Operations" width="240">
      <template #header>
        Operations
        <el-button type="success" :icon="Plus" circle @click="addApplication"></el-button>
      </template>
      <template #default="scope">
        <el-button type="success" :icon="VideoPlay" circle @click="runApplication(scope.row.id)"></el-button>
        <el-button type="danger" :icon="VideoPause" circle @click="stopApplication(scope.row.id)"></el-button>
        <el-button link type="primary" size="small" @click="openDrawer(scope.row)">Edit</el-button>
        <el-button link type="primary" size="small" @click="deleteFunc(scope.row.id)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
  <AppDrawer ref="drawerRef"></AppDrawer>
</template>

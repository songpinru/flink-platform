<template>
    <ElDrawer v-model="drawerVisable" title="Drawer" direction="rtl">
        <ElForm ref="formref" :model="application" :disabled="disabled" label-width="auto" label-position="top">
            <ElFormItem label="Name">
                <ElInput v-model="application.name"></ElInput>
            </ElFormItem>
            <ElFormItem label="MainClass">
                <ElInput v-model="application.main_class"></ElInput>
            </ElFormItem>
            <ElFormItem label="Args">
                <ElInput v-model="application.args"></ElInput>
            </ElFormItem>
            <ElFormItem label="Parallelism">
                <ElInputNumber v-model="application.parallelism" ></ElInputNumber>
            </ElFormItem>
            <ElFormItem label="Jar">
                <ElUpload v-model="application.jar"></ElUpload>
            </ElFormItem>
            <!-- <ElFormItem label="Configurations">
                <template v-for="(item,index) in application.configurations?.keys" :key="index">
                    <ElInput v-model="application.configurations!.keys[index]"></ElInput>
                    <ElInput v-model="application.configurations![item]"></ElInput>
                </template>
            </ElFormItem> -->
           
        </ElForm>
        <template #footer>

            <ElButton type="danger" @click="drawerVisable=false">cancel</ElButton>
            <ElButton type="success" v-show="!disabled" @click="submitFunc">submit</ElButton>
        </template>
    </ElDrawer>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus';
import { ref } from 'vue';
import type { AppData } from './ApplicationView.vue';
const formRef = ref<FormInstance>()
const drawerVisable = ref(false)
const disabled = ref(false)
const application = ref<Partial<AppData>>(null!)
function acceptParam(isView: boolean, app: Partial<AppData> = {}) {
    drawerVisable.value = true
    disabled.value = isView
    application.value = app
}
function submitFunc(){

}
defineExpose({
    acceptParam
})
</script>

<style scoped></style>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import router from "../../routers";
import { CreatePostInfo } from "../../types/square/squareInfo";
import squareService from "../../apis/square/squareService";

const createPostInfo = ref<CreatePostInfo>({
    UserID: '',
    Title: '',
    Content: '',
})

const Submit = async () => {
    console.log("发送请求:发表话题", createPostInfo.value);
    const res = await squareService.postCreateNewPost(createPostInfo.value);
    if (res.data.code === 200 && res.data.message === 'Success') {
        console.log("请求成功");
        router.push("/square")
    } else {
        console.log("请求失败,错误消息: Code", res.data.code, "Message", res.data.message);
    }
}

onMounted(() => {
    // TODO: 读取pinia中的userID
    createPostInfo.value.UserID = "testID";
})
</script>

<template>
    <n-flex justify="center">
        <n-flex vertical>
            <n-h1>发表话题</n-h1>
            <n-card>
                <n-form>
                    <n-form-item label="标题">
                        <n-input v-model:value="createPostInfo.Title" />
                    </n-form-item>
                    <n-form-item label="内容">
                        <n-input v-model:value="createPostInfo.Content" type="textarea" />
                    </n-form-item>
                    <n-flex justify="end">
                        <n-button type="success" @click="Submit">
                            提交
                        </n-button>
                    </n-flex>
                </n-form>
            </n-card>
        </n-flex>
    </n-flex>
</template>

<style></style>
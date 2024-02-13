<script setup lang="ts">
import { onMounted, ref } from "vue";
import router from "../../routers";
import { CreatePostInfo } from "../../types/square/squareInfo";
import squareService from "../../apis/square/squareService";

const createPostInfo = ref<CreatePostInfo>({
    userID: '',
    title: '',
    content: '',
})

const Submit = async () => {
    console.log("发送请求:发表话题", createPostInfo.value);
    const res = await squareService.createNewPost(createPostInfo.value);
    if (res.data.code === 200 && res.data.message === 'success') {
        console.log("请求成功");
        router.push("/square")
    } else {
        console.log("请求失败,错误消息: Code", res.data.code, "Message", res.data.message);
    }
}

onMounted(() => {
    createPostInfo.value.userID = "testID";
})

</script>

<template>
    <div class="background" />
    <div class="main">
        <n-flex justify="center">
            <n-flex vertical>
                <n-h1>发表话题</n-h1>
                <n-card>
                    <n-form>
                        <n-form-item label="标题">
                            <n-input v-model:value="createPostInfo.title" />
                        </n-form-item>
                        <n-form-item label="内容">
                            <n-input v-model:value="createPostInfo.content" type="textarea" />
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
    </div>
</template>

<style>
.main {
    width: 100%;
    height: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
}

.background {
    background: url("https://pic1.zhimg.com/v2-ddc32c9e22613004d0ca22cf60cefeac_r.jpg") center center no-repeat;
    opacity: 0.7;
    width: 100%;
    min-height: 100vh;
    position: fixed;
    background-size: 100% 100%;
    z-index: -5;
    bottom: 0;
    left: 0;
}
</style>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import squareService from '../../apis/square/squareService';
import { PostInfo } from "../../types/square/squareInfo";

const props = defineProps(['topicID']);

const postInfo = ref<PostInfo>(
    {
        topicID: 'topicID',
        title: 'title',
        content: 'content',
        autherID: 'autherID',
        likes: 0,
        views: 0,
        createAt: 'yy:mm:dd'
    }
)

const getPostInfo = async (topicID: string) => {
    console.log("发送请求:获取帖子列表", topicID);
    const res = await squareService.getPostDetail(topicID);
    if (res.data.code === 200 && res.data.message === 'success') {
        console.log("请求成功");
        postInfo.value = res.data.data;
        console.log(postInfo);
    } else {
        console.log("请求失败,错误消息: Code", res.data.code, "Message", res.data.message);
    }
};

onMounted(() => {
    getPostInfo(props.topicID);
})
</script>

<template>
    <n-flex justify="center">
        <n-flex vertical>
            <n-h1>施工中... 帖子详情 {{ props.topicID }}</n-h1>
            
        </n-flex>
    </n-flex>
</template>

<style></style>
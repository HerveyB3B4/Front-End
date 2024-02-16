<script setup lang="ts">
import { onMounted, ref } from "vue";
import { createDiscreteApi } from "naive-ui";
import { TimeOutline, EyeOutline, HeartOutline, Heart } from "@vicons/ionicons5";
import squareService from "../../apis/square/squareService";
import { PostInfo } from "../../types/square/squareInfo";
import router from "../../routers";

const props = defineProps(['topicID']);

const postInfo = ref<PostInfo>(
    {
        TopicID: 'topicID',
        Title: 'title',
        Content: 'content',
        AutherID: 'autherID',
        Likes: 0,
        Views: 0,
        CreatedAt: 0,
    }
)

const likePost = ref(false);

const getPostInfo = async (topicID: string) => {
    console.log("发送请求:获取帖子列表", topicID);
    const res = await squareService.getPostDetail(topicID);
    if (res.data.code === 200 && res.data.message === 'Success') {
        console.log("请求成功");
        postInfo.value = res.data.data;
        console.log(postInfo);
    } else {
        console.log("请求失败,错误消息: Code", res.data.code, "Message", res.data.message);
    }
};

const putlikesOnPost = async (topicID: string) => {
    console.log("发送请求:点赞帖子", topicID);
    const res = await squareService.putLikesOnPost(topicID);
    if (res.data.code === 200 && res.data.message === 'Success') {
        console.log("请求成功");
        postInfo.value.Likes++;
        likePost.value = true;
    } else {
        console.log("请求失败,错误消息: Code", res.data.code, "Message", res.data.message);
    }
}

const pushToEditPost = (topicID: string) => {
    router.push("/square/edit/" + topicID)
}

const { message, dialog } = createDiscreteApi(['message', 'dialog'])

const delPost = async (topicID: string) => {
    console.log("发送请求:删除帖子", topicID);
    const res = await squareService.delPost(topicID);
    if (res.data.code === 200 && res.data.message === 'Success') {
        console.log("请求成功");
        message.success("成功删除帖子");
        router.push("/square");
    } else {
        console.log("请求失败,错误消息: Code", res.data.code, "Message", res.data.message);
    }
}

const deletePost = async (topicID: string) => {
    dialog.error({
        title: '删除帖子',
        content: '确定删除帖子？',
        negativeText: '再想想',
        positiveText: '是',
        onPositiveClick: () => {
            delPost(topicID);
        }
    })
}

onMounted(() => {
    getPostInfo(props.topicID);
})
</script>

<template>
    <n-card :title="postInfo.Title" hoverable>
        <template #header-extra>
            <n-flex align="center" justify="end">
                <n-icon size="20" :component="TimeOutline" />
                <n-time :time="postInfo.CreatedAt" />
            </n-flex>
        </template>
        <n-flex justify="start">
            {{ postInfo.Content }}
        </n-flex>
        <template #footer>
            <n-flex align="center" justify="end">
                <n-icon size="20" :component="EyeOutline" />
                {{ postInfo.Views }}
                <n-icon size="20" :component="likePost ? Heart : HeartOutline" @click="putlikesOnPost(postInfo.TopicID)" />
                {{ postInfo.Likes }}
            </n-flex>
        </template>
        <!-- TODO: 针对不同权限的用户显示操作按钮 -->
        <template #action>
            <n-flex align="center" justify="end">
                <n-button type="info" @click="pushToEditPost(postInfo.TopicID)">编辑</n-button>
                <n-button type="error" @click="deletePost(postInfo.TopicID)">删除</n-button>
            </n-flex>
        </template>
    </n-card>
</template>

<style></style>
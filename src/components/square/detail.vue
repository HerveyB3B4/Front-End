<script setup lang="ts">
import { onMounted, ref } from "vue";
import { createDiscreteApi } from "naive-ui";
import { TimeOutline, EyeOutline, HeartOutline, Heart } from "@vicons/ionicons5";
import squareService from "../../apis/square/squareService";
import { PostInfo, EditPostInfo } from "../../types/square/squareInfo";
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
const editPostInfo = ref<EditPostInfo>({
    Title: 'title',
    Content: 'content',
})

const likePost = ref(false);
const editMode = ref(false);

const getPostInfo = async (topicID: string) => {
    console.log("发送请求:获取帖子信息", topicID);
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

const putEditPost = async (topicID: string, editPostInfo: EditPostInfo) => {
    console.log("发送请求:修改帖子", topicID);
    const res = await squareService.putEditPost(topicID, editPostInfo);
    if (res.data.code === 200 && res.data.message === 'Success') {
        console.log("请求成功");
        message.success("成功修改帖子");
        editMode.value = !editMode.value;
        postInfo.value.Title = editPostInfo.Title;
        postInfo.value.Content = editPostInfo.Content;

    } else {
        console.log("请求失败,错误消息: Code", res.data.code, "Message", res.data.message);
    }
}

const deletePost = async (topicID: string) => {
    dialog.error({
        title: '删除话题',
        content: '确定删除话题？',
        negativeText: '再想想',
        positiveText: '是',
        onPositiveClick: () => {
            delPost(topicID);
        }
    })
}

const changeMode = () => {
    editMode.value = !editMode.value;
    editPostInfo.value.Title = postInfo.value.Title;
    editPostInfo.value.Content = postInfo.value.Content;
}

const editPost = async () => {
    dialog.warning({
        title: '修改话题',
        content: '确定修改话题？',
        negativeText: '再想想',
        positiveText: '是',
        onPositiveClick: () => {
            putEditPost(postInfo.value.TopicID, editPostInfo.value);
        }
    })
}

onMounted(() => {
    getPostInfo(props.topicID);
})
</script>

<template>
    <n-card hoverable>
        <template #header>
            <n-flex align="center" justify="start">
                <n-text v-if="!editMode">{{ postInfo.Title }}</n-text>
                <n-input v-else="editMode" v-model:value="editPostInfo.Title" />
            </n-flex>
        </template>
        <template #header-extra>
            <n-flex align="center" justify="end">
                <n-icon size="20" :component="TimeOutline" />
                <n-time :time="postInfo.CreatedAt" />
            </n-flex>
        </template>
        <n-flex justify="start">
            <n-text v-if="!editMode">{{ postInfo.Content }}</n-text>
            <n-input v-else="editMode" type="textarea" v-model:value="editPostInfo.Content" />
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
                <n-button v-if="editMode" type="success" @click="editPost">保存</n-button>
                <n-button v-else type="info" @click="changeMode">编辑</n-button>
                <n-button type="error" @click="deletePost(postInfo.TopicID)">删除</n-button>
            </n-flex>
        </template>
    </n-card>
</template>

<style></style>
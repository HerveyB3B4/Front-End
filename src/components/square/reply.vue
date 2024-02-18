<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { createDiscreteApi } from "naive-ui";
import { TimeOutline, HeartOutline } from "@vicons/ionicons5";
import squareService from "../../apis/square/squareService";
import { QueryRepliesInfo, ReplyInfo } from "../../types/square/squareInfo";

const props = defineProps(['topicID']);
const repliesInfo = ref<QueryRepliesInfo>({
    Page: 1,
    Limit: 10,
    TopicID: 'topicID',
});
const repliesList = ref<ReplyInfo[]>([
    {
        ReplyID: 'ReplyID',
        TopicID: 'TopicID',
        ParentID: 'ParentID',
        Content: 'Content',
        AutherID: 'AutherID',
        Likes: 0,
        CreatedAt: 0,
    },
    {
        ReplyID: 'ReplyID',
        TopicID: 'TopicID',
        ParentID: 'ParentID',
        Content: 'Content',
        AutherID: 'AutherID',
        Likes: 0,
        CreatedAt: 0,
    }
])

const getRepliesInfo = async (queryRepliesInfo: QueryRepliesInfo) => {
    console.log("发送请求:获取回复列表", queryRepliesInfo);
    const res = await squareService.getReplies(queryRepliesInfo);
    if (res.data.code === 200 && res.data.message === 'Success') {
        console.log("请求成功");
        repliesList.value = res.data.data;
        console.log(repliesList);
    } else {
        console.log("请求失败,错误消息: Code", res.data.code, "Message", res.data.message);
    }
};

const putlikesOnReply = async (replyID: string, index: number) => {
    console.log("发送请求:点赞回复", replyID);
    const res = await squareService.putLikesOnReply(replyID);
    if (res.data.code === 200 && res.data.message === 'Success') {
        console.log("请求成功");
        repliesList.value[index].Likes++;
    } else {
        console.log("请求失败,错误消息: Code", res.data.code, "Message", res.data.message);
    }
}

const { message, dialog } = createDiscreteApi(['message', 'dialog'])

const delReply = async (replyID: string) => {
    console.log("发送请求:删除回复", replyID);
    const res = await squareService.delReply(replyID);
    if (res.data.code === 200 && res.data.message === 'Success') {
        console.log("请求成功");
        message.success("成功删除回复");
    } else {
        console.log("请求失败,错误消息: Code", res.data.code, "Message", res.data.message);
    }
}

const deleteReply = async (replyID: string) => {
    dialog.error({
        title: '删除回复',
        content: '确定删除回复？',
        negativeText: '再想想',
        positiveText: '是',
        onPositiveClick: () => {
            delReply(replyID);
        }
    })
}

onMounted(() => {
    repliesInfo.value.TopicID = props.topicID;
    getRepliesInfo(repliesInfo.value);
})
</script>

<template>
    <n-card v-for="(replyInfo, index) in repliesList" hoverable>
        <template #header>
            <n-flex align="center" justify="start">
                <n-tag>{{ index == 0 ? '沙发' : (index + '楼') }}</n-tag>
            </n-flex>
        </template>
        <template #header-extra>
            <n-flex align="center" justify="end">
                <n-icon size="20" :component="TimeOutline" />
                <n-time :time="replyInfo.CreatedAt" />
            </n-flex>
        </template>
        <n-flex justify="start">
            {{ replyInfo.Content }}
        </n-flex>
        <template #footer>
            <n-flex align="center" justify="end">
                <n-icon size="20" :component="HeartOutline" @click="putlikesOnReply(replyInfo.ReplyID, index)" />
                {{ replyInfo.Likes }}
            </n-flex>
        </template>
        <!-- TODO: 针对不同权限的用户显示操作按钮 -->
        <template #action>
            <n-flex align="center" justify="end">
                <n-button type="error" @click="deleteReply(replyInfo.ReplyID)">删除</n-button>
            </n-flex>
        </template>
    </n-card>
</template>

<style></style>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { CreateReplyInfo } from "../../types/square/squareInfo";
import squareService from "../../apis/square/squareService";

const props = defineProps(['topicID']);

const createReplyInfo = ref<CreateReplyInfo>({
    Content: '',
    ParentID: 'ParentID',
})

const Submit = async () => {
    console.log("发送请求:发表话题", createReplyInfo.value);
    const res = await squareService.postCreateNewReply(props.topicID, createReplyInfo.value);
    if (res.data.code === 200 && res.data.message === 'Success') {
        console.log("请求成功");
        createReplyInfo.value.Content = '';
        createReplyInfo.value.ParentID = props.topicID;
    } else {
        console.log("请求失败,错误消息: Code", res.data.code, "Message", res.data.message);
    }
}

onMounted(() => {
    createReplyInfo.value.ParentID = props.topicID;
})
</script>

<template>
    <n-card hoverable>
        <n-input v-model:value="createReplyInfo.Content" type="textarea" placeholder="发表回复" round />
        <template #footer>
            <n-flex align="center" justify="end">
                <n-button type="info" @click="Submit">发表回复</n-button>
            </n-flex>
        </template>
    </n-card>
</template>

<style>
.n-input {
    text-align: start;
    height: 100px;
    resize: none;
}
</style>
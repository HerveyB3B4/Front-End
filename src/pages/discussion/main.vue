<script setup lang="ts">
import { onMounted, ref } from "vue";
import PostVue from "../../components/discussion/post.vue";
import { PageInfo, PostInfo } from "../../types/discussion/discussionInfo";
import discussionService from "../../apis/discussion/discussionService";

const pageInfo = ref<PageInfo>({
    page: 1,
    limit: 10,
});
const postList = ref<PostInfo[]>([
    {
        title: 'Title',
        like: 'Like',
        createTime: 'yy:mm:dd hh:mm:ss',
    },
]);
const totalPage = ref(100);

const getPageInfo = async (pageInfo: PageInfo) => {
    console.log("发送请求:获取帖子列表", pageInfo);
    const res = await discussionService.getPostList(pageInfo);
    if (res.data.status === 'success' && res.data.message === 'success') {
        console.log("请求成功");
        postList.value = res.data.data.topicList;
        totalPage.value = res.data.data.totalPage;
    } else {
        console.log("请求失败,错误消息: Status", res.data.status, "Message", res.data.message);
    }
};

const changePageSize = (pageSize: number) => {
    pageInfo.value.limit = pageSize;
    pageInfo.value.page = 1;
    getPageInfo(pageInfo.value);
};

const changePage = (page: number) => {
    pageInfo.value.page = page;
    getPageInfo(pageInfo.value);
};

onMounted(() => {
    getPageInfo(pageInfo.value);
});
</script>

<template>
    <n-flex vertical class="header">
        <h1>话题广场</h1>
    </n-flex>
    <n-flex vertical class="main">
        <n-flex justify="end">
            <n-button type="info">发表话题</n-button>
        </n-flex>
        <n-flex justify="center">
            <n-pagination v-model:page="pageInfo.page" v-model:page-size="pageInfo.limit" v-model:page-count="totalPage"
                show-size-picker :on-update:page="changePage" :on-update:page-size="changePageSize"
                :page-sizes="[10, 20, 30, 40, 50]" size="large" />
        </n-flex>
        <n-flex justify="center">
            <PostVue v-for="postInfo in postList" :postInfo="postInfo" />
        </n-flex>
        <n-flex justify="center">
            <n-pagination v-model:page="pageInfo.page" v-model:page-size="pageInfo.limit" v-model:page-count="totalPage"
                show-size-picker :on-update:page="changePage" :on-update:page-size="changePageSize"
                :page-sizes="[10, 20, 30, 40, 50]" size="large" />
        </n-flex>
    </n-flex>
</template>

<style>
.header {
    width: 80%;
}

.main {
    width: 80%;
}
</style>
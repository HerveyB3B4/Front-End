<script setup lang="ts">
import { onMounted, ref } from "vue";
import router from "../../routers";
import PostVue from "../../components/square/post.vue";
import { AnnouncementInfo, QueryPostsInfo, PostInfo } from "../../types/square/squareInfo";
import squareService from "../../apis/square/squareService";

const announcementInfo = ref<AnnouncementInfo>({
    AutherID: 'autherID',
    Content: 'Content',
    CreatedAt: 0,
});
const postsInfo = ref<QueryPostsInfo>({
    Page: 1,
    Limit: 10,
});
const postList = ref<PostInfo[]>([
    {
        TopicID: 'topicID',
        Title: 'title',
        Content: 'content',
        AutherID: 'autherID',
        Likes: 0,
        Views: 0,
        CreatedAt: 0,
    },
]);
const totalPage = ref(100);

const getAnnouncement = async () => {
    console.log("发送请求:获取公告");
    const res = await squareService.getAnnouncement();
    if (res.data.code === 200 && res.data.message === 'Success') {
        console.log("请求成功");
        announcementInfo.value = res.data.data;
    } else {
        console.log("请求失败,错误消息: Code", res.data.code, "Message", res.data.message);
    }
}

const getPostsInfo = async (postsInfo: QueryPostsInfo) => {
    console.log("发送请求:获取帖子列表", postsInfo);
    const res = await squareService.getPostList(postsInfo);
    if (res.data.code === 200 && res.data.message === 'Success') {
        console.log("请求成功");
        postList.value = res.data.data.topicList;
        totalPage.value = res.data.data.totalPage;
    } else {
        console.log("请求失败,错误消息: Code", res.data.code, "Message", res.data.message);
    }
};

const changePageSize = (pageSize: number) => {
    postsInfo.value.Limit = pageSize;
    postsInfo.value.Page = 1;
    getPostsInfo(postsInfo.value);
};

const changePage = (page: number) => {
    postsInfo.value.Page = page;
    getPostsInfo(postsInfo.value);
};

const pushToCreateNewPostPage = () => {
    router.push("/square/new")
}

onMounted(() => {
    getAnnouncement();
    getPostsInfo(postsInfo.value);
});
</script>

<template>
    <n-flex justify="center">
        <n-flex vertical>
            <n-h1>话题广场</n-h1>
            <n-flex justify="center">
                <n-text>{{ announcementInfo.Content }}</n-text>
            </n-flex>
            <n-flex justify="end">
                <n-button type="info" @click="pushToCreateNewPostPage">发表话题</n-button>
            </n-flex>
            <n-flex justify="center">
                <n-pagination v-model:page="postsInfo.Page" v-model:page-size="postsInfo.Limit" v-model:page-count="totalPage"
                    show-size-picker :on-update:page="changePage" :on-update:page-size="changePageSize"
                    :page-sizes="[10, 20, 30, 40, 50]" size="large" />
            </n-flex>
            <n-flex justify="center">
                <PostVue v-for="postInfo in postList" :postInfo="postInfo" />
            </n-flex>
            <n-flex justify="center">
                <n-pagination v-model:page="postsInfo.Page" v-model:page-size="postsInfo.Limit" v-model:page-count="totalPage"
                    show-size-picker :on-update:page="changePage" :on-update:page-size="changePageSize"
                    :page-sizes="[10, 20, 30, 40, 50]" size="large" />
            </n-flex>
        </n-flex>
    </n-flex>
</template>

<style></style>
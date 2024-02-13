<script setup lang="ts">
import router from "../../routers";
import { onMounted, ref } from "vue";
import PostVue from "../../components/square/post.vue";
import { PageInfo, PostInfo } from "../../types/square/squareInfo";
import squareService from "../../apis/square/squareService";

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
const announcement = ref("Announcement");

const getAnnouncement = async () => {
    console.log("发送请求:获取公告");
    const res = await squareService.getAnnouncement();
    if (res.data.code === 200 && res.data.message === 'success') {
        console.log("请求成功");
        announcement.value = res.data.data.content;
    } else {
        console.log("请求失败,错误消息: Code", res.data.code, "Message", res.data.message);
    }
}

const getPageInfo = async (pageInfo: PageInfo) => {
    console.log("发送请求:获取帖子列表", pageInfo);
    const res = await squareService.getPostList(pageInfo);
    if (res.data.code === 200 && res.data.message === 'success') {
        console.log("请求成功");
        postList.value = res.data.data.topicList;
        totalPage.value = res.data.data.totalPage;
    } else {
        console.log("请求失败,错误消息: Code", res.data.code, "Message", res.data.message);
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

const pushToCreateNewPostPage = () => {
    router.push("/square/create")
}

onMounted(() => {
    getAnnouncement();
    getPageInfo(pageInfo.value);
});
</script>

<template>
    <div class="background" />
    <div class="main">
        <n-flex justify="center">
            <n-flex vertical>
                <n-h1>话题广场</n-h1>
                <n-flex justify="center">
                    <n-text>{{ announcement }}</n-text>
                </n-flex>
                <n-flex justify="end">
                    <n-button type="info" @click="pushToCreateNewPostPage">发表话题</n-button>
                </n-flex>
                <n-flex justify="center">
                    <n-pagination v-model:page="pageInfo.page" v-model:page-size="pageInfo.limit"
                        v-model:page-count="totalPage" show-size-picker :on-update:page="changePage"
                        :on-update:page-size="changePageSize" :page-sizes="[10, 20, 30, 40, 50]" size="large" />
                </n-flex>
                <n-flex justify="center">
                    <PostVue v-for="postInfo in postList" :postInfo="postInfo" />
                </n-flex>
                <n-flex justify="center">
                    <n-pagination v-model:page="pageInfo.page" v-model:page-size="pageInfo.limit"
                        v-model:page-count="totalPage" show-size-picker :on-update:page="changePage"
                        :on-update:page-size="changePageSize" :page-sizes="[10, 20, 30, 40, 50]" size="large" />
                </n-flex>
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
</style>../../apis/square/discussionService../../types/square/discussionInfo
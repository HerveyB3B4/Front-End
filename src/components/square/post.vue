<script setup lang="ts">
import router from '../../routers';

const props = defineProps(['postInfo']);

const pushToPostPage = (topicID: string) => {
  router.push("/square/show/" + topicID)
}
</script>

<template>
  <n-card :title="props.postInfo.Title" hoverable @click="pushToPostPage(props.postInfo.TopicID)">
    {{ props.postInfo.Content }}
    {{ props.postInfo.CreateAt }}
  </n-card>
</template>

<style>
.n-card {
  width: 80%;
}
</style>
<script setup lang="ts">
import router from '../../routers';

const props = defineProps(['postInfo']);

const pushToPostPage = (topicID: string) => {
  router.push("/square/show/" + topicID)
}
</script>

<template>
  <n-card :title="props.postInfo.title" hoverable @click="pushToPostPage(props.postInfo.topicID)">
    {{ props.postInfo.content }}
    {{ props.postInfo.createAt }}
  </n-card>
</template>

<style>
.n-card {
  width: 80%;
}
</style>
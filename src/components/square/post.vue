<script setup lang="ts">
import router from '../../routers';
import { TimeOutline, EyeOutline, HeartOutline } from "@vicons/ionicons5";

const props = defineProps(['postInfo']);

const pushToPostPage = (topicID: string) => {
  router.push("/square/show/" + topicID)
}
</script>

<template>
  <n-card :title="props.postInfo.Title" hoverable @click="pushToPostPage(props.postInfo.TopicID)">
      <n-flex align="center" justify="space-around">
        <n-icon size="20" :component="TimeOutline" />
        <n-time :time="props.postInfo.CreatedAt" />
        <n-icon size="20" :component="EyeOutline" />
        {{ props.postInfo.Views }}
        <n-icon size="20" :component="HeartOutline" />
        {{ props.postInfo.Likes }}
      </n-flex>
  </n-card>
</template>

<style>
</style>
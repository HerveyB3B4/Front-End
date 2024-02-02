<script setup lang="ts">
    const props = defineProps(['postInfo']);
</script>

<template>
  <n-card :title="props.postInfo.title" hoverable>
    {{ props.postInfo.like }}
    {{ props.postInfo.createTime }}
  </n-card>
</template>

<style>
.n-card {
    width: 80%;
}
</style>
<script setup lang="ts">
import detailVue from "../../components/square/detail.vue";
import replyEditorVue from "../../components/square/replyEditor.vue";
import replyVue from "../../components/square/reply.vue";

const props = defineProps(['topicID']);

</script>

<template>
    <n-flex vertical align="center">
        <detailVue :topicID="props.topicID" />
        <replyEditorVue :topicID="props.topicID" />
        <replyVue :topicID="props.topicID" />
    </n-flex>
</template>

<style></style>
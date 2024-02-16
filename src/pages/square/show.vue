<script setup lang="ts">
import detailVue from "../../components/square/detail.vue";
import replyEditorVue from "../../components/square/replyEditor.vue";
import replyVue from "../../components/square/reply.vue";

const props = defineProps(['topicID']);

</script>

<template>
    <n-flex justify="center">
        <n-flex vertical class="postMain">
            <detailVue :topicID="props.topicID"/>
            <replyEditorVue :topicID="props.topicID"/>
            <replyVue :topicID="props.topicID"/>
        </n-flex>
    </n-flex>
</template>

<style>
.postMain {
    width: 60%;
    align-items: center;
}
</style>
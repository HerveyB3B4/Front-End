<script setup lang="ts">
import DiscussionMainVue from "./discussion/main.vue";
</script>

<template>
  <n-flex vertical>
    <n-flex justify="start">
      <div class="background" />
    </n-flex>
    <n-flex justify="center">
      <DiscussionMainVue />
    </n-flex>
  </n-flex>
</template>

<style scoped>
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
</style>

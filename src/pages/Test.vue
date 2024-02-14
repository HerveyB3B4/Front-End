<script setup lang="ts">

</script>

<template>
  <div class="background" />
  <div class="main" />
</template>

<style scoped>
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
</style>

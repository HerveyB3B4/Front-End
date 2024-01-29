<script setup lang="ts">

</script>

<template>
  <n-tag>NaiveUI测试页面</n-tag>
  <div class="test"></div>
  <!--用的时候上面那个div连着一起带走-->
</template>

<style scoped>
.test {
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

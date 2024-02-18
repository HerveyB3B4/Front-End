<script setup lang="ts">

</script>

<template>
    <div class="background" />
    <div class="main">
        <router-view />
    </div>
</template>

<style>
.n-input {
    text-align: start;
}
.textarea {
    height: 100px;
    resize: none;
}
.main {
    width: 60%;
    height: 100%;
    position: fixed;
    bottom: 0;
    left: 20%;
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
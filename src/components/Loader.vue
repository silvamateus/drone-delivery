<template>
  <div class="d-flex justify-content-center align-items-center loading-container">
    <b-icon icon="circle-fill" animation="throb" font-scale="4"></b-icon>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {}
</script>

<style scoped>
.loading-container {
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-color: rgba(255, 255, 255, 0.24);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>

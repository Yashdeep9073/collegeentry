<template>
  <div class="loader-wrapper">
    <img src="../assets/loader.gif" alt="Loading..." class="loader" />
  </div>
</template>

<style scoped>
.loader-wrapper {
  position: fixed;
  inset: 0;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loader {
  width: 80px;
  height: 80px;
}
</style>

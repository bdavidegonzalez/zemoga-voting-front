<template>
  <div v-if="loading" class="viewLoading">
    <v-progress-circular
      :size="70"
      :width="7"
      color="#06D6A0"
      indeterminate
    ></v-progress-circular>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
  }),
  methods: {
    start() {
      this.loading = true;
    },
    finish() {
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.viewLoading {
  position: fixed;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.596);
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
}
img {
  max-width: 700px;
}
</style>

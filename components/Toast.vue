<template>
  <div
    class="toast flex"
    :class="[{ 'slide-in': animate, 'slide-out': !animate }, variant]"
    v-show="show"
  >
    <div class="toast__icon">
      <v-img max-height="100" max-width="100" :src="img"></v-img>
    </div>
    <div class="toast__message">{{ message }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      animate: false,
      message: '',
      variant: '',
    }
  },
  watch: {
    show: function () {
      if (this.show === false) this.resetSnackbar()
    },
  },
  methods: {
    initWatcher: function () {
      this.$store.watch(
        (state) => state.toast.text,
        () => {
          const msg = this.$store.state.toast.text
          if (msg != '') {
            this.animate = true
            this.show = true
            this.img = this.$store.state.toast.img
            this.message = this.$store.state.toast.text
            this.variant = this.$store.state.toast.variant
            this.autoHide()
          }
        }
      )
    },
    resetSnackbar: function () {
      this.$store.commit('toast/setToastImg', '')
      this.$store.commit('toast/setToastText', '')
      this.$store.commit('toast/setToastVariant', '')
      this.show = false
    },
    autoHide: function () {
      setTimeout(() => {
        this.animate = false
        setTimeout(() => {
          this.show = false
        }, 1000)
      }, 4000)
    },
  },
  created: function () {
    this.initWatcher()
  },
}
</script>

<style>
.slide-in {
  animation: slide-in-right 1s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.slide-out {
  animation: slide-out-right 1s cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes slide-in-right {
  0% {
    -webkit-transform: translateX(1000px);
    transform: translateX(1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes slide-out-right {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateX(1000px);
    transform: translateX(1000px);
    opacity: 0;
  }
}
</style>
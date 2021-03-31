<template>
  <router-view />
</template>

<script>
export default {
  created() {
    this.$store.dispatch('initStore');
  },
};
</script>

<style>
#app {
  overflow: hidden;
}
</style>

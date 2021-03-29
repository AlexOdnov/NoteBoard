<template>
  <button
    type="button"
    class="button"
    :class="[color, size, { 'is-rounded': isRounded }]"
  >
    <span class="icon">
      <font-awesome-icon class="fa-w-12" :icon="type" :size="iconSize" />
    </span>
  </button>
</template>

<script>
export default {
  name: 'IconButton',
  props: {
    type: {
      type: String,
      required: true,
    },
    color: String,
    size: String,
    iconSize: String,
    isRounded: Boolean,
  },
};
</script>

<style scoped>
.button,
.button.is-rounded {
  padding: 1em;
}
</style>

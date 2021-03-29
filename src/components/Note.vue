<template>
  <article class="message" :style="{ top: top, left: left }">
    <div class="message-header">
      <p class="message-title" :class="{ 'message-title-visible': isShow }">
        {{ title }}
      </p>
      <div class="buttons">
        <icon-button
          type="chevron-up"
          size="is-small"
          iconSize="2x"
          :isRounded="true"
          :class="{ rotate: !isShow }"
        />
        <icon-button
          type="pen"
          color="is-success"
          size="is-small"
          iconSize="lg"
          :isRounded="true"
        />
        <icon-button
          type="times"
          color="is-danger"
          size="is-small"
          iconSize="2x"
          :isRounded="true"
        />
      </div>
    </div>
    <p class="message-body" v-show="isShow">
      {{ text }}
    </p>
  </article>
</template>

<script>
import IconButton from './IconButton.vue';

export default {
  components: { IconButton },
  name: 'Note',
  props: {
    title: String,
    text: String,
    isShow: Boolean,
    top: String,
    left: String,
    id: String,
  },
};
</script>

<style scoped>
.message {
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 320px;
  max-height: 320px;
  overflow: hidden;

  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.02);
}
.message-header {
  cursor: move;
}
.message-title {
  padding: 0 0.5em;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.message-title-visible {
  white-space: normal;
}
.buttons {
  flex-wrap: nowrap;
}
.message-body {
  white-space: pre-wrap;
  overflow: auto;
}
.rotate {
  transform: rotate(180deg);
}
</style>

<template>
  <article
    class="message"
    :style="{ top: topPos, left: leftPos }"
    @mousedown="onFocusNote"
    @mouseup="onMouseUp"
    ref="note"
  >
    <div class="message-header" @mousedown="onMouseDown">
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
          @click="onToggleVisible"
          @mousedown.stop
        />
        <icon-button
          type="pen"
          color="is-success"
          size="is-small"
          iconSize="lg"
          :isRounded="true"
          @click="onEditNote"
          @mousedown.stop
        />
        <icon-button
          type="times"
          color="is-danger"
          size="is-small"
          iconSize="2x"
          :isRounded="true"
          @click="onDeleteNote"
          @mousedown.stop
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
import { throttle } from '../helpers/helpers.js';

export default {
  components: { IconButton },
  name: 'Note',
  props: {
    title: String,
    text: String,
    isVisible: Boolean,
    top: String,
    left: String,
    id: String,
  },
  emits: ['toggleVisible', 'editNote', 'deleteNote', 'focusNote', 'moveNote'],
  data() {
    return {
      isShow: this.isVisible,
      topPos: this.top,
      leftPos: this.left,
      screenHeight: 0,
      screenWidth: 0,
      shiftY: 0,
      shiftX: 0,
      isMove: false,
    };
  },
  methods: {
    onToggleVisible() {
      this.isShow = !this.isShow;
      this.$emit('toggleVisible', this.id, this.isShow);
    },
    onEditNote() {
      this.$emit('editNote', this.id);
    },
    onDeleteNote() {
      this.$emit('deleteNote', this.id);
    },
    onFocusNote() {
      this.$emit('focusNote', this.id);
    },
    onMouseDown(e) {
      this.screenHeight = document.documentElement.clientHeight;
      this.screenWidth = document.documentElement.clientWidth;
      this.shiftY = e.pageY - this.$refs.note.getBoundingClientRect().top;
      this.shiftX = e.pageX - this.$refs.note.getBoundingClientRect().left;
      this.isMove = true;
      document.addEventListener('mousemove', this.move);
    },
    move: throttle(function (e) {
      const topPos =
        e.pageY - this.shiftY + this.$refs.note.offsetHeight < this.screenHeight
          ? e.pageY - this.shiftY
          : this.screenHeight - this.$refs.note.offsetHeight;

      const relativeTopPos = ((topPos / this.screenHeight) * 100).toFixed(2);

      const leftPos =
        e.pageX - this.shiftX + this.$refs.note.offsetWidth < this.screenWidth
          ? e.pageX - this.shiftX
          : this.screenWidth - this.$refs.note.offsetWidth;

      const relativeLeftPos = ((leftPos / this.screenWidth) * 100).toFixed(2);

      this.topPos = relativeTopPos > 0 ? relativeTopPos + '%' : '0%';
      this.leftPos = relativeLeftPos > 0 ? relativeLeftPos + '%' : '0%';
    }, 12),
    onMouseUp() {
      if (this.isMove) {
        document.removeEventListener('mousemove', this.move);
        this.isMove = false;
        this.$emit('moveNote', this.id, this.topPos, this.leftPos);
      }
    },
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

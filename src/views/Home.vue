<template>
  <div id="board">
    <note
      v-for="(note, index) in notesList"
      :key="note.id"
      v-bind="note"
      :style="{ zIndex: index }"
      @toggleVisible="onToggleVisible"
      @editNote="onEditNote"
      @deleteNote="onDeleteNote"
      @focusNote="onFocusNote"
      @moveNote="onMoveNote"
    />
    <icon-button
      id="addBtn"
      type="plus"
      color="is-success"
      size="is-large"
      iconSize="lg"
      :isRounded="true"
      @click="onAddNote"
    />
  </div>
</template>

<script>
import IconButton from '../components/IconButton.vue';
import Note from '../components/Note.vue';

export default {
  components: { Note, IconButton },
  name: 'Home',

  data() {
    return {
      notesList: [],
    };
  },
  methods: {
    onToggleVisible(id, flag) {
      const note = this.notesList.find((el) => el.id === id);
      note.isVisible = flag;
    },
    onEditNote(id) {
      console.log(`edit note ${id}`);
    },
    onDeleteNote(id) {
      this.notesList = this.notesList.filter((el) => el.id !== id);
    },
    onFocusNote(id) {
      const note = this.notesList.find((el) => el.id === id);
      this.notesList = [...this.notesList.filter((el) => el.id !== id), note];
    },
    onMoveNote(id, top, left) {
      const note = this.notesList.find((el) => el.id === id);
      note.top = top;
      note.left = left;
    },
    onAddNote() {
      console.log('add new note');
    },
  },
};
</script>

<style scoped>
#board {
  position: relative;
  height: 100vh;
}
#addBtn {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  z-index: 999;
}
</style>

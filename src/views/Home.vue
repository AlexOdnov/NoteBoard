<template>
  <div id="board">
    <note
      v-for="(note, index) in filteredNotesList"
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
    <filter-form id="filterForm" @changeFilter="onChangeFilter" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import IconButton from '../components/IconButton.vue';
import Note from '../components/Note.vue';
import FilterForm from '../components/FilterForm.vue';

export default {
  components: { Note, IconButton, FilterForm },
  name: 'Home',

  data() {
    return {
      filter: '',
    };
  },
  methods: {
    ...mapActions(['updateNote', 'setNotesList']),
    ...mapActions({ onDeleteNote: 'deleteNote' }),
    onToggleVisible(id, flag) {
      const note = this.notesList.find((el) => el.id === id);
      note.isVisible = flag;
      this.updateNote(note);
    },
    onEditNote(id) {
      this.$router.push({ name: 'Edit', query: { id: id } });
    },
    onFocusNote(id) {
      const note = this.notesList.find((el) => el.id === id);
      const notesList = [...this.notesList.filter((el) => el.id !== id), note];
      this.setNotesList(notesList);
    },
    onMoveNote(id, top, left) {
      const note = this.notesList.find((el) => el.id === id);
      note.top = top;
      note.left = left;
      this.updateNote(note);
    },
    onAddNote() {
      this.$router.push({ name: 'Edit' });
    },
    onChangeFilter(filter) {
      this.filter = filter;
    },
  },

  computed: {
    ...mapState(['notesList']),
    filteredNotesList() {
      if (!this.filter) {
        return this.notesList;
      } else {
        return this.notesList.filter(
          (el) =>
            el.title.includes(this.filter) || el.text.includes(this.filter)
        );
      }
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
#filterForm {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  z-index: 999;
  width: 320px;
  transform: translate(-50%);
}
@media (max-width: 510px) {
  #filterForm {
    left: 1rem;
    width: calc(100vw - 3rem - 60px);
    transform: translate(0);
  }
}
</style>

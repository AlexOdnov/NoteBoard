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
import IconButton from '../components/IconButton.vue';
import Note from '../components/Note.vue';
import FilterForm from '../components/FilterForm.vue';

export default {
  components: { Note, IconButton, FilterForm },
  name: 'Home',

  data() {
    return {
      notesList: [],
      filter: '',
    };
  },
  methods: {
    onToggleVisible(id, flag) {
      const note = this.notesList.find((el) => el.id === id);
      note.isVisible = flag;
      this.$store.dispatch('updateNote', note);
    },
    onEditNote(id) {
      console.log(`edit note ${id}`);
    },
    onDeleteNote(id) {
      this.notesList = this.notesList.filter((el) => el.id !== id);
      this.$store.dispatch('deleteNote', id);
    },
    onFocusNote(id) {
      const note = this.notesList.find((el) => el.id === id);
      this.notesList = [...this.notesList.filter((el) => el.id !== id), note];
      this.$store.dispatch('setNotesList', this.notesList);
    },
    onMoveNote(id, top, left) {
      const note = this.notesList.find((el) => el.id === id);
      note.top = top;
      note.left = left;
      this.$store.dispatch('updateNote', note);
    },
    onAddNote() {
      console.log('add new note');
    },
    onChangeFilter(filter) {
      this.filter = filter;
    },
  },

  created() {
    const placeholder = [
      {
        title: 'Привет!',
        text: 'Добавьте свою первую заметку',
        isVisible: true,
        top: 'calc( 50% - 160px)',
        left: 'calc( 50% - 160px)',
        id: '',
      },
    ];
    const notesList = this.$store.getters.getNotesList;
    this.notesList = notesList.length ? notesList : placeholder;
  },

  computed: {
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
</style>

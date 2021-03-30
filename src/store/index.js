import { createStore } from 'vuex';

export default createStore({
  state: {
    notesList: [],
  },
  mutations: {
    setNotesList(state, notesList) {
      state.notesList = notesList;
    },
    deleteNote(state, id) {
      state.notesList = state.notesList.filter((el) => el.id !== id);
    },
    addNote(state, note) {
      state.notesList.push(note);
    },
    updateNote(state, note) {
      const index = state.notesList.findIndex((el) => el.id === note.id);
      state.notesList[index] = note;
    },
  },
  getters: {
    getNotesList: (state) => state.notesList,
    getNote: (state) => (id) => state.notesList.filter((el) => el.id === id),
  },
  actions: {},
  modules: {},
});

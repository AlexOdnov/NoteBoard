import { createStore } from 'vuex';
import { localStorageService } from './../services/localStorageService';

export default createStore({
  state: {
    notesList: [
      {
        title: 'Привет!',
        text: 'Добавьте свою первую заметку',
        isVisible: true,
        top: 'calc( 50% - 160px )',
        left: 'calc( 50% - 160px )',
        id: '',
      },
    ],
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
    getNote: (state) => (id) => state.notesList.find((el) => el.id === id),
  },
  actions: {
    initStore({ commit }) {
      const notesList = localStorageService.getItem();
      if (notesList.length) {
        commit('setNotesList', notesList);
      }
    },
    deleteNote({ commit, state }, id) {
      commit('deleteNote', id);
      localStorageService.setItem(state.notesList);
    },
    addNote({ commit, state }, note) {
      commit('addNote', note);
      localStorageService.setItem(state.notesList);
    },
    updateNote({ commit, state }, note) {
      commit('updateNote', note);
      localStorageService.setItem(state.notesList);
    },
    setNotesList({ commit, state }, notesList) {
      commit('setNotesList', notesList);
      localStorageService.setItem(state.notesList);
    },
  },
  modules: {},
});

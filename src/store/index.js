import { createStore } from 'vuex';
import { localStorageService } from './../services/localStorageService';

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
  actions: {
    initStore({ commit }) {
      const notesList = localStorageService.getItem();
      commit('setNotesList', notesList);
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

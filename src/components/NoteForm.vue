<template>
  <div class="container">
    <form @submit.prevent="onSubmit">
      <div class="field">
        <label class="label" for="title">Название заметки</label>
        <div class="control">
          <input
            id="title"
            class="input is-normal"
            type="text"
            placeholder="Название заметки"
            v-model="title"
          />
        </div>
      </div>

      <div class="field">
        <label class="label" for="description">Текст заметки</label>
        <div class="control">
          <textarea
            id="description"
            class="textarea is-normal has-fixed-size"
            placeholder="Текст заметки"
            rows="5"
            v-model="text"
          ></textarea>
        </div>
      </div>

      <div class="buttons">
        <button class="button is-success" type="submit">Сохранить</button>
        <router-link :to="{ name: 'Home' }" class="button is-info"
          >На главную</router-link
        >
      </div>
    </form>
  </div>
</template>

<script>
import getId from '../helpers/getId.js';
import { mapActions } from 'vuex';

export default {
  name: 'NoteForm',
  data() {
    return {
      title: '',
      text: '',
      isVisible: true,
      top: '',
      left: '',
      id: '',
    };
  },
  methods: {
    ...mapActions(['updateNote', 'addNote']),
    resetNote() {
      this.title = '';
      this.text = '';
      this.isVisible = true;
      this.top = 'calc( 50% - 160px)';
      this.left = 'calc( 50% - 160px)';
      this.id = '';
    },
    onSubmit() {
      const note = {
        title: this.title,
        text: this.text,
        isVisible: this.isVisible,
        top: this.top,
        left: this.left,
        id: this.id,
      };
      if (note.id) {
        this.updateNote(note);
        this.$router.push({ name: 'Edit' });
      } else {
        note.id = getId();
        this.addNote(note);
      }
      this.resetNote();
    },
  },
  created() {
    const id = this.$route.query.id;
    if (id) {
      const note = this.$store.getters.getNote(id);
      if (note) {
        this.title = note.title;
        this.text = note.text;
        this.isVisible = note.isVisible;
        this.top = note.top;
        this.left = note.left;
        this.id = note.id;
      } else {
        this.$router.push({ name: 'Home' });
      }
    } else {
      this.resetNote();
    }
  },
};
</script>

<style>
.label {
  font-size: 1.5rem;
}
</style>

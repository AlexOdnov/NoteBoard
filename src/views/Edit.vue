<template>
  <div id="edit">
    <note-form id="editForm" />
  </div>
</template>

<script>
import NoteForm from '../components/NoteForm.vue';

export default {
  components: { NoteForm },
  name: 'Edit',
};
</script>

<style scoped>
#edit {
  height: 100vh;
  display: flex;
}
#editForm {
  align-self: center;
}
@media (max-width: 1023px) {
  #editForm {
    margin: 0 1rem;
  }
}
</style>

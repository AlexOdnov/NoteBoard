<template>
  <div class="field has-addons">
    <div class="control input-control">
      <input
        class="input is-medium"
        type="text"
        placeholder="Поиск"
        v-model="filter"
        @input="onInput"
      />
    </div>
    <div class="control">
      <icon-button
        type="times"
        size="is-medium"
        iconSize="lg"
        @click="onClear"
      />
    </div>
  </div>
</template>

<script>
import IconButton from './IconButton.vue';
import { debounce } from '../helpers/helpers.js';

export default {
  components: { IconButton },
  name: 'FilterForm',
  emits: ['changeFilter'],
  data() {
    return {
      filter: '',
    };
  },
  methods: {
    onInput: debounce(function () {
      this.$emit('changeFilter', this.filter);
    }, 300),
    onClear() {
      this.filter = '';
      this.$emit('changeFilter', this.filter);
    },
  },
};
</script>

<style scoped>
.input-control {
  flex-grow: 1;
}
</style>

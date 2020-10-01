<template>
  <v-snackbar v-model="snackbar" :timeout="timeout" color="blue-grey" text>
    {{ text }}

    <template v-slot:action="{ attrs }">
      <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import EventBus from '../EventBus';

export default {
  data() {
    return {
      snackbar: false,
      text: 'Hello, snack bar!',
      timeout: 2000,
    };
  },
  created() {
    EventBus.$on('popUp', (message) => {
      this.snackbar = true;
      this.text = message;
    });
  },
};
</script>

<style>
</style>
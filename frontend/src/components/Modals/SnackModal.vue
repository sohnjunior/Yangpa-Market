<template>
  <v-snackbar v-model="snackbar" :timeout="timeout" color="blue-grey" text>
    {{ text }}
    <template v-slot:action="{ attrs }">
      <v-btn color="pink" text v-bind="attrs" @click="snackbar = false"> Close </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import EventBus from '../../utils/bus';

@Component
export default class SnackModal extends Vue {
  private snackbar: boolean = false;
  private text: string = 'Hello, snack bar!';
  private timeout: number = 2000;

  created() {
    EventBus.$on('pop-up', (message: string) => {
      this.snackbar = true;
      this.text = message;
    });
  }
}
</script>

<style></style>

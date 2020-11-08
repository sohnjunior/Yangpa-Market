<template>
  <v-btn type="submit" class="mt-6" x-large color="success" :disabled="!isValid">
    <slot></slot>
  </v-btn>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SubmitButton extends Vue {
  @Prop({ required: true, default: true }) readonly isValid!: boolean;
}
</script>

<style></style>

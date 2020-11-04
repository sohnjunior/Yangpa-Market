<template>
  <v-btn type="submit" class="mt-6" x-large color="success" :disabled="!isValid">
    <slot></slot>
  </v-btn>
</template>

<script>
export default {
  props: { isValid: { type: Boolean, default: true } },
};
</script>

<style></style>

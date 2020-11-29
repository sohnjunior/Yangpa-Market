<template>
  <div class="chip">{{ text }}</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Chip extends Vue {
  @Prop({ required: true }) readonly text!: string;
}
</script>

<style lang="scss" scoped>
.chip {
  width: 70px;
  margin: 5px 0px;
  padding: 2px;
  border: 1px solid #2f9e44;
  border-radius: 15px;
  color: #2f9e44;
  text-align: center;
  font-size: 0.8rem;
  font-weight: 400;
}
</style>

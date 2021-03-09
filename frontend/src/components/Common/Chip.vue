<template>
  <div class="chip" :style="style">{{ text }}</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Chip extends Vue {
  @Prop({ required: true }) readonly text!: string;
  @Prop({ required: false, default: 70 }) readonly width!: number;
  @Prop({ required: false, default: '#2f9e44' }) readonly color!: string;

  get style() {
    return {
      width: `${this.width}px`,
      border: `1px solid ${this.color}`,
      color: `${this.color}`,
    };
  }
}
</script>

<style lang="scss" scoped>
.chip {
  margin: 5px 0px;
  padding: 4px;
  border-radius: 10px;
  text-align: center;
  font-size: 0.7rem;
  font-weight: 400;
}
</style>

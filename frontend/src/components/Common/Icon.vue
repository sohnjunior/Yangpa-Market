<template>
  <span class="icon" :style="style" @click="onClick" />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class Icon extends Vue {
  @Prop({ required: true }) readonly filename!: string;
  @Prop({ required: false, default: 'svg' }) readonly extension!: string;
  @Prop({ required: false, default: 10 }) readonly width!: number;
  @Prop({ required: false, default: 10 }) readonly height!: number;

  get style() {
    return {
      width: `${this.width}px`,
      height: `${this.height}px`,
      backgroundImage: `${this.imagePath}`,
    };
  }

  get imagePath() {
    return `url(${require(`../../assets/images/${this.filename}.${this.extension}`)})`;
  }

  public onClick() {
    this.$emit('click');
  }
}
</script>

<style lang="scss" scoped>
.icon {
  display: inline-block;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
}
</style>

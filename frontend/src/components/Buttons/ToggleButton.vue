<template>
  <div class="toggle-container" :style="containerStyle" @click="onClick">
    <div ref="trigger" class="toggle-trigger" :style="triggerStyle" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator';

const TOGGLED_COLOR = '#69db7c';
const UNTOGGLED_COLOR = '#ced4da';

@Component({})
export default class ToggleButton extends Vue {
  @Prop({ required: false, default: 50 }) readonly width!: number;
  @Prop({ required: false, default: 30 }) readonly height!: number;

  @Ref() trigger!: HTMLElement;

  private isToggled = false;

  get containerStyle() {
    return {
      width: `${this.width}px`,
      height: `${this.height}px`,
    };
  }

  get triggerStyle() {
    const radius = this.height - 2;

    return {
      width: `${radius}px`,
      height: `${radius}px`,
    };
  }

  get shiftOffset() {
    const triggerWidth = parseInt(this.trigger.style.width);

    return this.width - triggerWidth - 2;
  }

  public onClick() {
    this.isToggled = !this.isToggled;
    this.animateShifting();
    this.$emit('toggle', this.isToggled);
  }

  public animateShifting() {
    const $el = this.$el as HTMLElement;
    const offset = this.isToggled ? this.shiftOffset : 0;
    const backgroundColor = this.isToggled ? TOGGLED_COLOR : UNTOGGLED_COLOR;

    requestAnimationFrame(() => {
      $el.style.backgroundColor = `${backgroundColor}`;
      this.trigger.style.transform = `translateX(${offset}px)`;
    });
  }
}
</script>

<style lang="scss" scoped>
.toggle-container {
  position: relative;
  width: 50px;
  height: 30px;
  background-color: #ced4da;
  border: none;
  border-radius: 30px;

  .toggle-trigger {
    position: absolute;
    top: 1px;
    left: 1px;
    width: 28px;
    height: 28px;
    background-color: #f8f9fa;
    border: none;
    border-radius: 50%;
    transition: transform 0.2s ease;
  }
}
</style>

<template>
  <div>
    <slot name="trigger"></slot>
    <ul>
      <li v-for="(item, index) in items" :key="index" @click="onClick(index)">
        {{ item.text }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
interface DropdownMenuItem {
  text: string;
  action(): void;
}

import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class DropdownMenu extends Vue {
  @Prop({ required: true, default: [] }) readonly items!: DropdownMenuItem[];

  onClick(index) {
    console.log(this.items);
    this.items[index].action();
  }
}
</script>

<style></style>

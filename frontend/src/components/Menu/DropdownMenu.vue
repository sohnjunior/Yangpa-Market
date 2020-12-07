<template>
  <div class="dropdown-container">
    <button class="dropdown-trigger" @click="onToggle">{{ title }}</button>
    <ul v-show="show" class="dropdown-wrapper">
      <li class="dropdown-item" v-for="(item, index) in items" :key="index" @click="onClick(index)">
        {{ item.text }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

interface DropdownMenuItem {
  text: string;
  action(): void;
}

@Component
export default class DropdownMenu extends Vue {
  @Prop({ required: true }) readonly title!: string;
  @Prop({ required: true, default: [] }) readonly items!: DropdownMenuItem[];

  private show = false;

  public onToggle() {
    this.show = !this.show;
  }

  public onClick(index) {
    this.show = false;
    this.items[index].action();
  }
}
</script>

<style lang="scss">
.dropdown-container {
  position: relative;

  .dropdown-trigger {
    outline: none;
  }

  .dropdown-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 40px;
    right: 0;
    border: none;
    border-radius: 12px;
    width: 150px;
    height: 120px;
    padding: 10px 0px;
    background-color: #ffffff;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);

    .dropdown-item {
      width: 60%;
      padding: 10px 0px;
      font-size: 1.1rem;
      font-weight: 500;
      color: #808080;
      text-align: center;
      cursor: pointer;

      &:hover {
        background-color: rgba(0, 0, 0, 0.03);
      }
    }

    li + li {
      border-top: 1px solid rgb(238, 238, 238);
    }
  }
}
</style>

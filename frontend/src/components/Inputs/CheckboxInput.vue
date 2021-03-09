<template>
  <div class="checkbox-container" ref="label" @click="onToggle">
    <Icon filename="check" extension="png" width="10" height="10" />
    <input type="checkbox" :checked="checked" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Model, Watch, Ref } from 'vue-property-decorator';
import Icon from '@components/Common/Icon.vue';

@Component({
  components: { Icon },
})
export default class CheckboxInput extends Vue {
  @Model('toggle', { type: Boolean }) readonly checked!: boolean;

  @Ref() label!: HTMLDivElement;

  public onToggle() {
    this.$emit('toggle', !this.checked);
  }

  @Watch('checked')
  public onWatchChecked(checked: boolean) {
    this.label.style.backgroundColor = checked ? '#ffab91' : '#eeeeee';
  }
}
</script>

<style lang="scss">
.checkbox-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border-radius: 5px;
  background-color: #eeeeee;
  cursor: pointer;

  input {
    display: none;
    position: relative;
  }
}
</style>

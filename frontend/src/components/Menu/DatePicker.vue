<template>
  <v-menu
    v-model="openMenu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field v-model="date" label="생년월일" readonly v-bind="attrs" v-on="on" />
    </template>
    <v-date-picker v-model="date" no-title scrollable>
      <v-spacer />
      <v-btn text color="primary" @click="openMenu = !openMenu">취소</v-btn>
      <v-btn text color="primary" @click="onSaveDate">확인</v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class DatePicker extends Vue {
  private date: string = '';
  private openMenu: boolean = false;

  onSaveDate(): void {
    const date = this.date;
    this.$emit('pick-date', date);
    this.openMenu = !this.openMenu;
  }
}
</script>

<style></style>

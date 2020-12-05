<template>
  <div class="form-view">
    <SignupForm />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SignupForm from '@components/Forms/SignupForm.vue';

@Component({
  components: { SignupForm },
})
export default class SignupView extends Vue {}
</script>

<style lang="scss">
.form-view {
  display: flex;
  justify-content: center;
  padding: 20px;
}
</style>

<template>
  <BaseModal :isOpen="show">
    <template v-slot:modal-header>
      <h1>후기 작성</h1>
    </template>
    <template v-slot:modal-content>
      <ReviewForm @submit-form="onSubmitForm" />
    </template>
  </BaseModal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { ReviewAPI } from '../../api';
import ReviewForm from '@components/Forms/ReviewForm.vue';
import BaseModal from '@components/Modals/BaseModal.vue';

const userModule = namespace('UserModule');

@Component({
  components: { ReviewForm, BaseModal },
})
export default class ReviewCreateModal extends Vue {
  @Prop({ required: true, default: false }) readonly show!: boolean;

  @userModule.Getter
  public currentEmail!: string;

  public async onSubmitForm(payload): Promise<void> {
    const { title, body, rating, image } = payload;

    const formData = new FormData();
    formData.append('email', this.currentEmail);
    formData.append('title', title);
    formData.append('image', image);
    formData.append('body', body);
    formData.append('rating', rating);

    const { data } = await ReviewAPI.createReview(formData);
    this.closeModal();
  }

  public closeModal(): void {
    this.$emit('close');
  }
}
</script>

<style></style>

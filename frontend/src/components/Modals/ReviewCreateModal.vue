<template>
  <div class="text-center">
    <v-dialog :value="show" width="500" @click:outside="closeDialog">
      <v-card>
        <v-card-title class="headline pt-7"> 후기 작성 </v-card-title>
        <v-card-text>
          <ReviewForm @submit-form="onSubmitForm" />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { ReviewAPI } from '../../api';
import ReviewForm from '@components/Forms/ReviewForm.vue';

const user = namespace('user');

@Component({
  components: { ReviewForm },
})
export default class ReviewCreateModal extends Vue {
  @Prop({ required: true, default: false }) readonly show!: boolean;

  @user.Getter
  public getEmail!: string;

  public async onSubmitForm(payload): Promise<void> {
    const { title, body, rating, image } = payload;

    const formData = new FormData();
    formData.append('email', this.getEmail);
    formData.append('title', title);
    formData.append('image', image);
    formData.append('body', body);
    formData.append('rating', rating);

    const { data } = await ReviewAPI.createReview(formData);
    this.closeDialog();
  }

  public closeDialog(): void {
    this.$emit('close-dialog');
  }
}
</script>

<style></style>

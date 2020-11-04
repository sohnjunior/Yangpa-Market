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

<script>
import { ReviewAPI } from '@api';
import { mapGetters } from 'vuex';
import ReviewForm from '@components/Forms/ReviewForm';

export default {
  components: { ReviewForm },
  props: ['show'],

  computed: {
    ...mapGetters({ userEmail: 'getEmail' }),
  },

  methods: {
    async onSubmitForm(payload) {
      const { title, body, rating, image } = payload;

      const formData = new FormData();
      formData.append('email', this.userEmail);
      formData.append('title', title);
      formData.append('image', image);
      formData.append('body', body);
      formData.append('rating', rating);

      const { data } = await ReviewAPI.createReview(formData);
      this.closeDialog();
    },

    closeDialog() {
      this.$emit('close-dialog');
    },
  },
};
</script>

<style></style>

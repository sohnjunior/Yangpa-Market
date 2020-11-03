<template>
  <div class="text-center">
    <v-dialog :value="show" width="500" @click:outside="closeDialog">
      <v-card>
        <v-card-title>
          <v-row>
            <v-col class="ml-5">
              <h2 class="font-weight-medium">{{ title }}</h2>
            </v-col>
            <v-col cols="2">
              <v-btn icon color="grey" @click="closeDialog">
                <v-icon>mdi-close-circle</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-title>

        <v-card-text>
          <v-subheader>포토리뷰</v-subheader>
          <v-img width="250" height="200" :src="image" class="ml-6 mt-5" />

          <v-subheader>작성자</v-subheader>
          <div class="ml-8 font-weight-bold">
            <v-icon small>mdi-account</v-icon>
            {{ writer }}
          </div>

          <v-subheader>평점</v-subheader>
          <v-rating
            :value="rating"
            class="ml-8"
            background-color="amber lighten-3"
            color="amber"
            dense
            half-increments
            readonly
            size="25"
          />

          <v-subheader>상품평</v-subheader>
          <div class="ml-8 mb-6 font-weight-regular">
            {{ body }}
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ['show', 'title', 'writer', 'image', 'body', 'rating', 'like'],
  methods: {
    closeDialog() {
      this.$emit('close-dialog');
    },
  },
};
</script>

<style></style>

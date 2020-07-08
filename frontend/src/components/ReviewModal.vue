<template>
  <div class="text-center">
    <v-dialog
      :value="show"
      width="500"
      @click:outside="closeDialog"
    >
      <v-card>
        <v-card-title
          class="headline pt-6"
        >
          {{ title }}
        </v-card-title>

          <v-img
            width="250"
            height="200"
            :src="image"
            class="ml-6 mt-5"
          ></v-img>

          <v-card-text>

          <div class="my-4 subtitle-1">
            작성자 : {{ writer }}
          </div>

            <v-rating :value="rating" background-color="amber lighten-3" color="amber" dense half-increments readonly size="25"></v-rating>
          </v-card-text>
          <v-card-text>
            {{ body }}
          </v-card-text>

  
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="closeDialog"
          >
            확인
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ['show', 'title', 'writer', 'image', 'body', 'rating', 'like'],
  methods: {
    // 확인 버튼 클릭 시 이벤트 핸들러
    closeDialog() {
      this.$emit('closeDialog');
    }
  }
}
</script>

<style>
</style>
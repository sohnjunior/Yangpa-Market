<template>
  <div class="text-center">
    <v-dialog
      :value="show"
      width="500"
      @click:outside="closeDialog"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          {{ title }}
        </v-card-title>

        <v-container>
          <v-img
            width="250"
            height="200"
            :src="image"
          ></v-img>

          <v-card-text>
            작성자 : {{ writer }}
          </v-card-text>
          <v-card-text>
            <v-rating :value="rating" background-color="amber lighten-3" color="amber" dense half-increments readonly size="25"></v-rating>
          </v-card-text>
          <v-card-text>
            {{ body }}
          </v-card-text>

        </v-container>
  
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
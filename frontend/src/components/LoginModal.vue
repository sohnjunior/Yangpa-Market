<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">로그인</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field label="email" required v-model="email"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="password" type="password" required v-model="password"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="modalDestroy">로그인하기</v-btn>
        <v-btn color="blue darken-1" text @click="modalDestroy">취소</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  props: ['dialog'],
  methods: {
    // 로그인하기 or 취소 버튼 클릭 시 부모 컴포넌트에 이벤트 전달
    modalDestroy() {
      this.$emit('modalDestroy');
    }

    // TODO: 로그인 api 호출
  }
}
</script>

<style>
</style>
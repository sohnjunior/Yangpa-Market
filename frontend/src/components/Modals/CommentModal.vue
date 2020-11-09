<template>
  <v-dialog v-model="dialog" max-width="500px" @submit.prevent="onSubmit">
    <v-card>
      <v-card-title>
        <span class="headline">{{ title }}</span>
      </v-card-title>
      <v-card-text class="py-0" background-color="blue lighten-2" outline>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-form v-model="isValid">
                <v-textarea
                  v-model="comment"
                  label="댓글을 입력하세요"
                  class="py-5"
                  outlined
                  clearable
                  autofocus
                  auto-grow
                  rows="7"
                  :rules="[(v) => !!v || '댓글을 적어도 1자 이상 입력해주세요!']"
                />
              </v-form>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-checkbox v-model="isSecret" label="비밀댓글" class="mx-10"></v-checkbox>
        <v-btn color="blue darken-1" text @click="onSubmit" :disabled="!isValid">확인</v-btn>
        <v-btn color="blue darken-1" text @click="closeModal">취소</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class CommentModal extends Vue {
  @Prop({ required: true, default: false }) readonly dialog!: boolean;
  @Prop({ required: true, default: false }) readonly isEdit!: boolean;

  private isValid: boolean = false;
  private isSecret: boolean = false;
  private comment: string = '';

  get title(): string {
    return this.isEdit ? '댓글 수정' : '댓글 작성';
  }

  public closeModal(): void {
    this.$emit('close-modal');
  }

  public onSubmit(): void {
    this.isEdit
      ? this.$emit('update-comment', { comment: this.comment })
      : this.$emit('create-comment', { comment: this.comment, secret: this.isSecret });
    this.closeModal();
  }
}
</script>

<style></style>

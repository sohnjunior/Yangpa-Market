<template>
  <v-container>
    <h1 class="mt-6 mb-4 sub-title">리뷰 모음</h1>

    <v-container style="width: 90%">
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-center header">제목</th>
              <th class="text-left header">작성자</th>
              <th class="text-left header">조회수</th>
              <th class="text-left header">추천수</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in reviews" :key="item.name">
              <td>
                <span @click="onClickReview(item)" id="review-title">
                  {{ item.title }}
                </span>
              </td>
              <td>{{ item.user.nickname }}</td>
              <td>{{ item.hit }}</td>
              <td>
                <v-btn color="error" icon @click="onClickLike(item)">
                  <v-icon>mdi-heart</v-icon>
                  {{ item.like }}
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <ReviewModal
        :show="showDialog"
        @close-dialog="onCloseModal"
        :title="selectedTitle"
        :writer="selectedReviewer"
        :image="selectedImage"
        :body="selectedBody"
        :rating="selectedRating"
        :like="selectedLike"
      />
    </v-container>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Review } from '../types';
import { ReviewAPI } from '../api';
import ReviewModal from '@components/Modals/ReviewModal.vue';

@Component({
  components: { ReviewModal },
})
export default class ReviewBoardView extends Vue {
  private selectedImage: string = '';
  private selectedTitle: string = '';
  private selectedReviewer: string = '';
  private selectedBody: string = '';
  private selectedRating: number = 0;
  private selectedLike: number = 0;
  private showDialog: boolean = false;
  private reviews: Review[] = [];

  async created() {
    const { data } = await ReviewAPI.fetchAllReviews();
    this.reviews = data.reviews;
  }

  public async onClickReview(content: Review): Promise<void> {
    this.showDialog = true;
    this.selectedRating = content.rating;
    this.selectedTitle = content.title;
    this.selectedReviewer = content.user.nickname;
    this.selectedImage = content.image;
    this.selectedBody = content.body;
    this.selectedLike = content.like;

    await ReviewAPI.increaseReviewHit(content.id);
  }

  public async onClickLike(content: Review): Promise<void> {
    await ReviewAPI.increaseReviewLike(content.id);
  }

  public onCloseModal(): void {
    this.showDialog = false;
  }
}
</script>

<style>
#review-title:hover {
  cursor: pointer;
}
</style>

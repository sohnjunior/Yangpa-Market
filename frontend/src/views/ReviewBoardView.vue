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

<script>
import { ReviewAPI } from '@api';
import ReviewModal from '@components/Modals/ReviewModal.vue';

export default {
  components: { ReviewModal },

  data() {
    return {
      // 선택된 게시글의 정보들 모달 전달용
      selectedImage: '',
      selectedTitle: '',
      selectedReviewer: '',
      selectedBody: '',
      selectedRating: '',
      selectedLike: '',

      // 전체 후기글 관련 데이터 호출
      showDialog: false,
      reviews: [],
    };
  },

  // 전체 게시글 호출해서 데이터 초기화하기
  async created() {
    const { data } = await ReviewAPI.fetchAllReviews();
    this.reviews = data.reviews;
  },

  methods: {
    async onClickReview(content) {
      this.showDialog = true;
      this.selectedRating = content.rating;
      this.selectedTitle = content.title;
      this.selectedReviewer = content.user.nickname;
      this.selectedImage = content.image;
      this.selectedBody = content.body;
      this.selectedLike = content.like;

      await ReviewAPI.increaseReviewHit(content.id);
    },
    async onClickLike(content) {
      await ReviewAPI.increaseReviewLike(content.id);
    },
    onCloseModal() {
      this.showDialog = false;
    },
  },
};
</script>

<style>
#review-title:hover {
  cursor: pointer;
}
</style>

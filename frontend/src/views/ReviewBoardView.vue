<template>
  <v-container>
    <h1>상품 후기</h1>

    <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">제목</th>
          <th class="text-left">작성자</th>
          <th class="text-left">조회수</th>
          <th class="text-left">추천수</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in reviews" :key="item.name">
          <td><span  @click="handleClick(item)" id="review-title">{{ item.title }}</span></td>
          <td>{{ item.user.nickname }}</td>
          <td>{{ item.hit }}</td>
          <td>
            <v-btn icon>
            <v-icon>mdi-heart</v-icon>
             {{ item.like }}
            </v-btn>
          </td>
        </tr>
      </tbody>
    </template>
    </v-simple-table>
    <review-modal :show="showDialog" @closeDialog="closeModal"
     :title="selectedTitle"
     :writer="selectedReviewer"
     :image="selectedImage"
     :body="selectedBody"
     :rating="selectedRating"
     :like="selectedLike" />
  </v-container>
</template>

<script>
import { retrueveAllReview } from '../api/index';
import reviewModal from '../components/ReviewModal.vue';

export default {
  data () {
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
    }
  },
  methods: {
    handleClick(content) {
      this.showDialog = true;

      // props 데이터 연동
      this.selectedRating = content.rating;
      this.selectedTitle = content.title;
      this.selectedReviewer = content.user.nickname;
      this.selectedImage = content.image;
      this.selectedBody = content.body;
      this.selectedLike = content.like;
    },
    closeModal() {
      this.showDialog = false;
    }
  },
  components: { reviewModal },

  // 전체 게시글 호출해서 데이터 초기화하기 
  async created() {
    const { data } = await retrueveAllReview();
    this.reviews = data.reviews;
  }
}
</script>

<style>
/* 후기글 제목 마우스 hover 효과 */
#review-title:hover {
  cursor: pointer;
}
</style>
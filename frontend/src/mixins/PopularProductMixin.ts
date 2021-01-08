import { Component, Vue } from 'vue-property-decorator';
import { RecommendationAPI } from '../api';
import { IPost } from '../types';

const MAX_ITEM_AMOUNT = 10;

@Component({})
export default class PopularProductMixin extends Vue {
  public popularItems: IPost[] = [];

  public async created() {
    try {
      const {
        data: { result },
      }: { data: { result: IPost[] } } = await RecommendationAPI.fetchPopularProducts();

      this.popularItems = this.sliceItems(result);
    } catch (err) {
      console.error(err);
    }
  }

  private sliceItems(items: IPost[]) {
    return items.slice(0, MAX_ITEM_AMOUNT);
  }
}

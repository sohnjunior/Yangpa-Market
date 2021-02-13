import { Component, Vue } from 'vue-property-decorator';
import { RecommendationAPI } from '../api';
import { IProduct } from '../types';

const MAX_ITEM_AMOUNT = 10;

@Component({})
export default class PopularProductMixin extends Vue {
  public popularItems: IProduct[] = [];

  public async created() {
    try {
      const {
        data: { products },
      } = await RecommendationAPI.fetchPopularProducts();

      this.popularItems = this.sliceItems(products);
    } catch (err) {
      console.error(err);
    }
  }

  private sliceItems(items: IProduct[]) {
    return items.slice(0, MAX_ITEM_AMOUNT);
  }
}

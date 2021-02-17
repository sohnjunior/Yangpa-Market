<template>
  <div class="image-swipper-container">
    <div class="image-wrapper">
      <div
        class="link-wrapper"
        ref="imageSwipContainer"
        @touchstart="onDragStart"
        @mousedown="onDragStart"
        @touchmove="onDrag"
        @mousemove="onDrag"
        @touchend="onDragEnd"
        @mouseup="onDragEnd"
        @mouseleave="onDragOut"
      >
        <a class="image-link" href="#" v-for="image in images" :key="image.id" draggable="false">
          <img class="product-image" alt="상품 이미지" :src="image.path" draggable="false" />
        </a>
      </div>
    </div>
    <div class="swipper-meta">
      <span>{{ pivotImageIndex + 1 }}</span>
      /
      <span>{{ totalImageCount }}</span>
    </div>
    <Icon class="next-icon" filename="next" width="25" height="25" @click="onMoveNext" />
    <Icon class="prev-icon" filename="next" width="25" height="25" @click="onMovePrev" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator';
import Icon from '@components/Common/Icon.vue';

/** MOVE_OFFSET 만큼 이동한다면 다음 이미지로 전환 */
const MOVE_OFFSET = 100;

@Component({
  components: { Icon },
})
export default class ImageSwipper extends Vue {
  @Prop({ required: true }) readonly images!: { id: number; path: string }[];

  @Ref() imageSwipContainer!: HTMLDivElement;

  private initContainerWidth!: number;
  private animationStart = false;
  private pivotImageIndex = 0;
  private initClientX!: number;
  private retouchedClientX!: number;
  private prevClientX!: number;
  private offset = 0;

  get totalImageCount() {
    return this.images.length;
  }

  public mounted() {
    this.initContainerWidth = this.imageSwipContainer.offsetWidth;
  }

  private getClientX(e: TouchEvent | MouseEvent) {
    return e instanceof TouchEvent ? e.touches[0].clientX : e.clientX;
  }

  public onDragStart(e: TouchEvent | MouseEvent) {
    const curClientX = this.getClientX(e);
    this.retouchedClientX = curClientX - this.offset;
    this.initClientX = curClientX;
    this.animationStart = true;
    this.imageSwipContainer.classList.remove('ease');
  }

  public onDrag(e: TouchEvent | MouseEvent) {
    if (!this.animationStart) return;

    const curClientX = this.getClientX(e);
    const diff = curClientX - this.retouchedClientX;

    this.imageSwipContainer.style.transform = `translateX(${diff}px)`;
    this.prevClientX = curClientX;
    this.offset = diff;
  }

  private animateImageMove(diff: number) {
    requestAnimationFrame(() => {
      this.imageSwipContainer.classList.add('ease');
      this.imageSwipContainer.style.transform = `translateX(${diff}px)`;
      this.offset = diff;
    });
  }

  private animateRollback(offset: number) {
    const diff = this.offset + offset;
    this.animateImageMove(diff);
  }

  private animateMoveNext(offset = 0) {
    const diff = this.offset - (this.initContainerWidth - offset);

    this.animateImageMove(diff);
    this.pivotImageIndex++;
  }

  private animateMovePrev(offset = 0) {
    const diff = this.offset + (this.initContainerWidth - offset);

    this.animateImageMove(diff);
    this.pivotImageIndex--;
  }

  public onDragEnd() {
    const pureOffset = this.initClientX - this.prevClientX;
    const offset = Math.abs(pureOffset);

    if (pureOffset > 0) {
      /** 오른쪽으로 이동 */
      if (offset > MOVE_OFFSET && this.pivotImageIndex < this.totalImageCount - 1) {
        this.animateMoveNext(offset);
      } else {
        this.animateRollback(offset);
      }
    } else if (pureOffset < 0) {
      /** 왼쪽으로 이동 */
      if (offset > MOVE_OFFSET && this.pivotImageIndex > 0) {
        this.animateMovePrev(offset);
      } else {
        this.animateRollback(-offset);
      }
    }

    this.animationStart = false;
  }

  public onDragOut() {
    if (this.animationStart) this.onDragEnd();
  }

  public onMoveNext() {
    const isMovable = this.pivotImageIndex < this.totalImageCount - 1;
    if (!isMovable) return;

    this.animateMoveNext();
  }

  public onMovePrev() {
    const isMovable = this.pivotImageIndex > 0;
    if (!isMovable) return;

    this.animateMovePrev();
  }
}
</script>

<style lang="scss" scoped>
.image-swipper-container {
  position: relative;

  .image-wrapper {
    height: 100%;
    overflow-x: hidden;

    .link-wrapper {
      display: flex;
      height: 100%;

      .image-link {
        flex: 0 0 auto;
        width: 100%;
        height: 100%;

        .product-image {
          width: inherit;
          height: inherit;
          border-radius: 10px;
          object-fit: cover;
        }
      }
    }
  }

  .swipper-meta {
    position: absolute;
    bottom: 10px;
    left: 50%;
    width: 70px;
    margin-left: -35px;
    padding: 5px 15px;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.3);
    font-size: 1rem;
    font-weight: 600;
    text-align: center;
    color: hsla(0, 0%, 100%, 0.7);
  }

  .next-icon {
    position: absolute;
    top: 50%;
    right: -50px;
  }

  .prev-icon {
    position: absolute;
    top: 50%;
    left: -50px;
    transform: rotate(180deg);
  }
}

.ease {
  transition: transform 0.3s ease;
}
</style>

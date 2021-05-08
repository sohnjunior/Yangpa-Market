<template>
  <ul class="alarm-container">
    <li class="item-wrapper" v-for="item in alarmItems" :key="item.id">
      <div class="meta-wrapper">
        <Icon class="icon" filename="alarm" width="25" height="25" />
        <Chip :text="item.type" width="55" />
      </div>
      <div class="content-wrapper">
        <div>
          <p class="message-wrapper" v-html="item.content" />
          <div class="action-wrapper">
            <button class="action-button approve" @click="onApprove(item.id)">승인</button>
            <button class="action-button reject" @click="onReject(item.id)">거절</button>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Icon from '@components/Common/Icon.vue';
import Chip from '@components/Common/Chip.vue';

interface IAlarmMessage {
  id: number;
  type: string;
  content: string;
}

@Component({
  components: { Icon, Chip },
})
export default class UserAlarmList extends Vue {
  @Prop({ required: true }) readonly alarmItems!: IAlarmMessage[];

  public onApprove(orderId: number) {
    this.$emit('approve-order', orderId);
  }

  public onReject(orderId: number) {
    this.$emit('reject-order', orderId);
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/mixins';

.alarm-container {
  .item-wrapper {
    @include card-border();
    padding: 20px;

    .meta-wrapper {
      display: flex;
      margin-bottom: 10px;

      .icon {
        margin-right: 10px;
      }
    }

    .content-wrapper {
      .message-wrapper {
        display: flex;
        flex-direction: column;
        margin-bottom: 15px;
      }

      .action-wrapper {
        .action-button {
          border: none;
          border-radius: 10px;
          padding: 5px 15px;
          font-size: 0.9rem;
          font-weight: 600;
          color: white;
          cursor: pointer;
        }

        .approve {
          background-color: #69db7c;
          margin-right: 10px;
        }

        .reject {
          background-color: #ff6b6b;
        }
      }
    }
  }
}
</style>

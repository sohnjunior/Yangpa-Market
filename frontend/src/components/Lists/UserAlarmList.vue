<template>
  <ul class="alarm-container">
    <li class="item-wrapper" v-for="item in alarmItems" :key="item.id">
      <Icon filename="alarm" width="25" height="25" />
      <div class="content-wrapper">
        <Chip :text="item.type" width="55" />
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
// TODO: 스타일 적용하기
.alarm-container {
  .item-wrapper {
    .content-wrapper {
      .message-wrapper {
        .message-body {
        }

        .message-footer {
        }
      }

      .action-wrapper {
        .action-button {
        }

        .approve {
        }

        .reject {
        }
      }
    }
  }
}
</style>

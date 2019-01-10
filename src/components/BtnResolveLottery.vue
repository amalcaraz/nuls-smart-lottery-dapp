<template>
  <v-btn v-if="showButtonResolve" flat color="primary" @click="$emit('click')">Resolve</v-btn>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Lottery, LotteryStatus } from '@/model/lottery';
import { getLotteryStatus } from '@/services/lottery';

@Component({})
export default class BtnResolveLottery extends Vue {
  @Prop() public lottery!: Lottery;

  public get showButtonResolve(): boolean {
    return this.lotteryStatus === LotteryStatus.WAITING_RESOLVE;
  }

  public get lotteryStatus(): LotteryStatus {
    return getLotteryStatus(this.lottery);
  }

}
</script>

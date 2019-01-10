<template>
  <v-btn v-if="showButtonBuyTickets" flat color="blue" @click="$emit('click')">Buy tickets</v-btn>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Lottery, LotteryStatus } from '@/model/lottery';
import { getLotteryStatus } from '@/services/lottery';

@Component({})
export default class BtnBuyTickets extends Vue {
  @Prop() public lottery!: Lottery;

  public get showButtonBuyTickets(): boolean {
    return this.lotteryStatus === LotteryStatus.OPEN;
  }

  public get lotteryStatus(): LotteryStatus {
    return getLotteryStatus(this.lottery);
  }

}
</script>

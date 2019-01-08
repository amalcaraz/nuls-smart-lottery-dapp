<template>
  <!-- <v-card elevation-1 :ripple="{class: 'primary--text'}" class="lottery-item"> -->
  <v-card elevation-1 class="lottery-item">
    <lottery-header :lottery="lottery"></lottery-header>
    <v-card-text class="summary-wrap pa-0">
      <lottery-summary :lottery="lottery" class="summary pa-4"></lottery-summary>
    </v-card-text>
    <v-card-actions>
      <v-btn flat color="blue" @click="onBuyTickets(lottery.id)">Buy tickets</v-btn>
      <v-btn flat color="orange" @click="onDetail(lottery.id)">View Detail</v-btn>
      <v-btn v-if="isResolveLottery" flat color="primary" @click="onResolve(lottery.id)">Resolve</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import LotteryStatusCmp from '@/components/LotteryStatus.vue';
import LotteryHeader from '@/components/LotteryHeader.vue';
import LotterySummary from '@/components/LotterySummary.vue';
import { Lottery, LotteryStatus } from '@/model/lottery';
import moment from 'moment';

@Component({
  components: {
    LotteryHeader,
    LotterySummary,
  },
})
export default class LotteryItem extends Vue {
  @Prop({ default: undefined }) public lottery!: Lottery;

  public get isResolveLottery(): boolean {

    const now = moment();
    return this.lottery.status !== LotteryStatus.CLOSE && now.isSameOrAfter(this.lottery.endTime, 'millisecond');

  }

  public onBuyTickets(id: number) {
    this.$emit('buyTickets', id);
  }

  public onDetail(id: number) {
    this.$emit('detail', id);
  }

  public onResolve(id: number) {
    this.$emit('resolve', id);
  }

}
</script>

<style lang="scss" scoped>
.summary-wrap {
  height: 250px;
  position: relative;

  .summary {
    height: 100%;
    overflow: auto;
  }

  &::after {
    pointer-events: none;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: inset 0px -25px 40px -10px #fff, inset 0px 25px 40px -10px #fff;
  }
}
</style>


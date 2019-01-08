<template>
  <!-- <v-card elevation-1 :ripple="{class: 'primary--text'}" class="lottery-item"> -->
  <v-card elevation-1 class="lottery-item">
    <lottery-header :lottery="lottery"></lottery-header>
    <!-- <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">{{lottery.title}}</h3>
        <div class="description">{{getDescription(lottery.desc)}}</div>
      </div>
    </v-card-title> -->
    <v-card-text>
      <lottery-summary :lottery="lottery"></lottery-summary>
    </v-card-text>
    <v-card-actions>
      <v-btn flat color="blue" @click="onBuyTickets(lottery.id)">Buy tickets</v-btn>
      <v-btn flat color="orange" @click="onDetail(lottery.id)">Detail</v-btn>
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

<template>
  <!-- <v-card elevation-1 :ripple="{class: 'primary--text'}" class="lottery-item"> -->
  <v-card elevation-1 class="lottery-item">
    <lottery-header :lottery="lottery"></lottery-header>
    <v-card-text class="summary-wrap pa-0">
      <lottery-summary :lottery="lottery" class="summary pa-4"></lottery-summary>
    </v-card-text>
    <v-card-actions>
      <v-btn flat color="orange" @click="onDetail(lottery.id)">View Detail</v-btn>
      <btn-buy-tickets :lottery="lottery" @click="onBuyTickets(lottery.id)"/>
      <btn-resolve-lottery :lottery="lottery" @click="onResolve(lottery.id)"/>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import LotteryHeader from '@/components/LotteryHeader.vue';
import LotterySummary from '@/components/LotterySummary.vue';
import BtnBuyTickets from '@/components/BtnBuyTickets.vue';
import BtnResolveLottery from '@/components/BtnResolveLottery.vue';
import { Lottery } from '@/model/lottery';

@Component({
  components: {
    LotteryHeader,
    LotterySummary,
    BtnBuyTickets,
    BtnResolveLottery,
  },
})
export default class LotteryItem extends Vue {
  @Prop() public lottery!: Lottery;

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


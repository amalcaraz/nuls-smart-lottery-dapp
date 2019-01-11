<template>
  <v-layout>
    <v-flex xs12 v-if="lotteryList.length > 0">   
      <v-container class="pa-0" grid-list-lg fluid>
        <v-layout row wrap>
          <v-flex xs12 sm6 lg4 v-for="lottery in lotteryListFiltered" :key="lottery.agentId">
            <div class="items-wrapper">
              <lottery-item :lottery="lottery"
                            @buyTickets="onBuyTickets($event)"
                            @detail="onDetail($event)"
                            @resolve="onResolve($event)"></lottery-item>
            </div>
          </v-flex>
          <v-flex v-if="!lotteryList || lotteryList.length === 0">
            <h4 class="headline text-xs-center">No lotteries found matching the given filter...</h4>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Lottery, LotteryStatus } from '../model/lottery';
import LotteryItem from './LotteryItem.vue';
import config from 'config';

@Component({
  components: {
    LotteryItem,
  },
})
export default class LotteryLost extends Vue {
  @Prop() public lotteryList!: Lottery[];
  @Prop({default: config.app.itemsToShowSearcher}) public itemsToShowSearcher!: number;
  public filter: string = '';

  get showSearcher(): boolean {
    return this.itemsToShowSearcher !== -1 && this.lotteryList.length > this.itemsToShowSearcher;
  }

  get lotteryListFiltered(): Lottery[] {

    let filteredLotteryList: Lottery[] = this.lotteryList;

    if (this.filter) {

      const filterLowerCased: string = this.filter.toLowerCase();

      filteredLotteryList = this.lotteryList.filter((lottery: Lottery) =>
        (lottery.title.toLowerCase().indexOf(filterLowerCased) >= 0) ||
        (lottery.desc.toLowerCase().indexOf(filterLowerCased) >= 0),
      );

    }

    filteredLotteryList.sort((a: Lottery, b: Lottery) => a.status === LotteryStatus.WAITING_RESOLVE
      ? -1
      : b.status === LotteryStatus.WAITING_RESOLVE
        ? -1
        : a.status - b.status,
    );

    return filteredLotteryList;

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

  // public onClick(lottery: Lottery) {
  //   this.$emit('selected', lottery);
  // }

}
</script>

<style lang="scss" scoped>
  .items-wrapper {
    position: relative;
  }
</style>

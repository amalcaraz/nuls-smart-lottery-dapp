<template>
  <div v-if="lottery">
    <section>
      <h2 class="title">Detail</h2>
      <v-container grid-list-md text-xs-left>
        <v-layout row wrap fill-height>
          <v-flex xs12 sm5 >
            <lottery-header class="lottery-header" :lottery="lottery"></lottery-header>
          </v-flex>
          <v-flex xs12 sm7>
            <lottery-summary :lottery="lottery"></lottery-summary>
          </v-flex>
        </v-layout>
      </v-container>
    </section>
    <section>
      <h2 class="title">Tickets</h2>
      <ticket-list
        v-if="ticketList.length > 0"
        :ticketList="ticketList"
        :ticketPrice="lottery.ticketPrice"
        @buyTickets="onBuyTickets($event)"
      ></ticket-list>
      <div v-else>No tickets sold
        <v-btn flat color="blue" @click="onBuyTickets(lottery.id)">Buy tickets</v-btn>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { LotteryDetail as Detail, LotteryTicket } from '../model/lottery';
import TicketList from './TicketList.vue';
import LotteryHeader from './LotteryHeader.vue';
import LotterySummary from './LotterySummary.vue';
import { address, na } from '@/model/common';
import { nulsWorldAddressUrl, getPrize } from '../services/utils';

@Component({
  components: {
    TicketList,
    LotteryHeader,
    LotterySummary,
  },
})
export default class LotteryDetail extends Vue {
  @Prop() public lottery!: Detail;

  public getAddressUrl = (addr: address): string  => nulsWorldAddressUrl(addr);

  public getDescription = (desc: string): string  => desc.length < 100 ? desc : (desc.substr(0, 100) + '...');

  public getPrize = (lottery: Detail, prizeIndex: number): na => getPrize(lottery, prizeIndex);

  // TODO: Make this in the smart contract
  public get ticketList(): LotteryTicket[] {
    return Object.values(this.lottery.ticketMap);
  }

  public onBuyTickets(id: number) {
    this.$emit('buyTickets', id);
  }

}
</script>

<style lang="scss" scoped>
.lottery-header {
  height: 100%;
  &::before {
    box-shadow: inset 0px 0px 10px 5px #fafafa;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: "";
  }
}
</style>

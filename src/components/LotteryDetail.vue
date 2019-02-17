<template>
  <div v-if="lottery">
    <section>
      <!-- <h2 class="title">Detail</h2> -->
      <v-container class="pa-0" grid-list-lg text-xs-left>
        <v-layout row wrap fill-height>
          <v-flex xs12 sm6 md6>
            <lottery-header class="lottery-header" :lottery="lottery" :fullDesc="true"></lottery-header>
          </v-flex>
          <v-flex xs12 sm6 md6>
            <v-card elevation="0">
              <v-card-text>
                <lottery-summary :lottery="lottery"></lottery-summary>                
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </section>
    <section>
      <h2 class="title">Tickets</h2>
      <v-container class="pa-0">
        <v-layout>
          <v-flex>
            <ticket-list
              v-if="ticketList.length > 0"
              :ticketList="ticketList"
              :ticketPrice="lottery.ticketPrice"
            ></ticket-list>
            <div v-else>No tickets sold</div>
            <btn-buy-tickets :lottery="lottery" @click="onBuyTickets(lottery.id)"/>
          </v-flex>
        </v-layout>
      </v-container>
    </section>
    <section>
      <lottery-result :lottery="lottery"></lottery-result>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { LotteryDetail as Detail, LotteryTicket } from '../model/lottery';
import TicketList from './TicketList.vue';
import LotteryHeader from './LotteryHeader.vue';
import LotterySummary from './LotterySummary.vue';
import BtnBuyTickets from '@/components/BtnBuyTickets.vue';
import LotteryResult from '@/components/LotteryResult.vue';
import { address, na } from '@/model/common';
import { nulsWorldAddressUrl } from '../services/utils';

@Component({
  components: {
    TicketList,
    LotteryHeader,
    LotterySummary,
    BtnBuyTickets,
    LotteryResult,
  },
})
export default class LotteryDetail extends Vue {
  @Prop() public lottery!: Detail;

  public getAddressUrl = (addr: address): string  => nulsWorldAddressUrl(addr);

  public getDescription = (desc: string): string  => desc.length < 100 ? desc : (desc.substr(0, 100) + '...');

  // TODO: Make this in the smart contract
  public get ticketList(): LotteryTicket[] {
    return this.lottery.ticketMap ? Object.values(this.lottery.ticketMap) : [];
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
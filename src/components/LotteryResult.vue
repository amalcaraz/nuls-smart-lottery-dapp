<template>
  <div v-if="showLotteryResult">
    <h2 class="title">Winners</h2>
    <v-container class="pa-0">
      <v-layout>
        <v-flex>
          <winner-list
            v-if="winnerList.length > 0"
            :winnerList="winnerList"
            :ticketPrice="lottery.ticketPrice"
          ></winner-list>
          <div v-else>
            <p>This lottery finished without reaching the minimum participation of <strong>{{lottery.minParticipants}} tickets</strong>. <br/>
            A total of <strong>{{ticketList.length}} tickets</strong> were sold <span v-if="lottery.totalPot > 0">, a refund was done to all participants</span></p>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { LotteryDetail as Detail, LotteryTicket } from '../model/lottery';
import { Lottery, LotteryStatus } from '@/model/lottery';
import WinnerList from './WinnerList.vue';

@Component({
  components: {
    WinnerList,
  },
})
export default class LotteryResult extends Vue {
  @Prop() public lottery!: Detail;

  public get showLotteryResult(): boolean {
    return this.lottery.status === LotteryStatus.CLOSED;
  }

  public get winnerList(): LotteryTicket[] {
    return this.ticketList.filter((ticket: LotteryTicket) => ticket.prize > 0).sort((a: LotteryTicket, b: LotteryTicket) => a.prize - b.prize);
  }

  // TODO: Make this in the smart contract
  public get ticketList(): LotteryTicket[] {
    return this.lottery.ticketMap ? Object.values(this.lottery.ticketMap) : [];
  }

}
</script>

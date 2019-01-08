<template>
  <div>
    <div><strong>Status: </strong><span class="grey--text">{{lottery.status | lotteryStatus}}</span></div>
    <!-- TODO: Participants progress bar instead of min participants -->      
    <div><strong>Remaining tickets before start: </strong><span class="grey--text">{{lottery.minParticipants}}</span></div>
    <div><strong>Start date: </strong><span class="grey--text">{{lottery.startTime | date}}</span></div>
    <div><strong>End date: </strong><span class="grey--text">{{lottery.endTime | date}}</span></div>

    <template v-if="lottery.supportAddress && lottery.supportPercentage">
      <div class="address"><strong>Support address: </strong><a class="grey--text" target="_blank" :href="getAddressUrl(lottery.supportAddress)">{{lottery.supportAddress}}</a></div>
      <div><strong>Support percentage: </strong><span class="grey--text">{{lottery.supportPercentage}}</span></div>
    </template>
    
    <div><strong>Ticket price: </strong><span class="grey--text">{{lottery.ticketPrice | nulsCurrency}} <i class="nuls"></i></span></div>
    <div><strong>Tickets sold: </strong><span class="grey--text">{{lottery.ticketsCount}}</span></div>
    <div><strong>Initial pot: </strong><span class="grey--text">{{lottery.initialPot | nulsCurrency}} <i class="nuls"></i></span></div>
    <div><strong>Total collected: </strong><span class="grey--text">{{lottery.totalPot | nulsCurrency}} <i class="nuls"></i></span></div>

    <div><strong>1 Prize: </strong><span class="grey--text"> {{getPrize(lottery, 1) | nulsCurrency}} <i class="nuls"></i></span></div>
    
    <template v-if="lottery.secondPrizes">
      <div><strong>2 Prize: </strong><span class="grey--text"> {{getPrize(lottery, 2) | nulsCurrency}} <i class="nuls"></i></span></div>
      <div><strong>3 Prize: </strong><span class="grey--text"> {{getPrize(lottery, 3) | nulsCurrency}} <i class="nuls"></i></span></div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Lottery } from '../model/lottery';
import { nulsWorldAddressUrl, getPrize } from '../services/utils';
import { address, na } from '@/model/common';

@Component({})
export default class LotterySummary extends Vue {
  @Prop() public lottery!: Lottery;

  public getAddressUrl = (addr: address): string  => nulsWorldAddressUrl(addr);

  public getPrize = (lottery: Lottery, prizeIndex: number): na => getPrize(lottery, prizeIndex);

}
</script>

<style lang="scss" scoped>
strong {
  font-weight: 400;
}

.address {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  width: 100%;
}
</style>


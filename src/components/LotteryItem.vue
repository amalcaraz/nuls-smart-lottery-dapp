<template>
  <v-card elevation-1 :ripple="{class: 'primary--text'}" class="lottery-item">
     <v-img
          :src="`https://picsum.photos/400/200?blur&amp;image=${lottery.id + 100}`"
          aspect-ratio="2.2"
        ></v-img>
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">{{lottery.title}}</h3>
        <div class="description">{{getDescription(lottery.desc)}}</div>
      </div>
    </v-card-title>
    <v-card-text>
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

    </v-card-text>
    <v-card-actions>
      <v-btn flat color="blue">Buy tickets</v-btn>
      <v-btn flat color="primary">Resolve</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import LotteryStatusCmp from '@/components/LotteryStatus.vue';
import { Lottery } from '@/model/lottery';
import { nulsWorldAddressUrl } from '../services/utils';
import { address, na } from '@/model/common';

@Component({
  components: {
    LotteryStatusCmp,
  },
})
export default class LotteryItem extends Vue {
  @Prop({ default: undefined }) public lottery!: Lottery;

  public getAddressUrl = (addr: address): string  => nulsWorldAddressUrl(addr);

  public getDescription = (desc: string): string  => desc.length < 100 ? desc : (desc.substr(0, 100) + '...');

  public getPrize(lottery: Lottery, prizeIndex: number): na {

    let totalPrize: na = lottery.totalPot;
    const prizes: na[] = [totalPrize, 0, 0];

    if (lottery.supportAddress) {
      totalPrize -= Math.ceil(totalPrize * lottery.supportPercentage / 100);
      prizes[0] = totalPrize;
    }

    if (lottery.secondPrizes) {

      prizes[1] = Math.ceil(totalPrize * 25 / 100);
      prizes[2] = Math.ceil(totalPrize * 10 / 100);

      prizes[0] = prizes[0] - prizes[1] - prizes[2];

    }

    return prizes[prizeIndex - 1];

  }

}
</script>

<style lang="scss" scoped>
.lottery-item {
  cursor: pointer;

  strong {
    font-weight: 400;
  }

  .description {
    height: 42px;
  }

  .address {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    width: 100%;
  }
}
</style>

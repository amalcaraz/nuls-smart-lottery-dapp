<template>
  <v-list two-line subheader>
    <!-- <v-subheader inset>All tickets</v-subheader> -->
    <template v-for="(ticket, index) in winnerList">
      <v-list-tile :key="ticket.id" avatar>
        <v-list-tile-avatar>
          <v-icon large :class="`icon prize-${ticket.prize}`">{{getPrizeIcon(ticket.prize)}}</v-icon>
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title><strong>{{getPrizeName(ticket.prize)}}</strong></v-list-tile-title>
          <v-list-tile-sub-title><strong>Prize: </strong>{{ ticket.prizeAmount | nulsCurrency}} <i class="nuls"></i>, <strong>Ticket id: </strong>{{ ticket.id }}</v-list-tile-sub-title>
          <v-list-tile-sub-title><strong>Owner: </strong><a class="grey--text" target="_blank" :href="getAddressUrl(ticket.owner)">{{ ticket.owner }}</a></v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-divider
          v-if="index + 1 < Object.keys(winnerList).length"
          :key="index"
        ></v-divider>
    </template>
  </v-list>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { LotteryTicket } from '@/model/lottery';
import { address, na } from '@/model/common';
import { nulsWorldAddressUrl } from '../services/utils';

@Component({})
export default class WinnerList extends Vue {
  @Prop({ default: 0 }) public ticketPrice!: na;
  @Prop() public winnerList!: LotteryTicket[];

  public getPrizeIcon(prize: number): string {
    switch (prize) {
      case 1:
        return 'star';
      case 2:
        return 'star_half';
      case 3:
      default:
        return 'star_border';
    }
  }

  public getPrizeName(prize: number): string {
    switch (prize) {
      case 1:
        return 'First prize';
      case 2:
        return 'Second prize';
      case 3:
      default:
        return 'Third prize';
    }
  }

  public getAddressUrl = (addr: address): string  => nulsWorldAddressUrl(addr);

}
</script>

<style lang="scss" scoped>
.icon {
  &.prize {
    &-1 {
      color: #FFD700;
    }
    &-2 {
      color: #C0C0C0;
    }
    &-3 {
      color: #cd7f32;
    }
  }
}
strong {
  font-weight: 500;
}
</style>

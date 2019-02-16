<template>
  <v-list two-line subheader>

    <!-- <v-subheader inset>All tickets</v-subheader> -->
    <template v-for="(ticket, key, index) in groupedTickets">
      <v-list-tile :key="ticket.id" avatar>
        <v-list-tile-avatar>
          <v-icon large color="blue">receipt</v-icon>
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title><strong>Owner: </strong><a class="grey--text" target="_blank" :href="getAddressUrl(ticket.owner)">{{ ticket.owner }}</a></v-list-tile-title>
          <v-list-tile-sub-title><strong>Tickets: </strong>{{ ticket.tickets }}, <strong>Invested: </strong>{{ ticket.betted | nulsCurrency}} <i class="nuls"></i></v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-divider
          v-if="index + 1 < Object.keys(groupedTickets).length"
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

interface AggregatedTicket {
  owner: address;
  tickets: number;
  prizes: number[];
  betted: na;
}

@Component({})
export default class TicketList extends Vue {
  @Prop({ default: 0 }) public ticketPrice!: na;
  @Prop() public ticketList!: LotteryTicket[];

  public getAddressUrl = (addr: address): string  => nulsWorldAddressUrl(addr);

  public get groupedTickets(): Record<address, AggregatedTicket> {

    return this.ticketList.reduce((prev: Record<address, AggregatedTicket>, curr: LotteryTicket) => {

      if (!prev[curr.owner]) {
        prev[curr.owner] = {
          owner: curr.owner,
          tickets: 0,
          prizes: [],
          betted: 0,
        };
      }

      prev[curr.owner].tickets++;
      prev[curr.owner].betted += this.ticketPrice;

      if (curr.prize) {
        prev[curr.owner].prizes.push(curr.prize);
      }

      return prev;

    }, {});

  }

}
</script>

<style lang="scss" scoped>
strong {
  font-weight: 500;
}
</style>

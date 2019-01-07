<template>
  <div class="buy-tickets">
    <v-layout>
      <v-flex>
       <buy-tickets-form :lottery="lottery($route.params.lottery)"
                         @cancel="onCancelForm"
                         @submit="onBuyTickets"></buy-tickets-form>
      </v-flex>
    </v-layout>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BuyTicketsForm from '../components/BuyTicketsForm.vue';
import { Lottery, BuyTicketsModel } from '@/model/lottery';
import { mapGetters } from 'vuex';

@Component({
   computed: {
    ...mapGetters('lottery', ['lotteryList', 'lottery']),
  },
  components: {
    BuyTicketsForm,
  },
})
export default class BuyTickets extends Vue {

  public async onBuyTickets(tickets: BuyTicketsModel) {
    await this.$store.dispatch('lottery/buyTickets', tickets);
    this.$router.push({ name: 'home' });
  }

  public onCancelForm() {
    this.$router.push({ name: 'home' });
  }

}
</script>
 
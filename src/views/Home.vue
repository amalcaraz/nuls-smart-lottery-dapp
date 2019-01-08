<template>
  <div class="home">
    <v-layout wrap justify-space-around>
      <div v-if="!lotteryList || lotteryList.length === 0">
        <h4 class="headline text-xs-center">There are no lotteries yet. <br/> Create the first one!</h4>
      </div>
      <lottery-list v-else
        :lotteryList="lotteryList"
        @buyTickets="onBuyTickets"
        @detail="onDetail"
        ></lottery-list>
    </v-layout>
    <v-btn :to="{name: 'new-lottery'}" absolute dark fab bottom right color="primary">
      <v-icon>add</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import LotteryList from '../components/LotteryList.vue';

@Component({
  computed: {
    ...mapGetters('lottery', ['lotteryList']),
  },
  components: {
    LotteryList,
  },
})
export default class HomeView extends Vue {

  public onBuyTickets(id: number) {
    this.$router.push({ name: 'buy-tickets', params: { lottery: id.toString() } });
  }

  public onDetail(id: number) {
    this.$router.push({ name: 'lottery-detail', params: { lottery: id.toString() } });
  }

}
</script>
 
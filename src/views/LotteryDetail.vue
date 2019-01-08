<template>
  <div class="lottery-detail">
    <v-layout>
      <v-flex>
        <lottery-detail 
          :lottery="lottery($route.params.lottery)"
          @buyTickets="onBuyTickets($event)"
        ></lottery-detail>
      </v-flex>
    </v-layout>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import LotteryDetail from '../components/LotteryDetail.vue';

@Component({
  computed: {
    ...mapGetters('lottery', ['lottery']),
  },
  components: {
    LotteryDetail,
  },
})
export default class LotteryDetailView extends Vue {

  public onBuyTickets(id: number) {
    this.$router.push({ name: 'buy-tickets', params: { lottery: id.toString() } });
  }

}
</script>
 
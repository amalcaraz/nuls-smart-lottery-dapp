<template>
  <div class="new-lottery">
    <v-layout justify-center>
      <v-flex xs12 sm9 lg7>
        <new-lottery-form 
          @cancel="onCancelForm"
          @submit="onNewLottery"
        ></new-lottery-form>
      </v-flex>
    </v-layout>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NewLotteryForm from '../components/NewLotteryForm.vue';
import { Lottery, NewLotteryModel } from '@/model/lottery';

@Component({
  components: {
    NewLotteryForm,
  },
})
export default class NewLotteryView extends Vue {

  public async onNewLottery(lottery: NewLotteryModel) {
    await this.$store.dispatch('lottery/newLottery', lottery);
    this.$router.push({ name: 'home' });
  }

  public onCancelForm() {
    this.$router.back();
  }

}
</script>
 
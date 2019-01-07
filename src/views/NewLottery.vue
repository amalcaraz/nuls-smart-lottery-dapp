<template>
  <div class="new-lottery">
    <v-layout>
      <v-flex>
       <new-lottery-form @cancel="onCancelForm"
                         @lottery="onNewLottery"></new-lottery-form>
      </v-flex>
    </v-layout>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NewLotteryForm from '../components/NewLotteryForm.vue';
import { Lottery } from '@/model/lottery';

@Component({
  components: {
    NewLotteryForm,
  },
})
export default class NewLottery extends Vue {

  public async onNewLottery(lottery: NewLotteryForm) {
    await this.$store.dispatch('lottery/newLottery', lottery);
    this.$router.push({ name: 'home' });
  }

  public onCancelForm() {
    this.$router.push({ name: 'home' });
  }

}
</script>
 
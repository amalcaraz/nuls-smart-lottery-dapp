<template>
  <v-btn v-if="showButtonResolve" flat color="primary" @click="$emit('click')">Resolve</v-btn>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Lottery, LotteryStatus } from '@/model/lottery';

@Component({})
export default class BtnResolveLottery extends Vue {
  @Prop() public lottery!: Lottery;

  public get showButtonResolve(): boolean {
    return this.lottery.status === LotteryStatus.WAITING_RESOLVE;
  }

}
</script>

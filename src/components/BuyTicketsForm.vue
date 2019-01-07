<template>
  <v-form @submit.prevent="onSubmit" v-model="valid" ref="form">
    <v-card>
      <v-card-title class="title">
        Buy tickets of "{{lottery.title}}"
      </v-card-title>
      <v-card-text>
        <v-text-field
          label="Number of tickets"
          v-model="modelLottery.ticketsCount"
          :min="1"
          :step="1"
          type="number"
          :rules="ticketsCountRules"
          required
        ></v-text-field>
        <div class="mt-2">
          <div><strong>Ticket price: </strong><span class="grey--text">{{lottery.ticketPrice | nulsCurrency}} <i class="nuls"></i></span></div>
          <div v-if="totalPrize"><strong>Total price: </strong><span class="grey--text">{{totalPrize | nulsCurrency}} <i class="nuls"></i></span></div>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="error" flat @click.stop="onCancel">Cancel</v-btn>
        <v-btn color="warning" flat @click.stop="$refs.form.reset()">Reset</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" type="submit" :disabled="!valid">{{!valid ? 'Submit' : `Buy ${modelLottery.ticketsCount} tickets`}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { BuyTicketsModel, Lottery } from '@/model/lottery';
import { nulsToNa, naToNuls } from '../services/utils';
import { na } from '@/model/common';

@Component({})
export default class NewLotteryForm extends Vue {

  @Prop() public lottery!: Lottery;

  public valid: boolean = false;
  public modelLottery: Record<keyof BuyTicketsModel, string> = {
    ticketsCount: undefined,
  } as any;

  public get totalPrize(): na {
    return this.lottery ? this.lottery.ticketPrice * parseInt(this.modelLottery.ticketsCount, 10) : 0;
  }

  public requiredRules: any = [
    (value: string) => value !== undefined || 'This field is required',
  ];

  public ticketsCountRules: any = [
    (value: string) => (parseFloat(value) > 0 && parseFloat(value) % 1 === 0) || 'Should an integer greater than 0',
    this.requiredRules[0],
  ];

  public onCancel() {
    this.$emit('cancel');
    this.clearForm();
  }

  public onSubmit() {
    if (this.valid) {
      this.$emit('submit', this.getResponse());
      // this.clearForm();
    }
  }

  private clearForm() {
    (this.$refs.form as any).reset();
  }

  private getResponse(): BuyTicketsModel {
    const response: BuyTicketsModel = {
      id: this.lottery.id,
      ticketPrice: this.lottery.ticketPrice,
      ticketsCount: parseInt(this.modelLottery.ticketsCount, 10),
    };

    return response;
  }
}
</script>


<style lang="scss" scoped>
strong {
  font-weight: 400;
}
</style>

<template>
  <v-form @submit.prevent="onSubmit" v-model="valid" ref="form">
    <v-card>
      <v-card-title class="title">
        New lottery
      </v-card-title>
      <v-card-text>
        <v-text-field
          label="Title"
          v-model="modelLottery.title"
          type="text"
          :rules="requiredRules"
          required
        ></v-text-field>
        <v-textarea
          label="Description"
          v-model="modelLottery.desc"
          :rules="requiredRules"
          required
        ></v-textarea>
        <date-time-picker-dialog-field v-model="modelLottery.startTime"
                                       label="Start Date"></date-time-picker-dialog-field>
        <date-time-picker-dialog-field v-model="modelLottery.endTime"
                                       label="End Date"></date-time-picker-dialog-field>
        <v-text-field
          label="Price per ticket (in NULS)"
          v-model="modelLottery.ticketPrice"
          min="0"
          step=".01"
          type="number"
          :rules="amountRules"
          required
        ></v-text-field>
        <v-text-field
          label="Initial prize (will be deducted from your balance)"
          v-model="modelLottery.initialPot"
          min="0"
          step=".01"
          type="number"
          :rules="initialPrizeRules"
          required
        ></v-text-field>
        <v-text-field
          label="Minimun number of participants to start the lottery (default 10)"
          v-model="modelLottery.minParticipants"
          min="10"
          step="1"
          type="number"
          :rules="minParticipantsRules"
          required
        ></v-text-field>
        <v-switch
          label="Second and third prizes"
          color="primary"
          v-model="modelLottery.secondPrizes"
        ></v-switch>
        <v-switch
          label="Support (to donate a % of the total prize)"
          color="primary"
          v-model="supportSwitch"
        ></v-switch>
        <div v-if="supportSwitch">
          <v-text-field
            label="Support address"
            v-model="modelLottery.supportAddress"
            type="text"
            :rules="addressRules"
            :required="supportSwitch"
          ></v-text-field>
          <v-text-field
            label="Support percentage of the total prize"
            v-model="modelLottery.supportPercentage"
            min="0"
            max="100"
            step="1"
            type="number"
            :rules="percentageRules"
            :required="supportSwitch"
          ></v-text-field>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="error" flat @click.stop="onCancel">Cancel</v-btn>
        <v-btn color="warning" flat @click.stop="$refs.form.reset()">Reset</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" type="submit" :disabled="!valid">Create lottery</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { NewLotteryModel } from '@/model/lottery';
import { isValidAddress, nulsToNa } from '../services/utils';
import DateTimePickerDialogField from './DateTimePickerDialogField.vue';
import moment from 'moment';

@Component({
  components: {
    DateTimePickerDialogField,
  },
})
export default class NewLotteryForm extends Vue {

  public valid: boolean = false;
  public supportSwitch: boolean = false;
  public modelLottery: Record<keyof NewLotteryModel, string> = {
    minParticipants: 10,
    initialPot: 0,
    secondPrizes: false,
  } as any;

  public requiredRules: any = [
    (value: string) => value !== undefined || 'This field is required',
  ];

  public addressRules: any = [
    (value: string) => isValidAddress(value) || 'Invalid address',
    this.requiredRules[0],
  ];

  public percentageRules: any = [
    (value: string) => (parseFloat(value) > 0 && parseFloat(value) <= 100) || 'Percentage should be > 0 and <= 100',
    this.requiredRules[0],
  ];

  public amountRules: any = [
    (value: string) => (parseFloat(value) > 0) || 'Should be greater than 0',
    this.requiredRules[0],
  ];

  public initialPrizeRules: any = [
    (value: string) => (parseFloat(value) >= 0) || 'Should be greater or equal than 0',
    this.requiredRules[0],
  ];

  public minParticipantsRules: any = [
    (value: string) => (parseFloat(value) >= 10) || 'Should be greater than 10',
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

  private getResponse(): NewLotteryModel {
    const response: NewLotteryModel = {
      ...this.modelLottery,
      ticketPrice: parseFloat(this.modelLottery.ticketPrice), // nulsToNa is done in the contract
      initialPot: nulsToNa(parseFloat(this.modelLottery.initialPot)),
      minParticipants: parseInt(this.modelLottery.minParticipants, 10),
      startTime: moment(this.modelLottery.startTime).clone().valueOf(),
      endTime: moment(this.modelLottery.endTime).clone().valueOf(),
      secondPrizes: (this.modelLottery.secondPrizes as any),
      supportAddress: undefined,
      supportPercentage: undefined,
    };

    if (this.supportSwitch) {

      response.supportAddress = this.modelLottery.supportAddress;
      response.supportPercentage = parseFloat(this.modelLottery.supportPercentage);

    }

    return response;
  }
}
</script>
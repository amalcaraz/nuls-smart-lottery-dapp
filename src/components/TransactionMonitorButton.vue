<template>
  <v-btn flat icon class="mr-2" color="grey darken-2" @click="onClick">
    <v-badge :value="show" overlap right :color="badgeColor">
      <v-icon v-if="badgeIcon" slot="badge" dark small>{{badgeIcon}}</v-icon>
      <span v-if="!badgeIcon" slot="badge">{{this.pendingTransactions.length}}</span>
      <!-- Material font is bugged for this icon -->
      <v-icon large color="" :style="{width: '36px', 'text-indent': '144px', overflow: 'hidden'}">swap_vertical</v-icon>
    </v-badge>
  </v-btn>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { TransactionStatus } from '../store/modules/transactionMonitor';

@Component({})
export default class TransactionMonitorButton extends Vue {
  @Prop() public transactions!: TransactionStatus[];

  public get show() {
    return this.pendingTransactions.length > 0 || this.minedTransactions.length > 0;
  }

  public get badgeIcon(): string | null {
    if (this.pendingTransactions.length > 0) {
      return null;
    } else if (this.minedTransactions.length > 0) {
      return 'check';
    } else if (this.minedTransactions.length > 0) {
      return 'error';
    }
    return null;
  }

  public get badgeColor(): string {
    if (this.pendingTransactions.length > 0) {
      return 'orange';
    } else if (this.minedTransactions.length > 0) {
      return 'success';
    } else if (this.minedTransactions.length > 0) {
      return 'error';
    }
    return 'success';
  }

  public get minedTransactions(): TransactionStatus[] {
    return this.transactions.filter((tx) => tx.status === 'mined');
  }

  public get pendingTransactions(): TransactionStatus[] {
    return this.transactions.filter((tx) => tx.status === 'pending');
  }

  public get errorTransactions(): TransactionStatus[] {
    return this.transactions.filter((tx) => tx.status === 'error');
  }

  public onClick() {
    this.$emit('click');
  }

}
</script>

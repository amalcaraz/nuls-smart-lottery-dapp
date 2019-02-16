<template>
  <v-layout row justify-center>
    <v-dialog :value="open" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark content color="primary">
          <v-btn icon dark @click="onClose">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Transaction monitor</v-toolbar-title>
        </v-toolbar>
        <v-list v-if="transactions.length > 0" three-line subheader>
          <v-list-tile v-for="tx in pendingTransactions" :key="tx.hash" avatar>
            <v-list-tile-action>
              <v-icon x-large color="orange">play_circle_filled</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="orange--text">{{tx.title}}</v-list-tile-title>
              <v-list-tile-sub-title><strong>Date: </strong>{{tx.date | date}}</v-list-tile-sub-title>
              <v-list-tile-sub-title><strong>Pending Tx hash: </strong>{{tx.hash}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile  v-for="tx in minedTransactions" :key="tx.hash" avatar>
            <v-list-tile-action>
              <v-icon x-large color="success">check_circle</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="success--text">{{tx.title}}</v-list-tile-title>
              <v-list-tile-sub-title><strong>Block hash: </strong>{{tx.blockHeight}}</v-list-tile-sub-title>
              <v-list-tile-sub-title><strong>Tx hash: </strong><a class="grey--text" target="_blank" :href="getTransactionUrl(tx.hash)">{{tx.hash}}</a></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile  v-for="tx in errorTransactions" :key="tx.hash" avatar>
            <v-list-tile-action>
              <v-icon x-large color="error">error</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="error--text">{{tx.title}}</v-list-tile-title>
              <v-list-tile-sub-title><strong>Error: </strong>{{tx.error}}</v-list-tile-sub-title>
              <v-list-tile-sub-title v-if="isHash(tx.hash)"><strong>Pending Tx hash: </strong>{{tx.hash}}</v-list-tile-sub-title>
              <v-list-tile-sub-title v-else><strong>Date: </strong>{{tx.date | date}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-card-title v-else primary-title>
          <div>
            <h3 class="headline ma-0">There are no transactions yet</h3>
            <div>Here you will see the status of all the transactions sent to nuls blockchain</div>
          </div>
        </v-card-title>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { TransactionStatus } from '../store/modules/transactionMonitor';
import { nulsWorldTransactionUrl, nulsWorldBlockUrl } from '../services/utils';

@Component({})
export default class TransactionMonitor extends Vue {
  @Prop() public transactions!: TransactionStatus[];
  @Prop() public open!: boolean;

  public get pendingTransactions(): TransactionStatus[] {
    return this.transactions.filter((tx) => tx.status === 'pending');
  }

  public get minedTransactions(): TransactionStatus[] {
    return this.transactions.filter((tx) => tx.status === 'mined');
  }

  public get errorTransactions(): TransactionStatus[] {
    return this.transactions.filter((tx) => tx.status === 'error');
  }

  public isHash(hash: string) {
    return hash.length >= 68 ? true : false;
  }

  public getTransactionUrl = (addr: string): string  => nulsWorldTransactionUrl(addr);

  public getBlockUrl = (addr: string): string  => nulsWorldBlockUrl(addr);

  public onClose() {
    this.$emit('close');
  }
}
</script>

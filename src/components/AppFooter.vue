<template>
  <v-footer height="auto">
    <v-container>
      <v-layout wrap>
        <v-flex xs12 sm6 class="mb-3">
          <strong class="subheading">Angel Manzano <span class="caption grey--text">&copy; 2018</span></strong>
          <div class="caption">Contract Address: <a :href="contractAddressUrl" target="_blank" class="grey--text">{{contractAddress}}</a></div>
          <div class="caption">Net: <span class="grey--text">{{net}} (1.2.0-beta1)</span></div>
        </v-flex>
        <v-flex xs12 sm6 class="text-sm-right">
          <strong class="subheading">Donation address</strong>
          <div class="caption">Nuls: <a href="https://nuls.world/addresses/NsdvprVBQbZLRnXPKiZFBzUbgnnHqi3d" target="_blank" class="grey--text">NsdvprVBQbZLRnXPKiZFBzUbgnnHqi3d</a></div>
          <div class="caption">Btc: <span class="grey--text">1HZNA6VhuLmQrCE77hurCQwx4cNnj4Avg5</span></div>            
          <div class="caption">Eth: <span class="grey--text">0x164f78f362f2be22212c23ce427110a18e2e6b5e</span></div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-footer>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { NulsAccount } from '@/model/common';
import { nulsWorldAddressUrl } from '../services/utils';
import config from 'config';

@Component({})
export default class AppFooter extends Vue {
  public contractAddress: string = config.app.contractAddress;
  public net: string = config.app.net;
  public contractAddressUrl: string = nulsWorldAddressUrl(this.contractAddress, true);
}
</script>

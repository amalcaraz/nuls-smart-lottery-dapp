<template>
  <v-toolbar id="app-header" app fixed clipped-left class="pa-0">
    <v-container class="py-0 app-toolbar__container">
      <v-layout align-center>
        <v-btn flat icon :to="{name: 'home'}" color="transparent" :ripple="false">
          <i id="nuls-logo" class="nuls primary--text"></i>
        </v-btn>
        <v-toolbar-title class="app-title">
          <template v-if="routeTitle">{{routeTitle}}</template>
          <template v-else>Nuls Smart Lottery</template>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <transaction-monitor-button :transactions="transactions" @click="onOpenMonitor"></transaction-monitor-button>
        <account-menu :account="account" @logout="onLogout"></account-menu>
      </v-layout>
    </v-container>
  </v-toolbar>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { NulsAccount } from '../model/common';
import AccountMenu from './AccountMenu.vue';
import TransactionMonitorButton from './TransactionMonitorButton.vue';

@Component({
  components: {
    AccountMenu,
    TransactionMonitorButton,
  },
})
export default class AppHeader extends Vue {
  @Prop() public routeTitle!: string;
  @Prop() public account!: NulsAccount;
  @Prop() public transactions!: any;

  public onOpenMonitor() {
    this.$emit('openMonitor');
  }

  public onLogout() {
    this.$emit('logout');
  }
}
</script>

<style lang="scss" scoped>
#app-header {
  .app-title {
    margin-left: 0;
  }

  .app-toolbar__container {
    margin: 0 auto;
  }

  .v-toolbar__content {
    padding: 0;
  }

  #nuls-logo {
    width: 100%;
    height: 40px;
  }
}
</style>

<template>
  <v-toolbar app fixed clipped-left class="pa-0">
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
        <v-btn v-if="!account && $route.name !== 'login'" flat :to="{name: 'login'}">
          <v-icon class="mr-1">power_settings_new</v-icon>Login
        </v-btn>
        <account-menu v-if="!!account" :account="account" @logout="onLogout"></account-menu>
      </v-layout>
    </v-container>
  </v-toolbar>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { NulsAccount } from '@/model/common';
import AccountMenu from './AccountMenu.vue';
import { nulsWorldAddressUrl } from '../services/utils';
import config from 'config';

@Component({
  components: {
    AccountMenu,
  },
})
export default class AppHeader extends Vue {
  @Prop() public routeTitle!: string;
  @Prop() public account!: string;

  public onLogout() {
    this.$emit('logout');
  }
}
</script>

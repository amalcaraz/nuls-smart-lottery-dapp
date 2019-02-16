<template>
  <div>
    <v-btn v-if="!account && $route.name !== 'login'" flat :to="{name: 'login'}">
      <v-icon class="mr-1">power_settings_new</v-icon>Login
    </v-btn>
    <v-layout v-if="!!account" align-center>
      <v-flex><v-icon large>account_circle</v-icon></v-flex>
      <v-flex class="ml-1"><span>{{ account.address }}</span></v-flex>
      <v-flex>
        <v-btn icon ripple @click="onLogout"><v-icon color="grey lighten-1">exit_to_app</v-icon></v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { NulsAccount } from '@/model/common';

@Component({})
export default class AccountMenu extends Vue {
  @Prop() public account!: NulsAccount;

  public onLogout() {
    this.$emit('logout');
  }
}
</script>

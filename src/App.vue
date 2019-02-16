<template>
  <v-app id="app">
    <app-header
      :routeTitle="routeTitle"
      :account="account"
      :transactions="transactions"
      @logout="logout"
      @openMonitor="setMonitor(true)"
    ></app-header>
    <v-content>
      <v-container fill-height>
        <v-layout justify-center>
          <v-flex class="loading-flex" v-show="loading">
            <spinner :loading="loading"></spinner>
          </v-flex>
          <v-flex v-show="!loading">
            <router-view/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <app-notification :notification="notification" @close="setNotification()"></app-notification>
    <v-snackbar
      v-model="reloadClaim"
      multi-line="multi-line"
      :timeout="0"
      top
    >The app has been updated
      <v-btn color="success" flat @click="reload">Reload</v-btn>
      <v-btn color="error" flat @click="setReloadClaim(false)">Cancel</v-btn>
    </v-snackbar>
    <transaction-monitor :open="monitor" :transactions="transactions" @close="setMonitor(false)"></transaction-monitor>
    <app-footer></app-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import AppNotification from './components/AppNotification.vue';
import TransactionMonitor from './components/TransactionMonitor.vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { setTimeout } from 'timers';

@Component({
  computed: {
    ...mapGetters('layout', ['loading', 'reloadClaim', 'notification', 'monitor']),
    ...mapGetters('account', ['account']),
    ...mapGetters('transactionMonitor', ['transactions']),
  },
  methods: {
    ...mapMutations('layout', ['setReloadClaim', 'setNotification', 'setMonitor']),
    ...mapActions('account', ['logout']),
  },
  components: {
    AppHeader,
    AppFooter,
    AppNotification,
    TransactionMonitor,
  },
})
export default class App extends Vue {
  public get routeTitle(): string {
    return this.$route.meta.title;
  }

  public reload() {
    location.reload(true);
  }

  public created() {
    this.$store.dispatch('account/retrieve');
  }

}
</script>


<style lang="scss">
@import "./styles/index.scss";
#app {
  .loading-flex {
    align-self: center;
  }
}
</style>

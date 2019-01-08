<template>
  <v-app id="app">
    <app-header :routeTitle="routeTitle" :account="account" @logout="logout"></app-header>
    <v-content>
      <v-container fill-height>
        <v-layout justify-center>
          <v-flex class="loading-flex" v-if="loading">
            <spinner :loading="loading"></spinner>
          </v-flex>
          <v-flex v-else>
            <router-view/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <app-footer></app-footer>
    <v-snackbar
      v-model="reloadClaim"
      multi-line="multi-line"
      :timeout="0"
      top
    >
      The app has been updated
      <v-btn color="success" flat @click="reload">Reload</v-btn>
      <v-btn color="error" flat @click="setReloadClaim(false)">Cancel</v-btn>
    </v-snackbar>
  </v-app>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { nulsWorldAddressUrl } from './services/utils';

@Component({
  computed: {
    ...mapGetters('layout', ['loading', 'reloadClaim']),
    ...mapGetters('account', ['account']),
  },
  methods: {
    ...mapMutations('layout', ['setReloadClaim']),
    ...mapActions('account', ['logout']),
  },
  components: {
    AppHeader,
    AppFooter,
  },
})
export default class App extends Vue {
  public get routeTitle(): string {
    return this.$route.meta.title;
  }

  public reload() {
    location.reload(true);
  }
}
</script>


<style lang="scss">
@import "./styles/index.scss";
#app {
  .loading-flex {
    align-self: center;
  }

  .app-title {
    margin-left: 0;
  }

  .app-toolbar__container {
    margin: 0 auto;
  }

  .v-toolbar__content {
    padding: 0;
  }
}

#nuls-logo {
  width: 100%;
  height: 40px;
}
</style>

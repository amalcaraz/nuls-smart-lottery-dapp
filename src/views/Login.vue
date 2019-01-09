<template>
  <div class="login">
    <v-layout justify-center>
      <v-flex xs12 sm9 lg7>
        <login-form 
          @submit="onLogin($event)"
          @cancel="onCancelForm"
        ></login-form>
      </v-flex>
    </v-layout>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import LoginForm from '../components/LoginForm.vue';
import { NulsAccountModel } from '@/model/account';

@Component({
  computed: {
    ...mapGetters('account', ['isLoggedIn']),
  },
  components: {
    LoginForm,
  },
})
export default class LoginView extends Vue {
  public isLoggedIn!: boolean;

  public created() {
    if (this.isLoggedIn) {
      this.$router.push({ name: 'home' });
    }
  }

  public onLogin(accountModel: NulsAccountModel) {
    this.$store.dispatch('account/login', accountModel);
    const redirectPath: string = this.$route.query.redirectUrl as string;

    if (!redirectPath) {
      this.$router.push({ name: 'home' });
    } else {
      this.$router.push({ path: redirectPath });
    }
  }

  public onCancelForm() {
    this.$router.back();
  }
}
</script>
 
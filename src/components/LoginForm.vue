<template>
  <v-form @submit.prevent="onSubmit" v-model="valid" ref="form">
    <v-card>
      <v-card-title class="title">
        Login
      </v-card-title>
      <v-card-text>
        <v-text-field
          label="Private key"
          v-model="accountModel.privateKey"
          :min="32"
          :max="32"
          type="text"
          :rules="privateKeyRules"
          required
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn color="error" flat @click.stop="onCancel">Cancel</v-btn>
        <v-btn color="warning" flat @click.stop="$refs.form.reset()">Reset</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" type="submit" :disabled="!valid">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { NulsAccountModel } from '@/model/account';
import { nulsToNa, naToNuls, isValidPrivateKey } from '../services/utils';

@Component({})
export default class LoginForm extends Vue {

  public valid: boolean = false;
  public accountModel: Record<keyof NulsAccountModel, string> = {
    privateKey: '',
  } as any;

  public requiredRules: any = [
    (value: string) => value !== undefined || 'This field is required',
  ];

  public privateKeyRules: any = [
    (value: string) => isValidPrivateKey(this.accountModel.privateKey) || 'Private key is not valid',
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

  private getResponse(): NulsAccountModel {
    const response: NulsAccountModel = {
      ...this.accountModel,
    };

    return response;
  }
}
</script>


<style lang="scss" scoped>
strong {
  font-weight: 400;
}
</style>

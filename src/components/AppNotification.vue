<template>
  <v-snackbar v-if="show" v-model="show" :color="notification.kind" multi-line="multi-line" :timeout="notification.timeout" top>
    {{notification.message}}
    <v-btn dark flat @click="onClose()">Ok</v-btn>
  </v-snackbar>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { AppNotificationModel } from '../model/common';

@Component({})
export default class AppNotification extends Vue {
  @Prop() public notification!: AppNotificationModel | undefined;

  public get show() {
    return !!this.notification;
  }

  public set show(val: any) {
    this.onClose();
  }

  public onClose() {
    this.$emit('close');
  }
}
</script>

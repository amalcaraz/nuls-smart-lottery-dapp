<template>
  <span>
    <i :class="['status', `status--${status}`]"></i> {{status}}
  </span>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { LotteryStatus as Status } from '@/model/lottery';

@Component({})
export default class LotteryStatus extends Vue {
  @Prop() public status!: Status;
}
</script>

<style lang="scss" scoped>
.status {
  $size: .5em;

  display: inline-block;
  width: $size;
  height: $size;
  vertical-align: middle;
  border-radius: 50%;
  background-color: var(--color-warning);

  &--1 {
    background-color: var(--color-success);
  }

  &--2 {
    background-color: var(--color-error);
  }
}
</style>

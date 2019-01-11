<template>
  <v-img
    :src="`https://picsum.photos/${grayImage ? 'g/' : ''}400/160?blur&amp;image=${lottery.id + 155}`"
  >
    <v-container fill-height fluid>
      <v-layout fill-height>
        <v-flex xs12 align-end flexbox class="head-title">
          <span class="headline mb-0">{{lottery.title}}</span>
          <div class="description">{{description}}</div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-img>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Lottery, LotteryStatus } from '../model/lottery';

@Component({})
export default class LotteryHeader extends Vue {
  @Prop() public lottery!: Lottery;
  @Prop({ default: false }) public fullDesc!: boolean;

  public get grayImage(): boolean  {
    return this.lottery.status === LotteryStatus.CLOSED;
  }

  public get description(): string  {
    return (this.fullDesc || this.lottery.desc.length < 100) ? this.lottery.desc : (this.lottery.desc.substr(0, 100) + '...');
  }

}
</script>

<style lang="scss" scoped>
.head-title {
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;

    background-color: rgba(255, 255, 255, 0.35);
    border-radius: 5px;
    filter: blur(10px);
  }
}

.description {
  height: 42px;
}
</style>


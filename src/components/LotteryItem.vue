<template>
  <v-card elevation-1 :ripple="{class: 'primary--text'}" class="agent-node">
    <v-card-text>
      {{lottery}}
      <v-layout>
        <v-flex xs6>
          <strong>{{lottery.id}}</strong>
          <div class="agent-node-name primary--text">{{lottery.title}}</div>
          <div class="grey--text">{{lottery.desc}}</div>
        </v-flex>
        <v-flex xs6>
          <div><lottery-status :status="lottery.status"></lottery-status></div>
          <div class="grey--text"><v-icon color="grey" small>person</v-icon> {{lottery.minParticipants}}</div>
          <div class="grey--text"><v-icon color="grey" small>monetization_on</v-icon> {{lottery.totalPot | nulsCurrency}} <i class="nuls"></i></div>
          <div class="grey--text"><v-icon color="grey" small>monetization_on</v-icon> {{lottery.totalPot | nulsCurrency}} <i class="nuls"></i></div>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import LotteryStatus from '@/components/LotteryStatus.vue';
import { Lottery } from '@/model/lottery';

@Component({
  components: {
    LotteryStatus,
  },
})
export default class LotteryItem extends Vue {
  @Prop({ default: undefined }) public lottery!: Lottery;
}
</script>

<style lang="scss" scoped>
.agent-node {
  cursor: pointer;
  &-name {
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>

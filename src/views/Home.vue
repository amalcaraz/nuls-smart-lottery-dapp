<template>
  <div>
    <h2>Lottery list:</h2>
    <ul>
      <li v-for="lottery in lotteryList" :key="lottery.id">
        <p><strong>id:</strong> {{lottery.id}}</p>
        <p><strong>title:</strong> {{lottery.title}}</p>
        <p><strong>desc:</strong>&nbsp;<span v-html="lottery.desc"></span></p>
        <p><strong>status:</strong> {{lottery.status}}</p>
        <p><strong>minParticipants:</strong> {{lottery.minParticipants}}</p>
        <p><strong>startTime:</strong> {{lottery.startTime}}</p>
        <p><strong>endTime:</strong> {{lottery.endTime}}</p>
        <p><strong>initialPot:</strong> {{lottery.initialPot}}</p>
        <p><strong>currentPot:</strong> {{lottery.currentPot}}</p>
        <p><strong>totalPot:</strong> {{lottery.totalPot}}</p>
        <p><strong>ticketPrice:</strong> {{lottery.ticketPrice}}</p>
        <p><strong>secondPrizes:</strong> {{lottery.secondPrizes}}</p>
        <p><strong>creatorAddress:</strong> {{lottery.creatorAddress}}</p>
        <p><strong>supportAddress:</strong> {{lottery.supportAddress}}</p>
        <p><strong>supportPercentage:</strong> {{lottery.supportPercentage}}</p>
      </li>
    </ul>
 </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Contract } from 'nuls-js';
import config from 'config';

@Component({})
export default class Home extends Vue {

  public lotteryList: any[] = [];

  public async created() {

    const contract: any = await Contract.at(config.app.contractAddress, { api: config.app.api.explorer });

    const fromAddress: string = 'TTarN3iszzfkh2j4doWHsMw3LxJJrq25';
    const privateKey: string = 'secret!';

    contract.account(fromAddress, privateKey);
    this.lotteryList = await contract.viewLotteryList();

  }
}
</script>
 
import moment from 'moment';
import Vue from 'vue';
import { dateNumber } from '@/model/common';

Vue.filter('date', (value: dateNumber) => {
  if (value) {
    return moment(value).format('YYYY/MM/DD HH:mm');
  }
});

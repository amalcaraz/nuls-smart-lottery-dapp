import Vue from 'vue';
import { naToNulsFixed } from '@/services/utils';
import { na } from '@/model/common';

Vue.filter('nulsCurrency', (value: na, fixed: number = 2): string => {

  return naToNulsFixed(value, fixed).toFixed(fixed);

});

import Vue from 'vue';
import { nulsIntToDecimalsFixed } from '@/services/utils';
import { na } from '@/model/common';

Vue.filter('nulsCurrency', (value: na, fixed: number = 2): string => {

  return nulsIntToDecimalsFixed(value, fixed).toFixed(fixed);

});

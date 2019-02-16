import { AppNotificationModel } from '../../model/common';

export default {
  namespaced: true,
  state: {
    loading: true,
    reloadClaim: false,
    notification: undefined,
    monitor: false,
  },
  getters: {
    loading: (state: any) => state.loading,
    reloadClaim: (state: any) => state.reloadClaim,
    notification: (state: any) => state.notification,
    monitor: (state: any) => state.monitor,
  },
  mutations: {
    setLoading(state: any, payload: boolean) {
      state.loading = payload;
    },
    setReloadClaim(state: any, payload: boolean) {
      state.reloadClaim = payload;
    },
    setNotification(state: any, payload: AppNotificationModel | undefined) {
      state.notification = payload;
    },
    setMonitor(state: any, payload: boolean) {
      state.monitor = payload;
    },
  },
};


import { Reducer } from 'redux';
import { Subscription, Effect } from 'dva';
import { message } from 'antd';
import { isBrowser } from 'umi';

export interface GlobalModelState {
  route: {}
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  effects: {

  };
  reducers: {
    saveState: Reducer<GlobalModelState>;
  },
  subscriptions: {

  }
}

const GlobalModel: GlobalModelType = {
  namespace: 'global',
  state: {
    route: {}
  },
  effects: {
  },
  reducers: {
    saveState(state: any, { payload }): GlobalModelState {
      return {
        ...state,
        ...payload
      }
    },
  },
  subscriptions: {

  },
};

export default GlobalModel;
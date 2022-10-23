
import { Reducer } from 'redux';
import { Subscription, Effect } from 'dva';
import { message } from 'antd';
import { isBrowser } from 'umi';
import { getSettings as getSettingsService } from '@/services/settings'

export interface GlobalModelState {
  route: {},
  seo: {
    title: string,
    keywords: string,
    description: string
  }
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  effects: {
    getSettings: Effect
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
    route: {},
    seo: {
      title: "",
      keywords: "",
      description: ""
    }
  },
  effects: {
    *getSettings({ payload }, { call, put }): any {
      const result = yield call(getSettingsService, payload)

      if (result.code === 1) {
        const { data = {} } = result
        const { site_name, site_seo_title, site_seo_keywords, site_seo_description } = data

        let title = 'ZEROCMF'
        if (site_seo_title == '') {
          title = site_name
        }

        yield put({
          type: "saveState",
          payload: {
            seo: {
              title,
              keywords: site_seo_keywords,
              description: site_seo_description
            }
          }
        })
      }
    },
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
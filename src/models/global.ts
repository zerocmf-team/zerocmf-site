
import { Reducer } from 'redux';
import { Effect } from 'dva';
import { theme } from '@/services/install';
import { getSettings } from '@/services/settings'
import { getToken } from '@/services/login';
import { message } from 'antd';
import { isBrowser } from 'umi';

export interface GlobalModelState {
  exception:string,
  visible: boolean,
  loginVisible: boolean,
  token: string;
  type: string;
  moreType: string; // 主题设置编辑列下
  name: string;
  activeFile: string;
  curData: Object;
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  effects: {
    installTheme: Effect,
    settings: Effect,
    signIn: Effect,
    signOut: Effect,
    toggleVisable:Effect,
    initCurData: Effect,
  };
  reducers: {
    saveVisable: Reducer<GlobalModelState>;
    saveState: Reducer<GlobalModelState>;
    toggleLogin: Reducer<GlobalModelState>;
  },
  subscriptions: {

  }
}

const GlobalModel: GlobalModelType = {
  namespace: 'global',
  state: {
    exception:"",
    visible: false,
    loginVisible: false,
    token: '',
    type: '',
    moreType: '',
    name: '',
    activeFile: '',
    curData: {}
  },
  effects: {
    *installTheme({ payload: { data } }, { call, put }):any {
      const result = yield call(theme, data)

      if (result.status === 401) {
        yield put({
          type: "saveState",
          payload: {
            httpStatus: {
              status: 401,
              msg: '用户没有权限（令牌、用户名、密码错误）',
            }
          }
        })
      }

      if (result.code === 1) {
        yield put({
          type: "saveState",
          payload: {
            httpStatus: {
              status: 200,
              code: result.code,
              msg: result.msg,
            },
            data: result.data
          }
        })

        return result
      }
    },
    *settings({ payload }, { call, put }): any {
      const result = yield call(getSettings, payload)
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
    *signIn({ payload: { data } }, { call, put }):any {
      const result = yield call(getToken, data)
      if (result.code === 0) {
        message.error(result.msg)
        return
      }
      message.success("登录成功！")
      const { data: tokenData } = result

      if (tokenData) {
        localStorage.setItem('token', JSON.stringify(tokenData))
        
        yield put({
          type: "saveState",
          payload: {
            token: tokenData.access_token,
            loginVisible: false,
          }
        })

        yield put({
          type: "user/fetchUser"
        })
      }

    },
    *signOut({ payload }, { call, put }) {
      if (isBrowser()) {
        localStorage.removeItem("token")
        yield put({
          type: "saveState",
          payload: {
            token: ''
          }
        })

        yield put({
          type: "user/saveState",
          payload: {
            data: {}
          }
        })
        message.success("退出登录")
      }
    },
    *toggleVisable({ payload }, { call, put }) {

      yield put({
        type: "initCurData",
        payload
      })
      
      yield put({
        type: "saveVisable",
      })

    },
    *initCurData({ payload }, { call, put, select }):any {
      const state = yield select((state: any) => state);
      const { themeFiles } = state
      const { file } = payload
      const { fileData, headerData, footerData } = themeFiles
      let curData = {}
      if (file === 'public/header') {
        curData = headerData;
      } else if (file === 'public/footer') {
        curData = footerData;
      } else {
        curData = fileData;
      }
      
      yield put({
        type: "saveState",
        payload: {
          curData
        }
      })
    }
  },
  reducers: {
    saveVisable(state: any, { payload }): GlobalModelState {
      const visible: Boolean = state.visible ? false : true
      return {
        ...state,
        ...payload,
        visible
      }
    },
    saveState(state: any, { payload }): GlobalModelState {
      return {
        ...state,
        ...payload
      }
    },
    toggleLogin(state: any): GlobalModelState {
      const loginVisible: Boolean = state.loginVisible ? false : true
      return {
        ...state,
        loginVisible,
      }
    }
  },
  subscriptions: {

  },
};

export default GlobalModel;
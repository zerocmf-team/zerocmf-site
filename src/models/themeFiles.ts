import { Reducer } from 'redux';
import { Subscription, Effect } from 'dva';
import { getThemeFiles, getThemeFile } from '@/services/themeFile';
import { getPosts } from '@/services/portalPost';

export interface ThemeFilesModelState {
    headerData: object;
    footerData: Object;
    fileData: Object;
}

export interface ThemeFilesModelType {
    namespace: 'themeFiles';
    state: ThemeFilesModelState;
    effects: {
        fetchPublic: Effect,
        fetchThemeFile: Effect,
    },
    reducers: {
        saveState: Reducer<ThemeFilesModelState>;
    },
}

const ThemeFilesModel: ThemeFilesModelType = {
    namespace: 'themeFiles',
    state: {
        headerData: {},
        footerData: {},
        fileData: {},
    },
    effects: {
        *fetchPublic({ payload }, { call, put }) {
            let headerData = {}, footerData = {}
            const result = yield call(getThemeFiles, payload)
            if (result.code === 1) {
                result?.data?.forEach((item: any) => {
                    if (item.more_json?.file === 'public/header') {
                        headerData = { ...item.more_json, id: item.id };
                    } else if (item.more_json?.file === 'public/footer') {
                        footerData = { ...item.more_json, id: item.id };
                    }
                });
            }
            yield put({
                type: "saveState",
                payload: {
                    headerData,
                    footerData
                }
            })

            return result
        },
        *fetchThemeFile({ payload }, { call, put }) {
            let fileData: any = {}
            const result = yield call(getThemeFile, payload)
            if (result.code === 1) {
                fileData = { ...result.data.more_json, id: result.data.id };
                const { vars = {}, widgets = {} } = fileData?.more;
                for (let index = 0; index < Object.keys(widgets).length; index++) {
                    const key = Object.keys(widgets)[index];
                    const value = widgets[key];
                    const { vars: widgetsVars = {} } = value;
                    for (let ci = 0; ci < Object.keys(widgetsVars).length; ci++) {
                        const varKey = Object.keys(widgetsVars)[ci];
                        const varValue = widgetsVars[varKey];
                        const { dataSource, value } = varValue;
                        if (dataSource) {
                            const { api, multi } = dataSource;
                            switch (api) {
                                case 'portal/category':
                                    if (multi && false) {
                                    } else {
                                        const postRes = yield call(getPosts, value)
                                        if (postRes.code == 1) {
                                            fileData.more.widgets[key].vars[varKey].data = postRes.data;
                                        }
                                    }
                                    break;
                            }
                        }
                    }
                }

            }
            yield put({
                type: "saveState",
                payload: {
                    fileData
                }
            })

            return result
        }
    },
    reducers: {
        saveState(state: any, { payload }): ThemeFilesModelState {
            return {
                ...state,
                ...payload
            }
        }
    }
}

export default ThemeFilesModel;
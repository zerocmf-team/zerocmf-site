import { Reducer } from 'redux';
import { Subscription, Effect } from 'dva';

import { getPosts } from '@/services/portalPost';

import {
    getCategory,
    getBreadcrumbs,
    getTreesById,
} from '@/services/portalCategory';

export interface PostCategoryModelState {
    breadcrumbs: object,
    categoryTrees: [],
    category: object,
    lists: [],
    hots: []
}

export interface PostCategoryModelType {
    namespace: 'postCategory';
    state: PostCategoryModelState;
    effects: {
        fetchCategory: Effect,
        fetchData: Effect
    },
    reducers: {
        saveState: Reducer<PostCategoryModelState>;
    },
}

const ThemeFilesModel: PostCategoryModelType = {
    namespace: 'postCategory',
    state: {
        breadcrumbs: [],
        categoryTrees: [],
        category: {}, // 当前分类数据
        lists: [],
        hots: []
    },
    effects: {
        *fetchCategory({ payload: { categoryId } }, { call, put }): any {
            const result = yield call(getCategory, categoryId)
            if (result.code === 1) {
                const category = result.data
                yield put({
                    type: "saveState",
                    payload: {
                        category
                    }
                })
            }
            return result
        },
        *fetchData({ payload: { categoryId, page = 1, pageSize = 10 } }, { call, put }): any {

            let breadcrumbs = [], categoryTrees = [], lists = [], hots = []

            const breadcrumbsRes = yield call(getBreadcrumbs, categoryId)
            if (breadcrumbsRes.code === 1) {
                breadcrumbs = breadcrumbsRes.data
            }

            const childsRes = yield call(getTreesById, categoryId)
            if (childsRes.code === 1) {
                categoryTrees = childsRes.data
            }

            const ids = categoryId
            const listRes = yield call(getPosts, ids, page, pageSize)

            if (listRes.code === 1) {
                lists = listRes.data
            }

            const hotRes = yield call(getPosts, ids, page, pageSize, {
                hot: 1
            })

            if (hotRes.code === 1) {
                hots = hotRes.data.data
            }

            yield put({
                type: "saveState",
                payload: {
                    breadcrumbs,
                    lists,
                    categoryTrees,
                    hots
                }
            })

        }
    },
    reducers: {
        saveState(state: any, { payload }): PostCategoryModelState {
            return {
                ...state,
                ...payload
            }
        },
    }
}

export default ThemeFilesModel;
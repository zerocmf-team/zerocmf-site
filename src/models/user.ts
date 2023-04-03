/*
 *@Author: frank
 *@Date: 2022-02-13 08:58:30
 *@Description: 文章详情模型
*/
import { Reducer } from 'redux';
import { Effect } from 'dva';
import { currentUser, saveUser as saveUserService } from '@/services/user';
import { message } from 'antd';
import { isBrowser } from 'umi';

export interface UserModelState {
    data: any;
}

export interface UserModelType {
    namespace: 'user';
    state: UserModelState;
    effects: {
        fetchUser: Effect,
        saveUser: Effect,
    };
    reducers: {
        saveState: Reducer<UserModelState>;
    }
}

const UserModel: UserModelType = {
    namespace: 'user',
    state: {
        data: {}
    },
    effects: {
        *fetchUser({ payload }, { call, put }): any {
            if (isBrowser()) {
                const tokenStr = localStorage?.getItem('token')
                if (tokenStr) {
                    const result = yield call(currentUser)
                    if (result.code === 1) {
                        yield put({
                            type: 'saveState',
                            payload: {
                                data: result.data
                            }
                        })
                    }
                    return result
                    // message.error(result.msg)
                }
            }
        },
        *saveUser({ payload }, { call, put }): any {
            const result = yield call(saveUserService, payload)
            if (result.code === 1) {
                yield put({
                    type: 'saveState',
                    payload: {
                        data: result.data
                    }
                })
                message.success('更新成功！')
                return
            }
        }
    },
    reducers: {
        saveState(state, { payload }): UserModelState {
            return {
                ...state,
                ...payload
            }
        }
    }
}

export default UserModel
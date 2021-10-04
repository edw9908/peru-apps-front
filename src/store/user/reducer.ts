import { createReducer } from '../createReducer';
import actionTypes from './actionTypes';
import * as caseFunctions from './caseFunctions';

export interface IUser {
    _id: string | undefined,
    name: string | undefined,
    last_name: string | undefined,
    mobile_phone: string | undefined,
    sede: string | undefined,
    additionals : {profile: string | undefined, specialization: string | undefined},
    username: string | undefined
}

export interface IUserLogged {
    error: boolean | undefined,
    loading: boolean,
    value: IUser & { birth_date: Date | undefined, isAdmin: boolean | undefined }
}

export interface IUsers {
    error: boolean | undefined,
    loading: boolean,
    value: Array<IUser>
}

export interface IState {
    authenticated: boolean,
    users: IUsers,
    loggedInUser: IUserLogged
}

export const initialState: IState = {
    authenticated: false,
    users: {
        value: [],
        error: undefined,
        loading: false
    },
    loggedInUser: {
        value: {
            _id: undefined,
            name: undefined,
            last_name: undefined,
            mobile_phone: undefined,
            sede: undefined,
            birth_date: undefined,
            username: undefined,
            isAdmin: undefined,
            additionals: {
                profile: undefined,
                specialization: undefined
            }
        },
        error: undefined,
        loading: false
    }
}

export default createReducer<IState>(initialState, {
    [actionTypes.LOGIN_USER]: caseFunctions.loginUser,
    [actionTypes.LOGIN_USER_SUCCESS]: caseFunctions.loginUserSuccess,
    [actionTypes.LOGIN_USER_LOGIN_USER_FAILURE]: caseFunctions.loginUserFailure,

    [actionTypes.GET_USER_LIST]: caseFunctions.getUserList,
    [actionTypes.GET_USER_LIST_SUCCESS]: caseFunctions.getUserListSuccess,
    [actionTypes.GET_USER_LIST_FAILURE]: caseFunctions.getUserListFailure,

    [actionTypes.UPDATE_USER]: caseFunctions.updateUser,
    [actionTypes.UPDATE_USER_SUCCESS]: caseFunctions.updateUserSuccess,
    [actionTypes.UPDATE_USER_FAILURE]: caseFunctions.updateUserFailure
})
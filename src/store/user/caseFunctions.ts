import { IState, initialState } from './reducer';

export function loginUser(state: IState) {
    return {
        ...state,
        authenticated: false,
        loggedInUser: {
            value: undefined,
            loading: true,
            error: undefined
        }
    }
}

export function loginUserSuccess(state: IState, action: any) {
    return {
        ...state,
        authenticated: true,
        loggedInUser: {
            value: action.payload.user,
            loading: false,
            error: false
        }
    }
}

export function loginUserFailure(state: IState, action: any) {
    return {
        ...state,
        authenticated: false,
        loggedInUser: {
            value: undefined,
            loading: false,
            error: true
        }
    }
}

export function getUserList(state: IState) {
    return {
        ...state,
        users: {
            ...state.users,
            loading: true,
            error: undefined
        }
    }
}

export function getUserListSuccess(state: IState, action: any) {
    return {
        ...state,
        users: {
            value: action.payload.users,
            loading: false,
            error: false
        }
    }
}

export function getUserListFailure(state: IState, action: any) {
    return {
        ...state,
        users: {
            ...initialState.users,
            loading: false,
            error: true
        }
    }
}

export function updateUser(state: IState) {
    return {
        ...state,
        loggedInUser: {
            loading: true,
            error: undefined
        }
    }   
}

export function updateUserSuccess(state: IState, action: any) {
    return {
        ...state,
        loggedInUser: {
            value: action.payload.user,
            loading: true,
            error: undefined
        }
    }   
}

export function updateUserFailure(state: IState, action: any) {
    return {
        ...state,
        loggedInUser: {
            value: state.loggedInUser,
            loading: true,
            error: undefined
        }
    }   
}

export function userLogout(state: IState, action: any) {
    return {
        ...state,
        authenticated: initialState.authenticated,
        loggedInUser: initialState.loggedInUser,
        users: initialState.users
    }
}
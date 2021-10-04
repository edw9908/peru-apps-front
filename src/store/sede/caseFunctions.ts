import { IState, initialState } from './reducer';

export function getSedes(state: IState) {
    return {
        ...state,
        sedes: {
            ...state.sedes,
            loading: true,
            error: undefined
        }
    }
}

export function getSedesSuccess(state: IState, action: any) {
    return {
        ...state,
        sedes: {
            value: action.payload.sedes,
            loading: false,
            error: false
        }
    }
}

export function getSedesFailure(state: IState, action: any) {
    return {
        ...state,
        sedes: {
            ...initialState.sedes,
            loading: false,
            error: true
        }
    }
}
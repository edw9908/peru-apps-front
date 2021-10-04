import { createReducer } from '../createReducer';
import actionTypes from './actionTypes';
import * as caseFunctions from './caseFunctions';

export interface ISede {
    name: string,
    _id: string
}

export interface ISedes {
    value: Array<ISede>,
    loading: boolean,
    error: boolean | undefined
}

export interface IState {
    sedes: ISedes
}

export const initialState: IState = {
    sedes: {
        value: [],
        loading: false,
        error: undefined
    }
}

export default createReducer<IState>(initialState, {
    [actionTypes.GET_SEDE_LIST]: caseFunctions.getSedes,
    [actionTypes.GET_SEDE_LIST_SUCCESS]: caseFunctions.getSedesSuccess,
    [actionTypes.GET_SEDE_LIST_FAILURE]: caseFunctions.getSedesFailure
})
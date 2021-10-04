import { combineReducers, createStore } from 'redux';
import userReducer, { IState as IUserState } from './user/reducer';
import sedeReducer, { IState as ISedeState } from './sede/reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
}

export interface IRootState {
    user: IUserState,
    sede: ISedeState
}

const rootReducer = combineReducers<IRootState>({
    user: userReducer,
    sede: sedeReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export let store = createStore(persistedReducer);
export let persistor =  persistStore(store);
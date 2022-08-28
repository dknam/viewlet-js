import { applyMiddleware, createStore } from 'redux';
import { initState, reducer } from './reducer';

export const store: any = (createStore as any)(
    reducer,
    initState,
);

import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './store/RootReducer';
import createSagaMiddleware from 'redux-saga';
import { WatcherSaga } from './sagas/Root.saga';
//import { logger } from 'redux-logger';

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

/* istanbul ignore next */
/*if (process.env.NODE_ENV === `development`) {
  middleware.push(logger);
}*/

export const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: true,
});

sagaMiddleware.run(WatcherSaga);

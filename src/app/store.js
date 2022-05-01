import {configureStore} from '@reduxjs/toolkit';

// Services
import { cryptoApi } from '../services/cryptoApi';
import {cryptoNewsApi} from '../services/cryptoNewsApi';

export default configureStore({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer,
        [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    },

})
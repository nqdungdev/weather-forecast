import weatherSlice from './features/weather.slice'
import geoSlice from '~/features/geo.slice'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { geoApi } from './services/geoApi.services'
import { weatherApi } from './services/weatherApi.services'
import { oneCallApi } from './services/oneCallApi.services'

const store = configureStore({
  reducer: {
    geoSlice,
    weatherSlice,
    [geoApi.reducerPath]: geoApi.reducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
    [oneCallApi.reducerPath]: oneCallApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(geoApi.middleware, weatherApi.middleware, oneCallApi.middleware)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store

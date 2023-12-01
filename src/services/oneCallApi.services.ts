import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from './axiosBaseQuery'
import { ICoord, IWeatherOneCall } from '~/interfaces/weather.interfaces'

export const oneCallApi = createApi({
  reducerPath: 'oneCallApi',
  tagTypes: ['Onecall'],
  baseQuery: axiosBaseQuery({
    baseUrl: 'http://openweathermap.org/data/2.5/'
  }),
  endpoints: (build) => ({
    getOneCall: build.query<IWeatherOneCall, ICoord>({
      query(payload) {
        return {
          url: `onecall?lat=${payload.lat}&lon=${payload.lon}&units=metric&appid=${
            import.meta.env.VITE_WEATHER_API_KEY
          }`,
          method: 'GET'
        }
      }
    })
  })
})

export const { useGetOneCallQuery } = oneCallApi

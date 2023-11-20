import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ICoord, IWeatherOneCall } from '~/interfaces/weather.interfaces'

type State = {
  city: { name: string; coord: ICoord }
  oneCall: IWeatherOneCall | null
}

const initialState: State = {
  city: { name: 'Vietnam', coord: { lat: 16.1667, lon: 107.8333 } },
  oneCall: null
}

export const weatherSlice = createSlice({
  name: 'geo',
  initialState,
  reducers: {
    selectCity: (state, action: PayloadAction<{ name: string; coord: ICoord }>) => {
      state.city = action.payload
    },
    setOneCall: (state, action: PayloadAction<IWeatherOneCall>) => {
      state.oneCall = action.payload
    }
  }
})
export const { selectCity, setOneCall } = weatherSlice.actions
export default weatherSlice.reducer

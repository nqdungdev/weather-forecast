import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ICoord } from '~/interfaces/weather.interfaces'

type State = {
  searchText: string
  city: { id: number; name: string; coord: ICoord }
}

const initialState: State = {
  searchText: 'london',
  city: { id: 1562822, name: 'Vietnam', coord: { lat: 16.1667, lon: 107.8333 } }
}

export const geoSlice = createSlice({
  name: 'geo',
  initialState,
  reducers: {
    searchCity: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload
    },
    selectCity: (state, action: PayloadAction<{ id: number; name: string; coord: ICoord }>) => {
      state.city = action.payload
    }
  }
})
export const { searchCity, selectCity } = geoSlice.actions
export default geoSlice.reducer

import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import type { Feature } from 'geojson'
import { ICoord } from '~/interfaces/weather.interfaces'

type State = {
  searchText: string
  city: { id: number | string; name: string; coord: ICoord }
  cityPicker: Feature
  cityList: Feature[]
}

const initialState: State = {
  searchText: 'london',
  city: { id: 1562822, name: 'Vietnam', coord: { lat: 16.1667, lon: 107.8333 } },
  cityPicker: { center: [107.8333, 16.1667] },
  cityList: []
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
    },
    pickCity: (state, action: PayloadAction<Feature>) => {
      state.cityPicker = action.payload
    },
    setCityListed: (state, action: PayloadAction<Feature[]>) => {
      state.cityList = action.payload
    }
  }
})
export const { searchCity, selectCity, pickCity, setCityListed } = geoSlice.actions
export default geoSlice.reducer

import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import type { Feature } from 'geojson'

type State = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cityPicker: any
  cityList: Feature[]
}

const initialState: State = {
  cityPicker: { center: [106.7049, 10.7772], place_name_en: 'Ho Chi Minh City' },
  cityList: []
}

export const geoSlice = createSlice({
  name: 'geo',
  initialState,
  reducers: {
    pickCity: (state, action: PayloadAction<Feature | { center: [number, number]; place_name_en: string }>) => {
      state.cityPicker = action.payload
    },
    setCityListed: (state, action: PayloadAction<Feature[]>) => {
      state.cityList = action.payload
    }
  }
})
export const { pickCity, setCityListed } = geoSlice.actions
export default geoSlice.reducer

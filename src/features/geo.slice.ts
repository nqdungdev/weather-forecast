import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import type { Feature } from 'geojson'

type State = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cityPicker: any
  cityList: Feature[]
}

const initialState: State = {
  cityPicker: { center: [107.8333, 16.1667], place_name_en: 'VietNam' },
  cityList: []
}

export const geoSlice = createSlice({
  name: 'geo',
  initialState,
  reducers: {
    pickCity: (state, action: PayloadAction<Feature>) => {
      state.cityPicker = action.payload
    },
    setCityListed: (state, action: PayloadAction<Feature[]>) => {
      state.cityList = action.payload
    }
  }
})
export const { pickCity, setCityListed } = geoSlice.actions
export default geoSlice.reducer

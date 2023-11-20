import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type State = {
  searchText: string
}

const initialState: State = {
  searchText: ''
}

export const geoSlice = createSlice({
  name: 'geo',
  initialState,
  reducers: {
    search: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload
    }
  }
})
export const { search } = geoSlice.actions
export default geoSlice.reducer

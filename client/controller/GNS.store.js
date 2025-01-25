import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    setting: {},
}

const settingSlice = createSlice({
    name: 'setting',
    initialState,
    reducers: {
        setsetting: (state, action) => {
            state.setting = action.payload
        }
    }
})

export const { setsetting } = settingSlice.actions;
export const settingSliceReducer = settingSlice.reducer;
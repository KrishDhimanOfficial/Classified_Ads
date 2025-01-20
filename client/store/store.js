import { configureStore } from '@reduxjs/toolkit'
import { sellerSliceReducer } from '../controller/seller.store'
import { settingSliceReducer } from '../controller/GNS.store'

const store = configureStore({
    reducer: {
        seller: sellerSliceReducer,
        setting: settingSliceReducer,
    }
})

export default store
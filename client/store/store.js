import { configureStore } from '@reduxjs/toolkit'
import { sellerSliceReducer } from '../controller/seller.store'

const store = configureStore({
    reducer: { seller: sellerSliceReducer }
})

export default store